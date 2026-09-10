import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import PxDataTable from "./PxDataTable.vue";
import * as tableExport from "@/utils/tableExport";

describe("PxDataTable", () => {
  const sampleColumns = [
    { field: "name", header: "Name" },
    { field: "email", header: "Email" },
    { field: "role", header: "Role" },
  ];

  const sampleData = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Developer" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Manager" },
  ];

  it("renders table with provided columns and rows", () => {
    const wrapper = mount(PxDataTable, {
      props: {
        columns: sampleColumns,
        items: sampleData,
      },
    });

    expect(wrapper.text()).toContain("Alice Johnson");
    expect(wrapper.text()).toContain("Bob Smith");
    expect(wrapper.text()).toContain("Name");
    expect(wrapper.text()).toContain("Email");
  });

  it("renders title when provided", () => {
    const wrapper = mount(PxDataTable, {
      props: {
        columns: sampleColumns,
        items: sampleData,
        title: "Team Members",
      },
    });

    expect(wrapper.text()).toContain("Team Members");
  });

  it("renders export button when exportable is true", async () => {
    const wrapper = mount(PxDataTable, {
      props: {
        columns: sampleColumns,
        items: sampleData,
        exportable: true,
      },
    });

    const exportBtn = wrapper.find("button");
    expect(exportBtn.exists()).toBe(true);
    expect(wrapper.text()).toContain("Exportar");
  });

  it("calls exportToCSV when exportCSV is triggered", async () => {
    const spyCSV = vi.spyOn(tableExport, "exportToCSV").mockImplementation(() => {});

    const wrapper = mount(PxDataTable, {
      props: {
        columns: sampleColumns,
        items: sampleData,
        exportable: true,
        exportFileName: "test-users",
      },
    });

    // Call exposed method
    (wrapper.vm as unknown as { exportCSV: (opts?: Record<string, unknown>) => void }).exportCSV();

    expect(spyCSV).toHaveBeenCalled();
    expect(spyCSV).toHaveBeenCalledWith(
      sampleData,
      expect.arrayContaining([
        expect.objectContaining({ field: "name", header: "Name" }),
      ]),
      expect.objectContaining({ filename: "test-users" })
    );

    spyCSV.mockRestore();
  });

  it("calls exportToExcel when exportExcel is triggered", async () => {
    const spyExcel = vi.spyOn(tableExport, "exportToExcel").mockImplementation(() => {});

    const wrapper = mount(PxDataTable, {
      props: {
        columns: sampleColumns,
        items: sampleData,
        exportable: true,
        exportFileName: "test-users",
      },
    });

    (wrapper.vm as unknown as { exportExcel: (opts?: Record<string, unknown>) => void }).exportExcel();

    expect(spyExcel).toHaveBeenCalled();
    expect(spyExcel).toHaveBeenCalledWith(
      sampleData,
      expect.arrayContaining([
        expect.objectContaining({ field: "name", header: "Name" }),
      ]),
      expect.objectContaining({ filename: "test-users" })
    );

    spyExcel.mockRestore();
  });
});
