<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import LazyLoadingSpinner from "@/components/base/LazyLoadingSpinner.vue";
import { Printer } from "@lucide/vue";

let pdfjsLib: any = null;

interface Props {
  url: string;
  scale?: number;
  height?: string;
  initialPage?: number;
  renderAllPages?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  scale: 1.5,
  height: '600px',
  initialPage: 1,
  renderAllPages: true,
});

const containerRef = ref<HTMLDivElement | null>(null);
const loading = ref<boolean>(true); // Estado de carga

const renderPDF = async () => {
  if (!props.url) return;

  loading.value = true; // Comienza el loading
  try {
    if (!pdfjsLib) {
      pdfjsLib = await import("pdfjs-dist");
      const pdfjsWorker = (await import("pdfjs-dist/build/pdf.worker.min.mjs?url")).default;
      pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
    }

    const loadingTask = pdfjsLib.getDocument({
      url: props.url,
      cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/cmaps/`,
      cMapPacked: true,
      standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/standard_fonts/`,
      verbosity: 0, // 0 = ERRORS (silences warnings like missing non-standard fonts)
    });
    const pdf = await loadingTask.promise;

    if (!containerRef.value) return;

    containerRef.value.innerHTML = ""; // limpiar

    const startPage = props.renderAllPages ? 1 : props.initialPage;
    const endPage = props.renderAllPages ? pdf.numPages : props.initialPage;

    for (let i = startPage; i <= endPage; i++) {
      if (i > pdf.numPages || i < 1) break;
      
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: props.scale });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      if (!context) continue;

      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({ canvasContext: context, viewport, canvas }).promise;

      if (!containerRef.value) return;

      // Wrap canvas in a page container for better visual separation
      const pageWrapper = document.createElement("div");
      pageWrapper.className = "pdf-page";
      pageWrapper.appendChild(canvas);
      containerRef.value.appendChild(pageWrapper);
    }
  } catch (error) {
    throw new Error("Error rendering PDF: ", { cause: error });
  } finally {
    loading.value = false; // Finaliza el loading
  }
};

onMounted(renderPDF);
watch([() => props.url, () => props.scale, () => props.initialPage, () => props.renderAllPages], renderPDF);

const printPDF = async () => {
  try {
    // download the PDF as a blob

    const response = await fetch(props.url);
    const blob = await response.blob();
    // temporal url for temporarily hosting the PDF in memory
    // force the blob to be treated as a PDF by setting the correct MIME type
    const pdfBlob = new Blob([blob], { type: "application/pdf" });
    const blobUrl = URL.createObjectURL(pdfBlob);

    // to visualize pdf in mobile, in the same window, just set the location to the blob URL
    //window.location.href = blobUrl;

    // this is to open it in a new window
    // open a new window in blank
    const printWindow = window.open("", "_blank");
    // check if the window was blocked by a popup blocker
    if (!printWindow) {
      alert("Por favor, permite las ventanas emergentes para poder imprimir.");
      return;
    }

    // to vizualize the pdf in memory, write a simple HTML page with an embed tag pointing to the blob URL
    printWindow.document.write(`
      <html>
        <head>
          <title>Print PDF</title>
          <style>
            body { margin: 0; padding: 0; }
            embed { width: 100vw; height: 100vh; display: block; }
          </style>
        </head>
        <body>
          <embed src="${blobUrl}" type="application/pdf" />
        </body>
      </html>
    `);

    // to process the pdf
    printWindow.document.close();

    // print after the PDF has had time to render in the new window
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 1000);
  } catch (error) {
    throw new Error("Failed to prepare print: ", { cause: error });
  }
};
</script>

<template>
  <div class="flex gap-6 w-full" :style="{ height: props.height }">
    <div class="basis-2/4 p-3">
      <!-- Spinner de carga -->
      <LazyLoadingSpinner v-if="loading" loading-text="Loading PDF..." />
      <div v-show="!loading" ref="containerRef" class="pdf-wrapper"></div>
    </div>
    <div class="basis-2/4 p-3 relative">
      <div class="absolute top-3 left-0 w-full">
        <div class="flex gap-3 items-center justify-start flex-nowrap">
          <button v-show="!loading" class="btn-save" @click="printPDF">
            <span class="flex items-center">
              <Printer class="icon-spacing" />
              Print PDF
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pdf-wrapper {
  width: 100%;
  height: 100%;
}

.pdf-viewer {
  width: 100%;
  height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 24px;
  padding: 24px;
}

.pdf-viewer :deep(.pdf-page) {
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  border-radius: 2px;
}

.pdf-viewer :deep(.pdf-page canvas) {
  display: block;
}
</style>
