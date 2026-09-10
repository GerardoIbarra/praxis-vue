import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { ref, nextTick } from "vue";
import PxSchemaForm from "./PxSchemaForm.vue";
import PxSelect from "../_primitives/PxSelect.vue";

describe("PxSchemaForm", () => {
  it("selects an option in PxSelect with full docs schema and updates formData", async () => {
    const schema = [
      { key: "first_name", label: "First Name", type: "text", required: true },
      { key: "last_name", label: "Last Name", type: "text", required: true },
      { key: "dob", label: "Date of Birth", type: "date" },
      {
        key: "gender",
        label: "Gender",
        type: "select",
        options: [
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
        ],
        option_source: { label_field: "label", value_field: "value" },
      },
    ];

    const formData = ref<Record<string, unknown>>({});

    const wrapper = mount(PxSchemaForm, {
      props: {
        schema,
        modelValue: formData.value,
        "onUpdate:modelValue": (val: Record<string, unknown>) => {
          formData.value = val;
        },
      },
      attachTo: document.body,
    });

    const pxSelect = wrapper.findComponent(PxSelect);
    expect(pxSelect.exists()).toBe(true);

    // Click trigger to open dropdown
    const trigger = pxSelect.find(".cursor-pointer");
    await trigger.trigger("click");
    await nextTick();

    const options = pxSelect.findAll("li");
    expect(options.length).toBe(2);

    // Click "Male" option
    await options[0].trigger("click");
    await nextTick();

    console.log("After clicking Male:");
    console.log("HTML:", pxSelect.html());
    console.log("formData:", formData.value);
    console.log("isOpen:", pxSelect.find("ul").exists());
  });
});
