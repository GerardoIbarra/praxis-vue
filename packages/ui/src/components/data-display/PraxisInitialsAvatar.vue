<script setup lang="ts">
/**
 * @deprecated Use UiAvatar instead. Kept for backward compatibility.
 */
import UiAvatar from "@/components/base/UiAvatar.vue";

withDefaults(
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
</script>

<template>
  <UiAvatar :name="name || ''" size="xl" />
</template>
