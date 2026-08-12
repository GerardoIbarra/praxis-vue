<script setup lang="ts">
/**
 * @deprecated Use PxAvatar instead. Kept for backward compatibility.
 */
import PxAvatar from "@/components/base/PxAvatar.vue";

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
  <PxAvatar :name="name || ''" size="xl" />
</template>
