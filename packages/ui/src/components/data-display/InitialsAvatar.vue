<script setup lang="ts">
/**
 * @deprecated Use PraxisAvatar instead. Kept for backward compatibility.
 */
import PraxisAvatar from "@/components/base/PraxisAvatar.vue";

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
  <PraxisAvatar :name="name || ''" size="xl" />
</template>
