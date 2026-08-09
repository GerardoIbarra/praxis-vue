import { createPopper, type Instance as PopperInstance } from "@popperjs/core";
import type { ComponentPublicInstance } from "vue";

// Types
interface PopperOptions {
  width: string;
}

interface VueSelectComponent extends ComponentPublicInstance {
  $refs: {
    toggle: HTMLElement;
  };
}

/**
 * calculatePosition con Popper.js para vue-select
 */
export function usePopperPosition(
  dropdownList: HTMLElement,
  component: VueSelectComponent,
  { width }: PopperOptions
): () => void {
  dropdownList.style.width = width; // igualar ancho

  const popper: PopperInstance = createPopper(
    component.$refs.toggle,
    dropdownList,
    {
      placement: "bottom-start",
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, -1],
          },
        },
        {
          name: "toggleClass",
          enabled: true,
          phase: "write",
          fn({ state }) {
            component.$el.classList.toggle(
              "drop-up",
              state.placement === "top"
            );
          },
        },
      ],
    }
  );

  /**
   * To prevent memory leaks Popper needs to be destroyed.
   * If you return function, it will be called just before dropdown is removed from DOM.
   */
  return (): void => popper.destroy();
}
