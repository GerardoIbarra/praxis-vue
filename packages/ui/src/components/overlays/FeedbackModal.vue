<script setup lang="ts">
import { ref, reactive, watch } from "vue";
import Dialog from "primevue/dialog";
import Textarea from "primevue/textarea";
import InputText from "primevue/inputtext";
import { LifeBuoy, Send, X } from "@lucide/vue";
import * as Sentry from "@sentry/vue";
import { toast } from "vue3-toastify";
import { useFeedbackStore } from "@/stores/feedback";
import { storeToRefs } from "pinia";
import { useTokenExperition } from "@/stores/login";

const store = useFeedbackStore();
const { isVisible } = storeToRefs(store);

const loginStore = useTokenExperition();
const { userFirstName, userDataLoginEmail } = storeToRefs(loginStore);

const loading = ref(false);
const form = reactive({
  name: String(userFirstName.value || ""),
  email: String(userDataLoginEmail.value || ""),
  message: "",
});

// Update form when userData changes or modal opens
watch(isVisible, (newVal) => {
  if (newVal) {
    form.name = String(userFirstName.value || "");
    form.email = String(userDataLoginEmail.value || "");
  }
});

const close = () => {
  store.closeFeedback();
  form.message = "";
};

const handleSubmit = async () => {
  if (!form.message.trim()) return;

  loading.value = true;
  try {
    Sentry.captureFeedback({
      name: form.name,
      email: form.email,
      message: form.message,
    });

    toast.success(
      "Support request sent successfully. We'll get back to you soon!",
      {
        position: "bottom-right",
        autoClose: 4000,
      }
    );
    close();
  } catch (error) {
    console.error("Error sending feedback to Sentry:", error);
    toast.error("An error occurred while sending feedback. Please try again.");
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <Dialog
    v-model:visible="isVisible"
    modal
    :draggable="false"
    class="feedback-dialog"
    :style="{ width: '100%', maxWidth: '600px' }"
    :closable="false"
  >
    <template #header>
      <div class="flex justify-between items-center w-full">
        <h3 class="text-lg font-semibold flex items-center gap-2">
          <LifeBuoy class="w-5 h-5 text-blue-500" />
          Contact Support
        </h3>
        <div class="flex items-center gap-2">
          <button
            type="button"
            class="cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            @click="close"
          >
            <X class="w-6 h-6" />
          </button>
        </div>
      </div>
    </template>

    <form
      id="feedback-form"
      class="rounded-lg bg-primary p-2 flex flex-col gap-4"
      autocomplete="off"
      @submit.prevent="handleSubmit"
    >
      <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
        Need assistance or have a question? Send us a message and our support
        team will get back to you shortly.
      </p>

      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300"
          >Name</label
        >
        <InputText
          v-model="form.name"
          class="w-full"
          :disabled="!!userFirstName"
        />
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300"
          >Email</label
        >
        <InputText
          v-model="form.email"
          class="w-full"
          :disabled="!!userDataLoginEmail"
        />
      </div>

      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300"
          >Message <span class="text-red-500">*</span></label
        >
        <Textarea
          v-model="form.message"
          rows="4"
          class="w-full resize-none"
          placeholder="How can we help you today?"
          auto-resize
        />
      </div>
    </form>

    <template #footer>
      <div class="sm:col-span-6">
        <div class="btn-group-end">
          <button
            type="button"
            class="text-semibold-sm hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
            :disabled="loading"
            @click="close"
          >
            Cancel
          </button>

          <button
            form="feedback-form"
            type="submit"
            class="blue-button flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
            :disabled="!form.message.trim() || loading"
          >
            <Send v-if="!loading" class="w-4 h-4" />
            <i v-else class="pi pi-spinner pi-spin"></i>
            {{ loading ? "Sending..." : "Send" }}
          </button>
        </div>
      </div>
    </template>
  </Dialog>
</template>
