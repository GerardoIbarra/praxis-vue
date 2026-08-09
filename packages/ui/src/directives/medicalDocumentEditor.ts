import { useMedicalChartDocumentStore } from "@/stores/medicalChart/document";
import { toast } from "vue3-toastify";
import {
  highlightBrackets,
  resetViewScroll,
  cleanDocumentHtml,
  removeIgnoredElements,
} from "@/utils/medicalDocumentUtils";
import { watch, nextTick, type Directive } from "vue";
import type { SectionResponseMap } from "@/types/api/medical-charts/document";
//import { useMedicalChartSectionOptions } from "@/stores/medicalChart/sectionOptions";
// --- Types ---

interface MedicalEditorState {
  docId: string;
  instancia: string;
  documentStore: DocumentStore;
  coordinator: Coordinator;
  mutationObserver: MutationObserver | null;
  editableObserver: MutationObserver | null;
  pendingInsertWatcher: (() => void) | null;
  lastFocusedWrapper: HTMLElement | null;
  initialHtml: string;
  clickHandler: ((e: MouseEvent) => void) | null;
  globalClickHandler: ((e: MouseEvent) => void) | null;
  userInteracted: boolean;
  captureInitial?: () => void;
}

interface MedicalEditorElement extends HTMLElement {
  __medicalEditorState?: MedicalEditorState;
  __readOnlyObserver?: MutationObserver;
  __resetInitialSnapshot?: () => void;
  __toastShown__?: boolean;
  __medicalSetup?: boolean;
}

interface DirectiveValue {
  docId: string;
  instancia?: string;
  coordinator: Coordinator;
}

interface DocumentStore {
  SelectedDocumentId: string | null;
  documentHtml: string;
  editDocumentByTab: Record<string, boolean>;
  canUpdate: boolean;
  knownPlaceholders: Set<string>;
  loadedDocuments: Record<string, string>;
  pendingInsert: {
    docId: string;
    item: InsertItem;
    relationship: boolean | string | null;
    timestamp?: number;
  } | null;
  pendingSignature: {
    docId: string;
    image: string;
    targetId: string;
    timestamp?: number;
  } | null;
  lastSnapshotReset: number;
  saveDelete: (instancia: string) => Promise<void>;
  deleteBlockFromBackend: (id: string) => Promise<boolean>;
  saveDocumentbyTab: (instancia: string) => Promise<void>;
}

interface InsertItem {
  id?: string | number;
  insert_data?: string | null;
  [key: string]: unknown;
}

interface Coordinator {
  getProfileStore: () => {
    tabs: Array<{ key: string; modalDocuments?: boolean }>;
    patientProfile?: { status: string } | null;
  };
  loadSectionOptions: (
    sectionId: keyof SectionResponseMap,
    docId: string,
    force?: boolean,
    skipModal?: boolean
  ) => Promise<void>;
  handleSectionClick: (
    id: keyof SectionResponseMap,
    docId: string,
    restricted?: boolean
  ) => void | Promise<void>;
  closeModal: () => void;
}

// --- Constants ---

const uuidRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const isUUID = (id: string): boolean => uuidRegex.test(id);
const isLocalId = (id: string | undefined): boolean =>
  !!id?.startsWith("local-");
const isSignatureField = (id: string): boolean =>
  id === "text_patients_signature" || id === "text_witness_signature";

/**
 * Section IDs that have restricted editing (non-contentEditable)
 */
const RESTRICTED_SECTIONS = [
  "referring_physicians",
  "medical_conditions",
  "surgical_procedures",
  "diagnostic_studies",
  "medications_current",
  "allergies",
  "immunizations",
  "alcohol",
  "tobacco",
  "drugs",
  "caffeine",
  "exercise",
  "occupation",
  "marital_status",
  "family_history",
  "review_of_systems",
  "vital_signs_single_entry",
  "physical_exam",
  "impressionsdiagnoses",
  "orders",
  "risk_medical_necessity",
];

/**
 * Section IDs where the block delete button should be hidden
 */
const NON_DELETABLE_SECTIONS = [
  "review_of_systems",
  "physical_exam",
  "vital_signs_single_entry",
];

/**
 * v-medical-document-editor directive
 *
 * Handles all low-level DOM interactions for the medical document rendered via v-html.
 */
export const medicalDocumentEditor: Directive<
  MedicalEditorElement,
  DirectiveValue
> = {
  mounted(el, binding) {
    const { docId, instancia, coordinator } = binding.value || {};
    if (!docId) return;

    const documentStore = useMedicalChartDocumentStore();
    //  const sectionOptionStore = useMedicalChartSectionOptions();

    const state: MedicalEditorState = {
      docId,
      instancia: instancia || docId, // Falls back to docId if instancia not provided
      documentStore,
      coordinator,
      mutationObserver: null,
      editableObserver: null,
      pendingInsertWatcher: null,
      lastFocusedWrapper: null,
      initialHtml: "",
      clickHandler: null,
      globalClickHandler: null,
      userInteracted: false,
    };

    el.__medicalEditorState = state;

    // 1. Interaction Guard & Auto-Unlock
    const unlock = () => {
      if (state.userInteracted) return;
      state.userInteracted = true;

      const active = document.activeElement as HTMLElement;
      if (
        active &&
        el.contains(active) &&
        active.classList.contains("editable-line")
      ) {
        const wrapper = active.parentElement;
        if (wrapper && wrapper.classList.contains("editable-wrapper")) {
          wrapper.classList.add("medical-doc-focused");
        }
      }

      el.removeEventListener("mousedown", unlock, true);
      el.removeEventListener("keydown", unlock, true);
      el.removeEventListener("touchstart", unlock, true);
    };

    el.addEventListener("mousedown", unlock, true);
    el.addEventListener("keydown", unlock, true);
    el.addEventListener("touchstart", unlock, true);

    // 2. Click Outside Handler (Clear Selection)
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Ignore if clicking inside the document container
      if (el.contains(target)) return;

      // Ignore if clicking inside common UI elements that should preserve selection
      const isSidebar = target.closest(".section-options-panel");
      const isModal =
        target.closest(".p-dialog") ||
        target.closest(".swal2-container") ||
        target.closest(".p-overlaypanel") ||
        target.closest(".p-menu") ||
        target.closest(".Toastify") ||
        target.closest(".p-multiselect-overlay") ||
        target.closest(".p-multiselect-panel") ||
        target.closest(".p-select-panel") ||
        target.closest(".p-datepicker") ||
        target.closest(".p-datepicker-panel") ||
        target.closest(".p-autocomplete-panel") ||
        target.closest(".p-popover") ||
        target.closest(".p-connected-overlay") ||
        target.closest(".p-drawer") ||
        target.closest(".info-card") ||
        target.closest(".document-actions-toolbar") ||
        target.closest("button") ||
        target.closest(".vs__selected") ||
        target.closest(".p-accordionheader-toggle-icon") ||
        target.closest(".p-dialog-mask");

      if (isSidebar || isModal) return;

      // Otherwise, clear selection and focus
      documentStore.SelectedDocumentId = null;
      el.querySelectorAll(".highlighted").forEach((node) =>
        node.classList.remove("highlighted")
      );

      // --- NEW: Reset sidebar/modal state ---
      const profileStore = coordinator.getProfileStore();
      const tabToModify = profileStore.tabs.find(
        (tab: { key: string; modalDocuments?: boolean }) =>
          tab.key === state.docId
      );
      if (tabToModify) {
        tabToModify.modalDocuments = false;
      }
      // Ensure coordinator state is also synced
      if (typeof coordinator.closeModal === "function") {
        coordinator.closeModal();
      }

      const active = document.activeElement;
      if (active && el.contains(active)) {
        if (active instanceof HTMLElement) active.blur();
      }
    };
    window.addEventListener("mousedown", handleGlobalClick, true);
    state.globalClickHandler = handleGlobalClick;

    // 3. Logic Initialization
    setupClickHandler(el, state);

    nextTick(() => {
      setupInteractivity(el, state);

      if (el.contains(document.activeElement)) {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      }

      // 5. Read-Only Enforcement logic
      const setupReadOnlyObserver = () => {
        const applyReadOnly = () => {
          el.querySelectorAll("[contenteditable]").forEach((element) => {
            element.setAttribute("contenteditable", "false");
            (element as HTMLElement).style.cursor = "default";
          });
          el.querySelectorAll(
            'button[title*="Delete"], button[title*="Eliminar"], .medical-doc-delete-btn'
          ).forEach((btn) => btn.remove());
        };

        applyReadOnly();

        const observer = new MutationObserver(applyReadOnly);
        observer.observe(el, { childList: true, subtree: true });
        el.__readOnlyObserver = observer;
      };

      // Initialize Read-Only if needed
      const profileStore = coordinator.getProfileStore();
      if (
        !documentStore.canUpdate ||
        profileStore.patientProfile?.status !== "active"
      ) {
        setupReadOnlyObserver();
      }

      // 5. Watch for HTML changes (from v-html updates)
      watch(
        () => documentStore.documentHtml,
        () => {
          nextTick(() => {
            setupInteractivity(el, state);
            // After system-level HTML update from store, reset the dirty tracking baseline
            if (state.captureInitial) {
              state.captureInitial();
              documentStore.editDocumentByTab[state.instancia] = false;
            }
          });
        }
      );

      // Initial blockade for signature fields if images already exist
      ["text_patients_signature", "text_witness_signature"].forEach((id) => {
        const field = el.querySelector(`#${id}, [id="${id}"]`) as HTMLElement;
        if (field && field.querySelector("img")) {
          field.style.cursor = "not-allowed";
          field.setAttribute(
            "title",
            "There is already a signature in this field"
          );
        }
      });
    });

    setTimeout(() => {
      setupEditTracking(el, state);
    }, 1000);

    setupInsertWatcher(el, state);
  },

  unmounted(el) {
    const state = el.__medicalEditorState;
    if (!state) return;

    if (state.mutationObserver) state.mutationObserver.disconnect();
    if (state.editableObserver) state.editableObserver.disconnect();
    if (state.pendingInsertWatcher) state.pendingInsertWatcher();
    if (state.clickHandler) el.removeEventListener("click", state.clickHandler);
    if (state.globalClickHandler)
      window.removeEventListener("mousedown", state.globalClickHandler, true);

    if (el.__readOnlyObserver) {
      el.__readOnlyObserver.disconnect();
      delete el.__readOnlyObserver;
    }

    delete el.__medicalEditorState;
  },
};

// --- Helpers ---

function setupClickHandler(
  el: MedicalEditorElement,
  state: MedicalEditorState
) {
  const { coordinator, docId, documentStore } = state;

  const findParentWithId = (
    startNode: HTMLElement | null
  ): HTMLElement | null => {
    let node = startNode;
    while (node && node !== el) {
      if (node.id && !isUUID(node.id) && !isLocalId(node.id)) {
        return node;
      }
      node = node.parentElement;
    }
    return null;
  };

  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();

    const targetElement = e.target as HTMLElement;
    const deleteBtn = targetElement.closest("button");
    if (deleteBtn && deleteBtn.title.match(/Delete|Eliminar/i)) return;

    const target = findParentWithId(targetElement);

    if (!target || target === el) return;

    // --- Legacy Guard: Protection for section children (referring_physicians, etc.) ---
    const clickedElement = e.target as HTMLElement;
    const isStrongClick = clickedElement.closest("strong");
    const protectedParents = ["referring_physicians", "risk_medical_necessity"];

    const wasClickOnChild =
      !isStrongClick &&
      protectedParents.includes(target.id) &&
      clickedElement !== target &&
      target.contains(clickedElement);

    if (wasClickOnChild) {
      if (coordinator) {
        coordinator.handleSectionClick(
          target.id as keyof SectionResponseMap,
          docId,
          true
        );
      }
      toast.info(
        "This item can’t be edited here. Use the section header to make changes.",
        {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000,
        }
      );
      return;
    }

    // --- Legacy Guard: Signature Lock ---
    if (isSignatureField(target.id) && target.querySelector("img")) {
      target.style.cursor = "not-allowed";
      target.setAttribute(
        "title",
        "There is already a signature in this field"
      );

      if (!(target as MedicalEditorElement).__toastShown__) {
        toast.info("There is already a signature in this field", {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        (target as MedicalEditorElement).__toastShown__ = true;
        setTimeout(
          () => ((target as MedicalEditorElement).__toastShown__ = false),
          1500
        );
      }
      if (coordinator) {
        coordinator.handleSectionClick(
          target.id as keyof SectionResponseMap,
          docId,
          true
        );
      }
      return;
    }

    // Ensure pointer cursor if clickable signature field
    if (isSignatureField(target.id)) {
      target.style.cursor = "pointer";
      target.removeAttribute("title");
    }

    // --- Standard Selection Logic ---
    const previous = el.querySelector(".highlighted");
    if (previous && previous !== target)
      previous.classList.remove("highlighted");
    if (!target.classList.contains("highlighted"))
      target.classList.add("highlighted");

    documentStore.SelectedDocumentId = target.id;

    // Legacy: reset viewport scroll when selecting a section
    resetViewScroll();

    if (coordinator) {
      coordinator.handleSectionClick(
        target.id as keyof SectionResponseMap,
        docId,
        false
      );
    }
  };

  el.addEventListener("click", handleClick);
  state.clickHandler = handleClick;
}

function setupInteractivity(
  el: MedicalEditorElement,
  state: MedicalEditorState
) {
  const { documentStore } = state;
  if (!documentStore.canUpdate) return;

  const refreshInteractivity = () => {
    // 1. Repair structure for any pre-existing editable lines that lost their wrappers
    el.querySelectorAll<HTMLElement>(".editable-line").forEach((line) => {
      if (
        line.parentElement &&
        !line.parentElement.classList.contains("editable-wrapper")
      ) {
        const wrapper = document.createElement("div");
        wrapper.className = "editable-wrapper";
        line.parentNode?.insertBefore(wrapper, line);
        wrapper.appendChild(line);
      }
    });

    // 2. Process wrappers and lines
    el.querySelectorAll<HTMLElement>(".editable-wrapper").forEach((wrapper) =>
      processWrapper(wrapper, el, state)
    );
    el.querySelectorAll<HTMLElement>(".editable-line").forEach((line) =>
      setupEditable(line, el, state)
    );
  };

  refreshInteractivity();

  state.editableObserver = new MutationObserver((mutations) => {
    let shouldRefresh = false;
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) shouldRefresh = true;
      });
    });
    if (shouldRefresh) {
      refreshInteractivity();
    }
  });

  state.editableObserver.observe(el, { childList: true, subtree: true });
}

function processWrapper(
  wrapper: HTMLElement,
  container: MedicalEditorElement,
  state: MedicalEditorState
) {
  wrapper.style.position = "relative";
  wrapper.style.display = "block";

  wrapper.childNodes.forEach((node) => {
    if (
      node.nodeType === 1 &&
      !(node as HTMLElement).classList.contains("medical-doc-delete-btn") &&
      (node as HTMLElement).tagName !== "BUTTON" // also ignore any buttons inside the wrapper
    ) {
      const element = node as HTMLElement;
      if (!element.classList.contains("editable-line")) {
        element.classList.add("editable-line");
      }
      setupEditable(element, container, state);
    }
  });
}

function setupEditable(
  editable: HTMLElement,
  container: MedicalEditorElement,
  state: MedicalEditorState
) {
  if ((editable as MedicalEditorElement).__medicalSetup) return;
  (editable as MedicalEditorElement).__medicalSetup = true;

  const { documentStore, coordinator } = state;
  const wrapper = editable.parentElement;
  if (!wrapper || !wrapper.classList.contains("editable-wrapper")) return;

  const sectionNode = wrapper.closest("div[id]") as HTMLElement | null;
  const sectionId = sectionNode?.id || "";
  const isRestricted = RESTRICTED_SECTIONS.includes(sectionId);

  if (isRestricted) {
    editable.contentEditable = "false";
    editable.style.outline = "none";
    editable.tabIndex = 0;
  } else {
    editable.contentEditable = "true";
  }

  const isDeletable = !NON_DELETABLE_SECTIONS.includes(sectionId);

  let deleteBtn = wrapper.querySelector<HTMLElement>(".medical-doc-delete-btn");

  if (isDeletable) {
    if (!deleteBtn) {
      deleteBtn = document.createElement("button");
      deleteBtn.textContent = "X";
      deleteBtn.title = "Delete this block";
      deleteBtn.className = "medical-doc-delete-btn";
      Object.assign(deleteBtn.style, {
        position: "absolute",
        right: "2px",
        top: "0px",
        background: "transparent",
        border: "none",
        cursor: "pointer",
        display: "none",
        fontSize: "16px",
        color: "#ef4444",
        zIndex: "10",
      });
      wrapper.appendChild(deleteBtn);
    }
  } else if (deleteBtn) {
    deleteBtn.remove();
    deleteBtn = null;
  }

  let isDeleting = false;

  editable.onfocus = () => {
    state.lastFocusedWrapper = wrapper;
    if (!state.userInteracted) return;
    wrapper.classList.add("medical-doc-focused");
  };

  editable.onblur = (e: FocusEvent) => {
    if (wrapper.contains(e.relatedTarget as Node) || isDeleting) return;

    setTimeout(() => {
      if (!isDeleting && wrapper) {
        wrapper.classList.remove("medical-doc-focused");
      }
    }, 150);

    if (editable.textContent?.trim() === "") {
      isDeleting = true;
      wrapper.remove();
      documentStore.saveDelete(state.instancia);
    } else {
      documentStore.loadedDocuments[state.instancia] = container.innerHTML;
    }
  };

  editable.oninput = () => {
    const selection = window.getSelection();
    const range =
      selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
    const containerNode = range ? range.startContainer : null;
    let offset = range ? range.startOffset : 0;

    editable.querySelectorAll("span").forEach((span) => {
      const isPlaceholder =
        span.style.backgroundColor === "rgb(255, 243, 205)" ||
        span.style.backgroundColor === "#fff3cd";
      if (isPlaceholder) {
        const text = span.textContent || "";
        if (documentStore.knownPlaceholders.has(text)) {
          // Keep it
        } else {
          let cleanText = text;
          if (text.startsWith("[") && text.endsWith("]")) {
            cleanText = text.slice(1, -1);
            if (containerNode === span.firstChild && offset > 0) offset--;
          }
          const textNode = document.createTextNode(cleanText);
          span.parentNode?.replaceChild(textNode, span);

          if (containerNode === span.firstChild && selection) {
            const newRange = document.createRange();
            newRange.setStart(textNode, Math.min(offset, cleanText.length));
            newRange.collapse(true);
            selection.removeAllRanges();
            selection.addRange(newRange);
          }
        }
      }
    });

    documentStore.loadedDocuments[state.instancia] = container.innerHTML;
  };

  if (deleteBtn) {
    deleteBtn.onclick = async (e: MouseEvent) => {
      e.stopPropagation();
      isDeleting = true;
      const blockId = editable.id;
      if (blockId && !blockId.startsWith("local-")) {
        await documentStore.deleteBlockFromBackend(blockId);
        // refresh sidebar options in case deleted block was linked to any section options
        await coordinator.loadSectionOptions(
          sectionId as keyof SectionResponseMap,
          state.docId,
          false,
          false
        );
      }
      wrapper.remove();
      documentStore.loadedDocuments[state.instancia] = container.innerHTML;
      await documentStore.saveDelete(state.instancia);
      isDeleting = false;
    };
  }

  editable.innerHTML = highlightBrackets(
    editable.innerHTML,
    documentStore.knownPlaceholders
  );

  editable.addEventListener(
    "keydown",
    (e: KeyboardEvent) => {
      if (e.key === "[" || e.key === "]") e.preventDefault();
    },
    { passive: false }
  );
}

function setupEditTracking(
  el: MedicalEditorElement,
  state: MedicalEditorState
) {
  const { documentStore } = state;
  const captureInitial = () => {
    state.initialHtml = cleanDocumentHtml(el.innerHTML);
  };
  state.captureInitial = captureInitial;
  el.__resetInitialSnapshot = captureInitial;
  captureInitial();

  let timeout: ReturnType<typeof setTimeout>;
  state.mutationObserver = new MutationObserver(() => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      const currentHtml = cleanDocumentHtml(el.innerHTML);
      const finalCurrent = removeIgnoredElements(currentHtml);
      const finalInitial = removeIgnoredElements(state.initialHtml);
      documentStore.editDocumentByTab[state.instancia] =
        finalCurrent !== finalInitial;
    }, 300);
  });

  state.mutationObserver.observe(el, {
    childList: true,
    subtree: true,
    characterData: true,
  });

  el.__resetInitialSnapshot = captureInitial;
}

function setupInsertWatcher(
  el: MedicalEditorElement,
  state: MedicalEditorState
) {
  const { documentStore } = state;

  // Watch for text insertions
  const insertWatcher = watch(
    () => documentStore.pendingInsert,
    (newVal) => {
      if (
        newVal &&
        (newVal.docId === state.docId || newVal.docId === state.instancia)
      ) {
        performInsert(el, newVal.item, newVal.relationship, state);
        documentStore.pendingInsert = null;
      }
    }
  );

  // Watch for signature insertions
  const signatureWatcher = watch(
    () => documentStore.pendingSignature,
    (newVal) => {
      if (
        newVal &&
        (newVal.docId === state.docId || newVal.docId === state.instancia)
      ) {
        performSignatureInsert(el, newVal.image, newVal.targetId, state);
        documentStore.pendingSignature = null;
      }
    }
  );

  // Watch for explicit snapshot reset signals (e.g. after a manual Get or Save)
  const resetWatcher = watch(
    () => documentStore.lastSnapshotReset,
    () => {
      nextTick(() => {
        if (state.captureInitial) {
          state.captureInitial();
          documentStore.editDocumentByTab[state.instancia] = false;
        }
      });
    }
  );

  state.pendingInsertWatcher = () => {
    insertWatcher();
    signatureWatcher();
    resetWatcher();
  };
}

function performInsert(
  container: MedicalEditorElement,
  item: InsertItem,
  relationship: boolean | string | null,
  state: MedicalEditorState
) {
  const { documentStore } = state;
  const targetId = documentStore.SelectedDocumentId;
  const target = container.querySelector(
    `#${targetId}, [id="${targetId}"]`
  ) as HTMLElement;

  if (!target) return;

  if (targetId === "referring_physicians") {
    target.querySelectorAll("div").forEach((div) => div.remove());
  }

  const wrapper = document.createElement("div");
  wrapper.classList.add("editable-wrapper");
  Object.assign(wrapper.style, {
    position: "relative",
    display: "block",
    marginTop: "4px",
  });

  const newLine = document.createElement("div");
  const safeId =
    item.id !== undefined && item.id !== null ? String(item.id).trim() : "";
  newLine.id = relationship ? safeId : `local-${safeId}`;
  newLine.classList.add("editable-line");

  if (item.insert_data) {
    const matches = item.insert_data.match(/\[([\s\S]*?)\]/g);
    if (matches)
      matches.forEach((m: string) => documentStore.knownPlaceholders.add(m));
  }

  newLine.innerHTML = highlightBrackets(
    item.insert_data || "",
    documentStore.knownPlaceholders
  );
  wrapper.appendChild(newLine);

  if (state.lastFocusedWrapper && target.contains(state.lastFocusedWrapper)) {
    state.lastFocusedWrapper.insertAdjacentElement("afterend", wrapper);
  } else {
    target.appendChild(wrapper);
  }

  nextTick(() => {
    state.userInteracted = true;
    setupEditable(newLine, container, state);
    newLine.focus();
    // Sync to store after insertion
    documentStore.loadedDocuments[state.instancia] = container.innerHTML;
  });
}

function performSignatureInsert(
  container: MedicalEditorElement,
  image: string,
  targetId: string,
  state: MedicalEditorState
) {
  const { documentStore } = state;
  const target = container.querySelector(
    `#${targetId}, [id="${targetId}"]`
  ) as HTMLElement;

  if (!target) {
    return;
  }

  // Create the <img> element
  const img = document.createElement("img");
  img.src = image;
  img.alt =
    targetId === "text_witness_signature"
      ? "signature witness"
      : "signature patient";
  img.style.maxWidth = "200px";
  img.style.display = "block";
  img.style.marginTop = "8px";
  img.style.borderRadius = "4px";

  // Append to target
  target.appendChild(img);

  // Sync to store
  documentStore.loadedDocuments[state.instancia] = container.innerHTML;

  // Trigger save
  nextTick(() => {
    documentStore.saveDocumentbyTab(state.instancia);
  });
}
