import { describe, it, expect, vi, afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import PxCommandPalette from "./PxCommandPalette.vue";

describe("PxCommandPalette", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  const sampleCommands = [
    { id: "home", title: "Ir al Inicio", group: "Navegación", shortcut: ["G", "H"] },
    { id: "settings", title: "Configuración", group: "Sistema", keywords: ["ajustes", "opciones"] },
    { id: "logout", title: "Cerrar Sesión", group: "Sistema", disabled: true },
  ];

  it("does not render when modelValue is false", () => {
    const wrapper = mount(PxCommandPalette, {
      props: {
        modelValue: false,
        commands: sampleCommands,
      },
    });

    expect(document.body.querySelector('[role="dialog"]')).toBeNull();
  });

  it("renders when modelValue is true", () => {
    const wrapper = mount(PxCommandPalette, {
      props: {
        modelValue: true,
        commands: sampleCommands,
      },
    });

    const dialog = document.body.querySelector('[role="dialog"]');
    expect(dialog).not.toBeNull();
    expect(dialog?.textContent).toContain("Ir al Inicio");
    expect(dialog?.textContent).toContain("Configuración");
    expect(dialog?.textContent).toContain("Navegación");
  });

  it("filters commands based on search query", async () => {
    const wrapper = mount(PxCommandPalette, {
      props: {
        modelValue: true,
        commands: sampleCommands,
      },
    });

    const input = document.body.querySelector('input[type="text"]') as HTMLInputElement;
    input.value = "Inicio";
    input.dispatchEvent(new Event("input"));
    await wrapper.vm.$nextTick();

    const dialog = document.body.querySelector('[role="dialog"]');
    expect(dialog?.textContent).toContain("Ir al Inicio");
    expect(dialog?.textContent).not.toContain("Configuración");
  });

  it("filters by keyword", async () => {
    const wrapper = mount(PxCommandPalette, {
      props: {
        modelValue: true,
        commands: sampleCommands,
      },
    });

    const input = document.body.querySelector('input[type="text"]') as HTMLInputElement;
    input.value = "ajustes";
    input.dispatchEvent(new Event("input"));
    await wrapper.vm.$nextTick();

    const dialog = document.body.querySelector('[role="dialog"]');
    expect(dialog?.textContent).toContain("Configuración");
    expect(dialog?.textContent).not.toContain("Ir al Inicio");
  });

  it("executes perform function on command selection", async () => {
    const performSpy = vi.fn();
    const commandWithPerform = {
      id: "action-1",
      title: "Acción de prueba",
      perform: performSpy,
    };

    const wrapper = mount(PxCommandPalette, {
      props: {
        modelValue: true,
        commands: [commandWithPerform],
      },
    });

    const itemEl = document.body.querySelector('[data-active="true"]') as HTMLElement;
    itemEl.click();

    expect(performSpy).toHaveBeenCalled();
    expect(wrapper.emitted("select")?.[0][0]).toEqual(commandWithPerform);
  });
});
