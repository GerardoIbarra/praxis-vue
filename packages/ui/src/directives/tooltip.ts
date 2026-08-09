import type { Directive, DirectiveBinding } from "vue";
import { createPopper, type Instance, type Placement } from "@popperjs/core";

interface TooltipEl extends HTMLElement {
  _tooltipPopper?: Instance;
  _tooltipEl?: HTMLElement;
  _tooltipShow?: () => void;
  _tooltipHide?: () => void;
}

type TooltipValue =
  | string
  | { value: string; class?: string; showDelay?: number };

const parseBinding = (
  binding: DirectiveBinding<TooltipValue>
): { text: string; placement: Placement; delay: number } => {
  const modifierPlacements: Partial<Record<string, Placement>> = {
    top: "top",
    bottom: "bottom",
    left: "left",
    right: "right",
  };

  const placement: Placement =
    (Object.keys(binding.modifiers).find(
      (m) => modifierPlacements[m]
    ) as Placement) || "top";

  if (typeof binding.value === "string") {
    return { text: binding.value, placement, delay: 0 };
  }

  return {
    text: binding.value?.value ?? "",
    placement,
    delay: binding.value?.showDelay ?? 0,
  };
};

const createTooltipEl = (): HTMLElement => {
  const el = document.createElement("div");
  el.className = "praxis-tooltip";
  el.setAttribute("role", "tooltip");
  return el;
};

const injectGlobalStyles = (() => {
  let injected = false;
  return () => {
    if (injected) return;
    injected = true;
    const style = document.createElement("style");
    style.textContent = `
      .praxis-tooltip {
        background: #1f2937;
        color: #f9fafb;
        padding: 0.375rem 0.625rem;
        border-radius: 0.375rem;
        font-size: 0.8125rem;
        line-height: 1.4;
        max-width: 260px;
        word-break: break-word;
        pointer-events: none;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.15s ease;
        box-shadow: 0 4px 6px rgba(0,0,0,0.2);
      }
      .praxis-tooltip[data-show] {
        opacity: 1;
      }
      .praxis-tooltip[data-popper-placement^='top'] > .praxis-tooltip-arrow {
        bottom: -4px;
      }
      .praxis-tooltip[data-popper-placement^='bottom'] > .praxis-tooltip-arrow {
        top: -4px;
      }
    `;
    document.head.appendChild(style);
  };
})();

export const vTooltip: Directive<TooltipEl, TooltipValue> = {
  mounted(el, binding) {
    injectGlobalStyles();

    const { text, placement, delay } = parseBinding(binding);
    if (!text) return;

    const tooltip = createTooltipEl();
    tooltip.textContent = text;
    document.body.appendChild(tooltip);

    const popper = createPopper(el, tooltip, {
      placement,
      modifiers: [{ name: "offset", options: { offset: [0, 8] } }],
    });

    let showTimeout: ReturnType<typeof setTimeout> | null = null;

    const show = () => {
      if (!text) return;
      if (delay > 0) {
        showTimeout = setTimeout(() => {
          tooltip.setAttribute("data-show", "");
          popper.update();
        }, delay);
      } else {
        tooltip.setAttribute("data-show", "");
        popper.update();
      }
    };

    const hide = () => {
      if (showTimeout) clearTimeout(showTimeout);
      tooltip.removeAttribute("data-show");
    };

    el.addEventListener("mouseenter", show);
    el.addEventListener("mouseleave", hide);
    el.addEventListener("focus", show);
    el.addEventListener("blur", hide);

    el._tooltipPopper = popper;
    el._tooltipEl = tooltip;
    el._tooltipShow = show;
    el._tooltipHide = hide;
  },

  updated(el, binding) {
    const { text } = parseBinding(binding);
    if (el._tooltipEl) {
      el._tooltipEl.textContent = text;
    }
  },

  beforeUnmount(el) {
    if (el._tooltipShow) el.removeEventListener("mouseenter", el._tooltipShow);
    if (el._tooltipHide) el.removeEventListener("mouseleave", el._tooltipHide);
    if (el._tooltipShow) el.removeEventListener("focus", el._tooltipShow);
    if (el._tooltipHide) el.removeEventListener("blur", el._tooltipHide);
    el._tooltipPopper?.destroy();
    el._tooltipEl?.remove();
  },
};

export default vTooltip;
