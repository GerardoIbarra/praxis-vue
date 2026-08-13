<script setup lang="ts">
/**
 * PxNavList Component
 *
 * A collapsible navigation list, commonly used in a sidebar. Renders a flat array of items —
 * links, one level of grouped/expandable links, and section separators —
 * with active-route highlighting and an icon-only collapsed mode.
 *
 * The component has no opinion on routing, auth, or data fetching: pass it
 * an already-filtered `model` (e.g. after your own permission checks) and,
 * if you want active-route highlighting, the current path via `active-path`.
 * Use `link-component` to render items with your router's link component
 * instead of a plain anchor.
 *
 * @example
 * <PxNavList
 *   :model="menu"
 *   :collapsed="isCollapsed"
 *   :active-path="route.path"
 *   :link-component="RouterLink"
 *   @select="onSelect"
 * >
 *   <template #footer>
 *     <button @click="openHelp">Help</button>
 *   </template>
 * </PxNavList>
 */
import { ref, watch, onMounted, type Component } from "vue";
import { ChevronRight, ChevronDown } from "@lucide/vue";
import type { NavListItem } from "@/types/ui/navigation";

const props = withDefaults(
  defineProps<{
    model: NavListItem[];
    collapsed?: boolean;
    /** Current route path, used to highlight the active link and auto-expand its group */
    activePath?: string;
    /** Component or tag used to render leaf links (defaults to a plain anchor) */
    linkComponent?: string | Component;
  }>(),
  {
    collapsed: false,
    activePath: "",
    linkComponent: "a",
  }
);

const emit = defineEmits<{
  (e: "select", item: NavListItem): void;
}>();

const expandedKeys = ref<Set<string>>(new Set());

const isExpanded = (key?: string) => !!key && expandedKeys.value.has(key);

const toggleGroup = (key?: string) => {
  if (!key) return;
  const next = new Set(expandedKeys.value);
  next.has(key) ? next.delete(key) : next.add(key);
  expandedKeys.value = next;
};

const isActive = (to?: string) =>
  !!to &&
  !!props.activePath &&
  (props.activePath === to || props.activePath.startsWith(`${to}/`));

const groupHasActiveChild = (item: NavListItem) =>
  !!item.items?.some((child) => isActive(child.to));

const expandActiveGroups = () => {
  const next = new Set(expandedKeys.value);
  props.model.forEach((item) => {
    if (item.key && groupHasActiveChild(item)) next.add(item.key);
  });
  expandedKeys.value = next;
};

onMounted(expandActiveGroups);
watch(() => props.activePath, expandActiveGroups);

const linkAttrs = (to?: string) =>
  props.linkComponent === "a" ? { href: to } : { to };

const onSelect = (item: NavListItem) => emit("select", item);
</script>

<template>
  <nav class="px-nav-list">
    <slot name="header" />

    <template v-for="item in model" :key="item.key ?? item.label">
      <div
        v-if="item.separator"
        v-show="item.visible !== false"
        class="px-nav-list-separator"
        :class="{ 'px-nav-list-separator--collapsed': collapsed }"
      >
        <component :is="item.icon" v-if="item.icon" class="px-nav-list-separator-icon" />
        <span v-if="!collapsed" class="px-nav-list-separator-label">{{ item.label }}</span>
      </div>

      <div v-else-if="item.items" v-show="item.visible !== false" class="px-nav-list-group">
        <button
          type="button"
          class="px-nav-list-item"
          :class="{ 'px-nav-list-item--active': groupHasActiveChild(item) }"
          :title="collapsed ? item.label : undefined"
          @click="toggleGroup(item.key)"
        >
          <component :is="item.icon" v-if="item.icon" class="px-nav-list-item-icon" />
          <span v-if="!collapsed" class="px-nav-list-item-label">{{ item.label }}</span>
          <component
            :is="isExpanded(item.key) ? ChevronDown : ChevronRight"
            v-if="!collapsed"
            class="px-nav-list-item-chevron"
          />
        </button>

        <div v-if="isExpanded(item.key) && !collapsed" class="px-nav-list-subitems">
          <component
            :is="linkComponent"
            v-for="child in item.items"
            v-show="child.visible !== false"
            :key="child.key ?? child.label"
            v-bind="linkAttrs(child.to)"
            class="px-nav-list-item px-nav-list-item--sub"
            :class="{ 'px-nav-list-item--active': isActive(child.to) }"
            @click="onSelect(child)"
          >
            <component :is="child.icon" v-if="child.icon" class="px-nav-list-item-icon" />
            <span class="px-nav-list-item-label">{{ child.label }}</span>
          </component>
        </div>
      </div>

      <component
        :is="linkComponent"
        v-else
        v-show="item.visible !== false"
        v-bind="linkAttrs(item.to)"
        class="px-nav-list-item"
        :class="{ 'px-nav-list-item--active': isActive(item.to) }"
        :title="collapsed ? item.label : undefined"
        @click="onSelect(item)"
      >
        <component :is="item.icon" v-if="item.icon" class="px-nav-list-item-icon" />
        <span v-if="!collapsed" class="px-nav-list-item-label">{{ item.label }}</span>
      </component>
    </template>

    <div v-if="$slots.footer" class="px-nav-list-footer">
      <slot name="footer" />
    </div>
  </nav>
</template>

<style scoped>
.px-nav-list {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  height: 100%;
}

.px-nav-list-separator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  margin-top: 0.5rem;
}

.px-nav-list-separator--collapsed {
  justify-content: center;
}

.px-nav-list-separator-icon {
  width: 1rem;
  height: 1rem;
  color: var(--ui-text-muted, #64748b);
}

.px-nav-list-separator-label {
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--ui-text-muted, #64748b);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.px-nav-list-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  border: none;
  background: transparent;
  color: var(--ui-text, #0f172a);
  font-size: 0.875rem;
  text-decoration: none;
  cursor: pointer;
  width: 100%;
  text-align: left;
}

.px-nav-list-item:hover {
  background: var(--ui-bg-soft, #f8fafc);
}

.px-nav-list-item--active {
  background: var(--ui-primary, #2563eb);
  color: #fff;
  font-weight: 600;
}

.px-nav-list-item--sub {
  padding-left: 2rem;
}

.px-nav-list-item-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
}

.px-nav-list-item-label {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.px-nav-list-item-chevron {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}

.px-nav-list-footer {
  margin-top: auto;
  padding-top: 0.5rem;
  border-top: 1px solid var(--ui-border, #e2e8f0);
}
</style>
