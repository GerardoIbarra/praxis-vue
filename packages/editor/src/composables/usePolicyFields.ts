import { computed } from "vue";
import type { Policy } from "@/types/api/medical-charts/form/insurance";

export function usePolicyFields(policy: Policy) {
  // Creates a computed property with a getter and setter linked to a reactive object
  const createField = <K extends keyof Policy>(key: K) =>
    computed({
      get: () => policy[key],
      set: (val) => (policy[key] = val as Policy[K]),
    });

  return {
    policy_number: createField("policy_number"),
    group_number: createField("group_number"),
    phone_number: createField("phone_number"),
    copay_amount: createField("copay_amount"),
    deductible_amount: createField("deductible_amount"),
    policy_effective_date: createField("policy_effective_date"),
    policy_end_date: createField("policy_end_date"),
    patient_relationship: createField("patient_relationship"),
    insured_name: createField("insured_name"),
    insured_id_number: createField("insured_id_number"),
    insured_address: createField("insured_address"),
    insured_address2: createField("insured_address2"),
    insured_zip_code: createField("insured_zip_code"),
    insured_city: createField("insured_city"),
    insured_state: createField("insured_state"),
    insured_ssn: createField("insured_ssn"),
    insured_date_of_birth: createField("insured_date_of_birth"),
    insured_gender: createField("insured_gender"),
    notes: createField("notes"),
    status_policy: createField("status"),
    plan: createField("plan"),
    other_info: createField("other_info"),
    eligibility_status: createField("eligibility_status"),
    last_checked_date: createField("last_checked_date"),
  };
}
