<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    name?: string | null;
    size?: string;
    textClass?: string;
  }>(),
  {
    name: "User",
    size: "w-7 h-7",
    textClass: "text-xs font-bold",
  }
);

const avatarColors = [
  "bg-blue-500",
  "bg-green-500",
  "bg-orange-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-teal-500",
  "bg-cyan-500",
];

const avatarColor = computed(() => {
  const displayName = props.name || "User";
  let hash = 0;
  for (let i = 0; i < displayName.length; i++) {
    hash = displayName.charCodeAt(i) + ((hash << 5) - hash);
  }
  return avatarColors[Math.abs(hash) % avatarColors.length];
});

const initials = computed(() => {
  const displayName = props.name || "User";
  const cleanName = displayName
    .replace(/^(Dr\.|Nurse|CFO|CFO\s|Supervisor\s)/gi, "")
    .trim();
  return cleanName
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
});
</script>

<template>
  <div
    class="rounded-full flex items-center justify-center text-white shrink-0 mt-0.5"
    :class="[props.size, props.textClass, avatarColor]"
    :title="props.name || 'User'"
  >
    {{ initials }}
  </div>
</template>
