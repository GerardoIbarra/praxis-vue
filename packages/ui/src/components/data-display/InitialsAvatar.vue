<script setup lang="ts">
import { computed } from "vue";
import BaseAvatar from "@/components/base/BaseAvatar.vue";

const props = withDefaults(
  defineProps<{
    name?: string | null;
    size?: "normal" | "large" | "xlarge";
    lightOnly?: boolean;
  }>(),
  {
    name: "",
    size: "xlarge",
    lightOnly: false,
  }
);

const initials = computed(() => {
  if (!props.name) return "";
  const words = props.name.trim().split(/\s+/);
  if (words.length === 0) return "";
  if (words.length === 1) return words[0].charAt(0).toUpperCase();
  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
});
</script>

<template>
  <BaseAvatar
    :name="initials"
    :size="size"
    class="w-16! h-16! lg:w-20! lg:h-20!"
    :class="{
      'bg-gray-100! text-gray-800! dark:bg-gray-100! dark:text-gray-800!':
        lightOnly,
    }"
  />
</template>
