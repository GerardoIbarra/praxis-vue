<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';
import { Wordgard, menuBar, placeholder } from 'wordgard/editor';
import { fullSchema } from 'wordgard/schema';
import { history } from 'wordgard/history';
import { serialize } from 'wordgard/doc';
import { GardState } from 'wordgard/state';
import { Menu } from 'wordgard/command';
import type { PropType } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'Write something...'
  },
  readOnly: {
    type: Boolean,
    default: false
  },
  toolbarGroups: {
    type: Array as PropType<string[]>,
    default: () => ['commands', 'inline', 'block', 'insert']
  },
  minHeight: {
    type: String,
    default: '120px'
  },
  maxHeight: {
    type: String,
    default: '300px'
  }
});

const emit = defineEmits(['update:modelValue', 'focus', 'blur']);

const editorContainer = ref<HTMLElement | null>(null);
let editorInstance: Wordgard | null = null;
let isUpdatingFromProp = false;
let isInternalUpdate = false;

const buildConfig = () => {
  const config: any[] = [
    fullSchema(),
    history(),
    GardState.readOnly.of(props.readOnly),
    Wordgard.editable.of(!props.readOnly)
  ];

  if (!props.readOnly) {
    const templates: any[] = [];
    props.toolbarGroups.forEach(group => {
      if (group === 'commands' && Menu.Group.commands) {
        templates.push(Menu.Group.commands.template());
      } else if (group === 'inline' && Menu.Group.inline) {
        templates.push(Menu.Group.inline.template());
      } else if (group === 'block' && Menu.Group.block) {
        templates.push(Menu.Group.block.template());
      } else if (group === 'insert' && Menu.Group.insert) {
        templates.push(Menu.Group.insert.template());
      }
    });
    const finalTemplate = templates.length > 0 ? templates : [Menu.Group.top.template()];
    config.push(menuBar({ template: finalTemplate }));
  }

  if (props.placeholder) {
    config.push(placeholder(props.placeholder));
  }

  // Update listener to emit changes and handle focus/blur
  config.push(
    Wordgard.updateListener.of((update: any) => {
      if (isUpdatingFromProp) return;

      if (update.docChanged) {
        // Use Promise to escape the editor's synchronous flush phase
        Promise.resolve().then(() => {
          const html = serialize(update.state.doc).toHTML();
          isInternalUpdate = true;
          emit('update:modelValue', html);
          nextTick(() => {
            isInternalUpdate = false;
          });
        });
      }

      if (update.focusChanged) {
        Promise.resolve().then(() => {
          if (update.editor.hasFocus()) {
            emit('focus');
          } else {
            emit('blur');
          }
        });
      }
    })
  );

  return config;
};

const initEditor = () => {
  if (!editorContainer.value) return;

  const state = GardState.create({
    doc: props.modelValue || '<p></p>',
    config: buildConfig()
  });

  editorInstance = Wordgard.create({
    state,
    parent: editorContainer.value
  });
};

const destroyEditor = () => {
  if (editorInstance) {
    if (editorContainer.value) {
      editorContainer.value.innerHTML = '';
    }
    editorInstance = null;
  }
};

const reinitEditor = (content?: string) => {
  const targetContent = content !== undefined
    ? content
    : (editorInstance ? serialize(editorInstance.state.doc).toHTML() : props.modelValue);
  destroyEditor();
  nextTick(() => {
    const state = GardState.create({
      doc: targetContent || '<p></p>',
      config: buildConfig()
    });
    if (editorContainer.value) {
      editorInstance = Wordgard.create({
        state,
        parent: editorContainer.value
      });
    }
  });
};

watch(() => props.modelValue, (newVal) => {
  if (!editorInstance) return;
  if (isInternalUpdate) return;
  
  const currentVal = serialize(editorInstance.state.doc).toHTML();
  if (newVal !== currentVal) {
    isUpdatingFromProp = true;
    reinitEditor(newVal);
    nextTick(() => {
      isUpdatingFromProp = false;
    });
  }
});

watch(() => props.readOnly, () => {
  reinitEditor();
});

watch(() => props.placeholder, () => {
  reinitEditor();
});

watch(() => props.toolbarGroups, () => {
  reinitEditor();
}, { deep: true });

onMounted(() => {
  initEditor();
});

onBeforeUnmount(() => {
  destroyEditor();
});

const focus = () => {
  editorInstance?.focus();
};

defineExpose({
  focus,
  editorInstance
});
</script>

<template>
  <div 
    class="praxis-editor-wrapper" 
    :class="{ 'is-readonly': readOnly }"
    :style="{
      '--editor-min-height': minHeight,
      '--editor-max-height': maxHeight
    }"
  >
    <div ref="editorContainer" class="editor-container"></div>
  </div>
</template>

<style>
/* Style Wordgard components globally or within the wrapper */
.praxis-editor-wrapper {
  --bg-editor: #ffffff;
  --border-color: rgba(0, 0, 0, 0.08);
  --border-focus: #4f46e5;
  --bg-toolbar: rgba(249, 250, 251, 0.8);
  --text-color: #1f2937;
  --text-muted: #6b7280;
  --hover-btn: rgba(0, 0, 0, 0.04);
  --active-btn: rgba(79, 70, 229, 0.1);
  --active-text: #4f46e5;
  
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--bg-editor);
  color: var(--text-color);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.praxis-editor-wrapper:focus-within {
  border-color: var(--border-focus);
  box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.15), 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

/* Scrollable area */
wg-scroller {
  min-height: var(--editor-min-height, 120px);
  max-height: var(--editor-max-height, 300px);
  overflow-y: auto;
  padding: 12px 16px;
  outline: none;
}

/* Edit area formatting */
wg-content {
  font-family: 'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: var(--text-color);
  outline: none;
  min-height: 100px;
}

/* Headings styles */
wg-content h1, wg-content h2, wg-content h3 {
  font-weight: 700;
  color: #111827;
  margin-top: 1.2em;
  margin-bottom: 0.4em;
}
wg-content h1 { font-size: 1.6em; }
wg-content h2 { font-size: 1.4em; }
wg-content h3 { font-size: 1.15em; }

wg-content p {
  margin-bottom: 0.8em;
}

wg-content blockquote {
  border-left: 4px solid var(--border-focus);
  padding-left: 14px;
  color: var(--text-muted);
  font-style: italic;
  background: rgba(79, 70, 229, 0.03);
  padding-top: 6px;
  padding-bottom: 6px;
  margin: 1em 0;
  border-radius: 0 6px 6px 0;
}

/* Menu bar toolbar styling */
wg-menubar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  background: var(--bg-toolbar);
  border-bottom: 1px solid var(--border-color);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

button.wg-menu-button {
  background: transparent;
  border: none;
  border-radius: 6px;
  color: var(--text-color);
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 6px;
}

button.wg-menu-button:not(.wg-submenu-arrow) {
  width: 32px;
}

button.wg-menu-button.wg-submenu-arrow {
  width: auto;
  padding: 6px 12px;
}

button.wg-menu-button:hover {
  background: var(--hover-btn);
  transform: translateY(-1px);
}

button.wg-menu-button:active {
  transform: translateY(0);
}

button.wg-menu-button[aria-pressed="true"] {
  background: var(--active-btn);
  color: var(--active-text);
}

svg.wg-icon {
  width: 18px;
  height: 18px;
  fill: currentColor;
}

/* Submenu dropdown list styling */
wg-menu-list {
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 8px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  padding: 6px;
  z-index: 50;
  min-width: 120px;
}

wg-menu-list button.wg-menu-button {
  width: 100%;
  text-align: left;
  justify-content: flex-start;
  padding: 8px 12px;
  height: auto;
  font-size: 14px;
  font-family: inherit;
}

/* Color picker styling */
wg-color-picker {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 4px;
  padding: 8px;
}

wg-color-picker-color {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.1);
  transition: transform 0.15s ease;
}

wg-color-picker-color:hover {
  transform: scale(1.2);
}

/* Spacer */
wg-menu-spacer {
  flex-grow: 1;
}

/* Placeholder styling */
.wg-placeholder {
  color: var(--text-muted);
  opacity: 0.6;
}

/* Dark mode theme support */
:global(.dark) .praxis-editor-wrapper,
.dark .praxis-editor-wrapper {
  --bg-editor: #1e1e2e;
  --border-color: rgba(255, 255, 255, 0.08);
  --border-focus: #6366f1;
  --bg-toolbar: rgba(30, 30, 46, 0.8);
  --text-color: #cdd6f4;
  --text-muted: #a6adc8;
  --hover-btn: rgba(255, 255, 255, 0.08);
  --active-btn: rgba(99, 102, 241, 0.2);
  --active-text: #818cf8;
}

:global(.dark) wg-content h1, 
:global(.dark) wg-content h2, 
:global(.dark) wg-content h3,
.dark wg-content h1, 
.dark wg-content h2, 
.dark wg-content h3 {
  color: #f5c2e7;
}

:global(.dark) wg-menu-list,
.dark wg-menu-list {
  background: #252538;
  border-color: rgba(255, 255, 255, 0.08);
}
</style>
