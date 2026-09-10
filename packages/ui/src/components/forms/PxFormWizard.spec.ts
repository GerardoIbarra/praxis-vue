import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import PxFormWizard from "./PxFormWizard.vue";
import { z } from "zod";
import type { WizardStep } from "@/types/ui/formWizard";

describe("PxFormWizard", () => {
  const steps: WizardStep[] = [
    {
      id: "step-1",
      title: "Cuenta",
      description: "Datos iniciales",
      schema: [
        {
          key: "email",
          label: "Correo",
          type: "text",
        },
      ],
      zodSchema: z.object({
        email: z.string().min(1, "El correo es obligatorio").email("Correo inválido"),
      }),
    },
    {
      id: "step-2",
      title: "Perfil",
      description: "Información personal",
      schema: [
        {
          key: "name",
          label: "Nombre",
          type: "text",
        },
      ],
    },
  ];

  it("renders steps in the stepper header", () => {
    const wrapper = mount(PxFormWizard, {
      props: {
        steps,
      },
    });

    expect(wrapper.text()).toContain("Cuenta");
    expect(wrapper.text()).toContain("Perfil");
    expect(wrapper.text()).toContain("Datos iniciales");
  });

  it("blocks advancing to next step if zod validation fails", async () => {
    const wrapper = mount(PxFormWizard, {
      props: {
        steps,
        modelValue: { email: "" },
      },
    });

    const nextBtn = wrapper.find("button.bg-p-primary");
    await nextBtn.trigger("click");

    expect(wrapper.text()).toContain("El correo es obligatorio");
    // Still on step 0
    expect((wrapper.vm as any).currentStepIndex).toBe(0);
  });

  it("advances to next step when validation passes", async () => {
    const wrapper = mount(PxFormWizard, {
      props: {
        steps,
        modelValue: { email: "user@example.com" },
      },
    });

    const nextBtn = wrapper.find("button.bg-p-primary");
    await nextBtn.trigger("click");

    expect((wrapper.vm as any).currentStepIndex).toBe(1);
    expect(wrapper.emitted("step-change")?.[0][0]).toBe(1);
  });

  it("emits complete when last step is submitted", async () => {
    const wrapper = mount(PxFormWizard, {
      props: {
        steps,
        modelValue: { email: "user@example.com", name: "Carlos" },
      },
    });

    // Advance to step 1
    await (wrapper.vm as any).next();
    expect((wrapper.vm as any).currentStepIndex).toBe(1);

    // Complete on step 1
    await (wrapper.vm as any).next();
    expect(wrapper.emitted("complete")).toBeTruthy();
    expect(wrapper.emitted("complete")?.[0][0]).toEqual({
      email: "user@example.com",
      name: "Carlos",
    });
  });
});
