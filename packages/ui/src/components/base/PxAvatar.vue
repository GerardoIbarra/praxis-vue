<script setup lang="ts">
import { computed, ref } from "vue";

const props = withDefaults(
  defineProps<{
    /** Name used to generate initials and as tooltip/alt text */
    name?: string | null;
    /** Image URL — takes priority over initials when provided */
    src?: string | null;
    /** Size preset */
    size?: "sm" | "md" | "lg" | "xl";
    /** Shape of the avatar */
    shape?: "circle" | "square";
    /** Auto-color from name hash, or a custom CSS color string */
    color?: string | "auto";
    /** Optional footer label (shows the full name below the avatar) */
    label?: boolean;
  }>(),
  {
    name: null,
    src: null,
    size: "md",
    shape: "circle",
    color: "auto",
    label: false,
  }
);

const imgError = ref(false);

const sizeClasses: Record<string, string> = {
  sm: "px-avatar--sm",
  md: "px-avatar--md",
  lg: "px-avatar--lg",
  xl: "px-avatar--xl",
};

const shapeClass = computed(() =>
  props.shape === "square" ? "px-avatar--square" : "px-avatar--circle"
);

const avatarPalette = [
  "#3b82f6", // blue
  "#10b981", // emerald
  "#f59e0b", // amber
  "#8b5cf6", // violet
  "#ec4899", // pink
  "#6366f1", // indigo
  "#14b8a6", // teal
  "#06b6d4", // cyan
];

const autoColor = computed(() => {
  const displayName = props.name || "?";
  let hash = 0;
  for (let i = 0; i < displayName.length; i++) {
    hash = displayName.charCodeAt(i) + ((hash << 5) - hash);
  }
  return avatarPalette[Math.abs(hash) % avatarPalette.length];
});

const bgStyle = computed(() => {
  if (props.src && !imgError.value) return {};
  const c = props.color === "auto" ? autoColor.value : props.color;
  return { backgroundColor: c };
});

const initials = computed(() => {
  const displayName = props.name || "?";
  // Strip common prefixes
  const clean = displayName
    .replace(/^(Dr\.|Mr\.|Mrs\.|Ms\.|Prof\.)\s*/gi, "")
    .trim();
  const words = clean.split(/\s+/);
  if (words.length === 1) return words[0].charAt(0).toUpperCase();
  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
});

const onImgError = () => {
  imgError.value = true;
};
</script>

<template>
  <div class="px-avatar-wrapper" :class="{ 'px-avatar-has-label': label }">
    <div
      class="px-avatar"
      :class="[sizeClasses[size], shapeClass]"
      :style="bgStyle"
      :title="name || undefined"
    >
      <!-- Image mode -->
      <img
        v-if="src && !imgError"
        :src="src"
        :alt="name || 'avatar'"
        class="px-avatar-img"
        @error="onImgError"
      />

      <!-- Initials fallback -->
      <span v-else class="px-avatar-initials">{{ initials }}</span>
    </div>

    <!-- Optional footer label -->
    <span v-if="label && name" class="px-avatar-label">{{ name }}</span>
  </div>
</template>

<style scoped>
.px-avatar-wrapper {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
}

.px-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
  color: #ffffff;
  font-weight: 700;
  user-select: none;
}

/* Shapes */
.px-avatar--circle { border-radius: 9999px; }
.px-avatar--square { border-radius: 0.5rem; }

/* Sizes */
.px-avatar--sm {
  width: 1.75rem;  /* 28px */
  height: 1.75rem;
  font-size: 0.65rem;
}
.px-avatar--md {
  width: 2.25rem;  /* 36px */
  height: 2.25rem;
  font-size: 0.8rem;
}
.px-avatar--lg {
  width: 3rem;     /* 48px */
  height: 3rem;
  font-size: 1rem;
}
.px-avatar--xl {
  width: 4rem;     /* 64px */
  height: 4rem;
  font-size: 1.25rem;
}

.px-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.px-avatar-initials {
  line-height: 1;
  letter-spacing: 0.02em;
}

.px-avatar-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: #6b7280;
  white-space: nowrap;
  max-width: 6rem;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
}

.dark .px-avatar-label {
  color: #9ca3af;
}
</style>
