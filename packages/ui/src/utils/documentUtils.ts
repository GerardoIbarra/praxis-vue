/**
 * Utility functions for rich-text document HTML manipulation and parsing.
 * These functions are pure and should not depend on the global document state
 * except for using DOMParser which is available in the browser.
 */

/**
 * Highlights text between brackets if it matches known placeholders.
 */
export const highlightBrackets = (
  text: string,
  knownPlaceholders: Set<string>
): string => {
  if (!text) return "";

  const parser = new DOMParser();
  const doc = parser.parseFromString(text, "text/html");

  // Remove existing highlight spans to avoid nesting
  const spans = doc.querySelectorAll("span");
  spans.forEach((span) => {
    if (
      (span.style.backgroundColor === "rgb(255, 243, 205)" ||
        span.style.backgroundColor === "#fff3cd" ||
        span.style.backgroundColor === "transparent") &&
      span.style.borderRadius === "3px"
    ) {
      const parent = span.parentNode;
      if (!parent) return;
      while (span.firstChild) parent.insertBefore(span.firstChild, span);
      parent.removeChild(span);
    }
  });

  const cleanHtml = doc.body.innerHTML;

  return cleanHtml.replace(/\[([\s\S]*?)\]/g, (match) => {
    if (!knownPlaceholders || !knownPlaceholders.has(match)) return match;

    const clean = match.replace(/<\/?span[^>]*>/g, "");
    return `<span style="background-color: #fff3cd; padding: 2px 4px; border-radius: 3px;">${clean}</span>`;
  });
};

/**
 * Cleans the document HTML by removing UI enrichment (borders, buttons, overlays).
 */
export const cleanDocumentHtml = (htmlString: string): string => {
  if (!htmlString) return "";

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  // 1. Classes to remove
  const classesToRemove = [
    "highlighted",
    "document-content-render",
    "slide-fade-enter-active",
    "slide-fade-enter-to",
    "slide-fade-leave-active",
    "slide-fade-leave-to",
    "fade-overlay-enter-active",
    "fade-overlay-leave-active",
    "doc-editing",
    "doc-focused",
  ];

  doc.querySelectorAll<HTMLElement>("*").forEach((el) => {
    classesToRemove.forEach((cls) => el.classList.remove(cls));

    // 2. Clear inline styles from animations/focus
    if (el.style.transform) el.style.transform = "";
    if (el.style.opacity) el.style.opacity = "";

    // 3. Clear focus/edit outlines and backgrounds
    el.style.outline = "";
    // Only clear background if it's the specific light-blue focus overlay
    if (
      el.style.backgroundColor === "rgba(59, 130, 246, 0.1)" ||
      el.style.backgroundColor === "rgba(59,130,246,0.1)"
    ) {
      el.style.backgroundColor = "";
    }
  });

  // 4. Remove delete buttons (including legacy buttons from old code)
  doc
    .querySelectorAll(".editable-wrapper button, .doc-delete-btn")
    .forEach((btn) => btn.remove());

  // 5. Unwrap editable-wrapper divs (UI structure)
  /*doc.querySelectorAll(".editable-wrapper").forEach((wrapper) => {
    const parent = wrapper.parentNode;
    if (!parent) return;
    while (wrapper.firstChild) parent.insertBefore(wrapper.firstChild, wrapper);
    parent.removeChild(wrapper);
  });*/

  // 6. Remove loading overlays/spinners
  doc
    .querySelectorAll(".backdrop-blur-sm, .animate-bounce")
    .forEach((el) => el.remove());

  // 7. Unwrap highlight spans (placeholders)
  doc.querySelectorAll("span").forEach((span) => {
    if (
      (span.style.backgroundColor === "rgb(255, 243, 205)" ||
        span.style.backgroundColor === "#fff3cd" ||
        span.style.backgroundColor === "transparent") &&
      span.style.borderRadius === "3px"
    ) {
      const parent = span.parentNode;
      if (!parent) return;
      while (span.firstChild) parent.insertBefore(span.firstChild, span);
      parent.removeChild(span);
    }
  });

  // 8. Final normalization: trim and remove whitespace between tags
  const cleanBody = doc.body.innerHTML.trim();
  return cleanBody.replace(/>\s+</g, "><");
};

/**
 * Removes signature elements for comparison.
 */
export const removeIgnoredElements = (htmlString: string): string => {
  if (!htmlString) return "";

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  const ignoredIds = ["text_witness_signature", "text_patients_signature"];
  ignoredIds.forEach((id) => {
    const el = doc.getElementById(id);
    if (el) el.remove();
  });

  // Normalize output exactly like cleanDocumentHtml
  const cleanBody = doc.body.innerHTML.trim();
  return cleanBody.replace(/>\s+</g, "><");
};

/**
 * Parses HTML to find which sections contain brackets.
 */
export const parseBracketsPerSection = (
  html: string,
  sectionLabels: Record<string, string>,
  knownPlaceholders: Set<string>
): string[] => {
  if (!html) return [];

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const sectionsWithBrackets = new Set<string>();

  Object.keys(sectionLabels).forEach((id) => {
    const el = doc.querySelector(`#${id}, [id="${id}"]`);
    if (el) {
      const text = el.textContent || "";
      const matches = text.match(/\[([\s\S]*?)\]/g);
      if (
        matches &&
        Array.from(matches).some((m) => knownPlaceholders.has(m))
      ) {
        sectionsWithBrackets.add(sectionLabels[id]);
      }
    }
  });

  // Fallback: search anywhere in HTML if no specific section matched
  /*if (sectionsWithBrackets.size === 0) {
    const matches = html.match(/\[([\s\S]*?)\]/g);
    if (matches && Array.from(matches).some((m) => knownPlaceholders.has(m))) {
      sectionsWithBrackets.add("Document");
    }
  }*/

  return Array.from(sectionsWithBrackets);
};

/**
 * Checks if required sections are empty.
 */
export const checkEmptyRequiredSections = (
  html: string,
  requiredSections: string[]
): boolean => {
  if (!html || !requiredSections || requiredSections.length === 0) return false;

  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  for (const sectionId of requiredSections) {
    const originalEl = doc.querySelector(`#${sectionId}, [id="${sectionId}"]`);
    if (!originalEl) return true; // Section missing entirely

    // Clone to avoid side effects during validation
    const el = originalEl.cloneNode(true) as HTMLElement;

    // EXCLUDE LABELS: Remove b and strong tags which usually contain the section title/prompt
    el.querySelectorAll("b, strong").forEach((label) => label.remove());

    let isSectionEmpty = true;
    const editableLines = el.querySelectorAll<HTMLElement>(".editable-line");

    if (editableLines.length > 0) {
      for (const line of editableLines) {
        const text = (line.textContent ?? "")
          .replace(/No data recorded/gi, "")
          .replace(/\*/g, "")
          .replace(/\u00A0/g, "")
          .trim();
        if (text.length > 0) {
          isSectionEmpty = false;
          break;
        }
      }
    } else {
      const text = (el.textContent ?? "")
        .replace(/No data recorded/gi, "")
        .replace(/\*/g, "")
        .replace(/\u00A0/g, "")
        .trim();
      if (text.length > 0) isSectionEmpty = false;
    }

    if (isSectionEmpty) return true;
  }

  return false;
};

/**
 * Resets the scroll position of the main clinical content viewport.
 * Crucial when switching tabs or documents to avoid staying at the bottom
 * if the previous document was long.
 */
export const resetViewScroll = (): void => {
  const main = document.querySelector("main");
  if (main) {
    main.scrollTop = 0;
  } else {
    window.scrollTo(0, 0);
  }
};
