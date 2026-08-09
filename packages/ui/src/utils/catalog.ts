// Interfaces for catalog options
export interface CatalogOption {
  name: string;
  value: string;
}

export interface CatalogOptionWithCode extends CatalogOption {
  code: string;
}

export interface CatalogOptionWithDescription extends CatalogOption {
  description?: string;
}

export interface SelectOption {
  value: string;
  text: string;
}

export interface NameOnlyOption {
  name: string;
}

export interface CatalogState {
  stateId: number;
  abbreviation: string;
  name: string;
}

export const getPrefix = async (): Promise<CatalogOption[]> => {
  return [
    {
      name: "Mr.",
      value: "mr.",
    },
    {
      name: "Mrs.",
      value: "mrs.",
    },
    {
      name: "Miss",
      value: "miss.",
    },
    {
      name: "Ms.",
      value: "ms.",
    },
    {
      name: "Dr.",
      value: "dr.",
    },
    {
      name: "Sir.",
      value: "sir.",
    },
    {
      name: "Prof.",
      value: "prof.",
    },
  ];
};

export const getStatusInsurance = async (): Promise<CatalogOption[]> => {
  return [
    {
      name: "Active",
      value: "active",
    },
    {
      name: "Inactive",
      value: "inactive",
    },
    {
      name: "All",
      value: "all",
    },
  ];
};
export const getSuffix = async (): Promise<CatalogOption[]> => {
  return [
    {
      name: "Jr.",
      value: "jr.",
    },
    {
      name: "Sr.",
      value: "sr.",
    },
    {
      name: "I",
      value: "i",
    },
    {
      name: "II",
      value: "ii",
    },
    {
      name: "III",
      value: "iii",
    },
    {
      name: "IV",
      value: "iv",
    },
    {
      name: "V",
      value: "v",
    },
    {
      name: "VI",
      value: "vi",
    },
    {
      name: "VII",
      value: "vii",
    },
    {
      name: "VIII",
      value: "viii",
    },
    {
      name: "IX",
      value: "ix",
    },
    {
      name: "X",
      value: "x",
    },
  ];
};

export const getGender = async (): Promise<CatalogOption[]> => {
  return [
    {
      name: "Female",
      value: "female",
    },
    {
      name: "Male",
      value: "male",
    },
    {
      name: "Other",
      value: "other",
    },
  ];
};

export const getTitle = async (): Promise<CatalogOption[]> => {
  return [
    { name: "ARNP", value: "arnp" },
    { name: "CNFP", value: "cnfp" },
    { name: "CRNA", value: "crna" },
    { name: "CPA", value: "cpa" },
    { name: "DO", value: "do" },
    { name: "DDS", value: "dds" },
    { name: "DMD", value: "dmd" },
    { name: "MA", value: "ma" },
    { name: "MBA", value: "mba" },
    { name: "MD", value: "md" },
    { name: "MS", value: "ms" },
    { name: "MSN", value: "msn" },
    { name: "ND", value: "nd" },
    { name: "NP", value: "np" },
    { name: "OD", value: "od" },
    { name: "PA", value: "pa" },
    { name: "PhD", value: "phd" },
    { name: "RN", value: "rn" },
    { name: "RPA", value: "rpa" },
    { name: "LVN", value: "lvn" },
    { name: "LPN", value: "lpn" },
    { name: "GI Technician", value: "gi technician" },
    { name: "OR Technician", value: "or technician" },
    { name: "Phone Center", value: "phone center" },
    { name: "Front Office", value: "front office" },
    { name: "DC", value: "dc" },
    { name: "DPM", value: "dpm" },
    { name: "PsyD", value: "psyd" },
    { name: "FNP", value: "fnp" },
    { name: "FNP-C", value: "fnp-c" },
    { name: "PA-C", value: "pa-c" },
    { name: "PT", value: "pt" },
    { name: "DPT", value: "dpt" },
    { name: "PTA", value: "pta" },
    { name: "OTR/L", value: "otr/l" },
    { name: "LCSW", value: "lcsw" },
    { name: "LMFT", value: "lmft" },
    { name: "MFT", value: "mft" },
    { name: "AMFT", value: "amft" },
    { name: "MSW", value: "msw" },
    { name: "ASW", value: "asw" },
    { name: "BCBA", value: "bcba" },
    { name: "RBT", value: "rbt" },
    { name: "PharmD", value: "pharmd" },
    { name: "RPH", value: "rph" },
    { name: "BA", value: "ba" },
    { name: "RD", value: "rd" },
    { name: "LAc", value: "lac" },
  ];
};

export const getTypePatient = async (): Promise<CatalogOption[]> => {
  return [
    {
      name: "Ambulatory",
      value: "ambulatory",
    },
    {
      name: "Emergency",
      value: "emergency",
    },
    {
      name: "Inpatient",
      value: "inpatient",
    },
    {
      name: "Outpatient",
      value: "outpatient",
    },
    {
      name: "Preadmit",
      value: "preadmit",
    },
    {
      name: "Recorring patient",
      value: "recorring patient",
    },
    {
      name: "Test Patient",
      value: "test patient",
    },
  ];
};

export const getRace = async (): Promise<CatalogOption[]> => {
  return [
    {
      name: "Black or African American",
      value: "black or african american",
    },
    {
      name: "Asian",
      value: "asian",
    },
    {
      name: "Native Hawaian or Other Pacific Islander",
      value: "native hawaian or other pacific islander",
    },
    {
      name: "White",
      value: "white",
    },
    {
      name: "American Indian or Alaska Native",
      value: "american indian or alaska native",
    },
    {
      name: "Other Race",
      value: "other race",
    },
    {
      name: "Unknown",
      value: "unknown",
    },
    {
      name: "Patient declines to specify",
      value: "patient declines to specify",
    },
    {
      name: "Prohibited by state laws",
      value: "prohibited by state laws",
    },
  ];
};

export const getEthnicity = async (): Promise<CatalogOption[]> => {
  return [
    {
      name: "Hispanic or Latino",
      value: "hispanic or latino",
    },
    {
      name: "Not Hispanic or Latino",
      value: "not hispanic or latino",
    },
    {
      name: "Patient declines to specify",
      value: "patient declines to specify",
    },
    {
      name: "Prohibited by state laws",
      value: "prohibited by state laws",
    },
    {
      name: "Unknown",
      value: "unknown",
    },
  ];
};

export const getNationality = async (): Promise<CatalogOption[]> => {
  return [
    { name: "Afghanistan", value: "afghanistan" },
    { name: "Argentina", value: "argentina" },
    { name: "Australia", value: "australia" },
    { name: "Brazil", value: "brazil" },
    { name: "Canada", value: "canada" },
    { name: "Chile", value: "chile" },
    { name: "China", value: "china" },
    { name: "Colombia", value: "colombia" },
    { name: "Cuba", value: "cuba" },
    { name: "Dominican Republic", value: "dominican republic" },
    { name: "Ecuador", value: "ecuador" },
    { name: "Egypt", value: "egypt" },
    { name: "El Salvador", value: "el salvador" },
    { name: "France", value: "france" },
    { name: "Germany", value: "germany" },
    { name: "Guatemala", value: "guatemala" },
    { name: "Honduras", value: "honduras" },
    { name: "India", value: "india" },
    { name: "Italy", value: "italy" },
    { name: "Japan", value: "japan" },
    { name: "Mexico", value: "mexico" },
    { name: "Morocco", value: "morocco" },
    { name: "Netherlands", value: "netherlands" },
    { name: "Nicaragua", value: "nicaragua" },
    { name: "Nigeria", value: "nigeria" },
    { name: "Panama", value: "panama" },
    { name: "Paraguay", value: "paraguay" },
    { name: "Peru", value: "peru" },
    { name: "Philippines", value: "philippines" },
    { name: "Poland", value: "poland" },
    { name: "Portugal", value: "portugal" },
    { name: "Russia", value: "russia" },
    { name: "South Africa", value: "south africa" },
    { name: "South Korea", value: "south korea" },
    { name: "Spain", value: "spain" },
    { name: "Sweden", value: "sweden" },
    { name: "Switzerland", value: "switzerland" },
    { name: "Turkey", value: "turkey" },
    { name: "Ukraine", value: "ukraine" },
    { name: "United Kingdom", value: "united kingdom" },
    { name: "United States", value: "united states" },
    { name: "Uruguay", value: "uruguay" },
    { name: "Venezuela", value: "venezuela" },
    { name: "Vietnam", value: "vietnam" },
    { name: "Other", value: "other" },
  ];
};

export const getContactPreference = async (): Promise<CatalogOption[]> => {
  return [
    {
      name: "Email",
      value: "email",
    },
    {
      name: "Mobile",
      value: "mobile",
    },
  ];
};
export const getReferralSources = async (): Promise<CatalogOption[]> => {
  return [
    { name: "Doctor", value: "doctor" },
    { name: "Insurance", value: "insurance" },
    { name: "Website", value: "website" },
    { name: "Friend/Family", value: "friend/family" },
    { name: "Social Media", value: "social media" },
    { name: "Walk-in", value: "walk-in" },
    { name: "Other", value: "other" },
  ];
};

export const getLanguages = async (): Promise<CatalogOption[]> => {
  return [
    { name: "English", value: "english" },
    { name: "Spanish", value: "spanish" },
    { name: "French", value: "french" },
    { name: "Mandarin", value: "mandarin" },
    { name: "German", value: "german" },
    { name: "Portuguese", value: "portuguese" },
    { name: "Arabic", value: "arabic" },
    { name: "Hindi", value: "hindi" },
    { name: "Japanese", value: "japanese" },
    { name: "Other", value: "other" },
  ];
};

export const status_detail_info = async (): Promise<CatalogOption[]> => {
  const options = [
    {
      name: "Active",
      value: "active",
    },
    {
      name: "Inactive",
      value: "inactive",
    },
    {
      name: "Temporary",
      value: "temporary",
    },
  ];

  return options;
};

export const health_status = async (): Promise<CatalogOption[]> => {
  return [
    {
      name: "Excellent",
      value: "excellent",
    },
    {
      name: "Very Good",
      value: "very good",
    },
    {
      name: "Good",
      value: "good",
    },
    {
      name: "Fair",
      value: "fair",
    },
    {
      name: "Poor",
      value: "poor",
    },
    {
      name: "Critical",
      value: "critical",
    },
    {
      name: "Terminal Iliness",
      value: "terminal illness",
    },
    {
      name: "Terminal Illness - early stage",
      value: "terminal illness - early stage",
    },
    {
      name: "Terminal Illness - late stage",
      value: "terminal illness - late stage",
    },
  ];
};

export const identification_type = async (): Promise<CatalogOption[]> => {
  return [
    {
      name: "Driver's License",
      value: "driver license",
    },
    {
      name: "Passport",
      value: "passport",
    },
    {
      name: "State ID",
      value: "state id",
    },
    {
      name: "Other",
      value: "other",
    },
  ];
};

export const getTypeContact = async (): Promise<CatalogOption[]> => {
  return [
    {
      name: "Work",
      value: "work",
    },

    {
      name: "Home",
      value: "home",
    },

    {
      name: "Mobile",
      value: "mobile",
    },
  ];
};

export const getEmailsType = async (): Promise<CatalogOption[]> => {
  return [
    {
      name: "Work",
      value: "work",
    },

    {
      name: "Personal",
      value: "personal",
    },
  ];
};

export const getAdressType = async (): Promise<CatalogOption[]> => {
  return [
    {
      name: "Home",
      value: "home",
    },

    {
      name: "Work",
      value: "work",
    },

    {
      name: "Billing",
      value: "billing",
    },
  ];
};

export const RelationShipType = async (): Promise<CatalogOption[]> => {
  return [
    {
      name: "Spouse",
      value: "spouse",
    },
    {
      name: "Daugther",
      value: "daugther",
    },
    {
      name: "Son",
      value: "son",
    },
    {
      name: "Adopted Child",
      value: "adopted child",
    },
    {
      name: "Foster Child",
      value: "foster child",
    },
    {
      name: "Daugther-in-law",
      value: "daugther-in-law",
    },
    {
      name: "Son-in-law",
      value: "son-in-law",
    },
    {
      name: "Stepchild",
      value: "stepchild",
    },
    {
      name: "Child",
      value: "child",
    },
    {
      name: "Mother",
      value: "mother",
    },
    {
      name: "Father",
      value: "father",
    },
    {
      name: "Adoptive Parent",
      value: "adoptive parent",
    },
    {
      name: "Foster Parent",
      value: "foster parent",
    },
    {
      name: "Parent-in-Law",
      value: "parent-in-law",
    },
    {
      name: "Stepparent",
      value: "stepparent",
    },
    {
      name: "Parent",
      value: "parent",
    },
    {
      name: "Sister",
      value: "sister",
    },
    {
      name: "Brother",
      value: "brother",
    },
    {
      name: "Adoptive Sibling",
      value: "adoptive sibling",
    },
    {
      name: "Foster Sibling",
      value: "foster sibling",
    },
    {
      name: "Step-Sibling",
      value: "step-sibling",
    },
    {
      name: "Maternal Grandmother",
      value: "maternal grandmother",
    },
    {
      name: "Paternal Grandmother",
      value: "paternal grandmother",
    },
    {
      name: "Grandmother",
      value: "grandmother",
    },
    {
      name: "Grandfather",
      value: "grandfather",
    },
    {
      name: "Maternal Grandfather",
      value: "maternal grandfather",
    },
    {
      name: "Maternal Grandfather",
      value: "maternal grandfather",
    },
    {
      name: "GrandFather",
      value: "grandfather",
    },
    {
      name: "Maternal Aunt",
      value: "maternal aunt",
    },
    {
      name: "Paternal Aunt",
      value: "paternal aunt",
    },
    {
      name: "Aunt",
      value: "aunt",
    },
    {
      name: "Uncle",
      value: "uncle",
    },
    {
      name: "Maternal Uncle",
      value: "maternal uncle",
    },
    {
      name: "Paternal Uncle",
      value: "paternal uncle",
    },
    {
      name: "Fist Cousin",
      value: "fist cousin",
    },
    {
      name: "Other Relative",
      value: "other relative",
    },
    {
      name: "Unknown Family Member",
      value: "unknown family member",
    },
    {
      name: "Nurse",
      value: "nurse",
    },
    {
      name: "Other",
      value: "other",
    },
  ];
};

export const getStatus = async (): Promise<CatalogOption[]> => {
  return [
    {
      name: "Active",
      value: "active",
    },
    {
      name: "Inactive",
      value: "inactive",
    },
  ];
};

export const getSpeciality = async (): Promise<CatalogOption[]> => {
  return [
    // Medicina Interna y Subespecialidades
    { name: "Internal Medicine", value: "internal medicine" },
    { name: "Cardiology", value: "cardiology" },
    { name: "Gastroenterology", value: "gastroenterology" },
    { name: "Pulmonology", value: "pulmonology" },
    { name: "Endocrinology", value: "endocrinology" },
    { name: "Nephrology", value: "nephrology" },
    { name: "Rheumatology", value: "rheumatology" },
    { name: "Infectious Disease", value: "infectious disease" },
    { name: "Oncology/Hematology", value: "oncology_hematology" },
    { name: "Geriatric Medicine", value: "geriatric medicine" },

    // Medicina General y Familiar
    { name: "Family Medicine", value: "family medicine" },
    { name: "General Practice", value: "general practice" },

    // Cirugía y Subespecialidades
    { name: "Surgery", value: "surgery" },
    { name: "Orthopedic Surgery", value: "orthopedic surgery" },
    { name: "Neurological Surgery", value: "neurological surgery" },
    { name: "Plastic Surgery", value: "plastic surgery" },
    { name: "Vascular Surgery", value: "vascular surgery" },
    { name: "Colon and Rectal Surgery", value: "colon and rectal surgery" },
    { name: "Hand Surgery", value: "hand surgery" },
    { name: "Trauma Surgery", value: "trauma surgery" },

    // Pediatría y Subespecialidades
    { name: "Pediatrics", value: "pediatrics" },
    { name: "Pediatric Cardiology", value: "pediatric cardiology" },
    { name: "Pediatric Critical Care", value: "pediatric critical care" },
    { name: "Pediatric Endocrinology", value: "pediatric endocrinology" },
    {
      name: "Pediatric Hematology-Oncology",
      value: "pediatric hematology_oncology",
    },
    { name: "Pediatric Nephrology", value: "pediatric nephrology" },
    { name: "Pediatric Pulmonology", value: "pediatric pulmonology" },

    // Ginecología y Obstetricia
    { name: "Obstetrics and Gynecology", value: "obstetrics and gynecology" },
    { name: "Gynecology", value: "gynecology" },
    { name: "Maternal-Fetal Medicine", value: "maternal_fetal medicine" },
    { name: "Reproductive Endocrinology", value: "reproductive endocrinology" },

    // Especialidades Quirúrgicas
    { name: "Anesthesiology", value: "anesthesiology" },
    { name: "Ophthalmology", value: "ophthalmology" },
    { name: "Otolaryngology", value: "otolaryngology" },
    { name: "Urology", value: "urology" },

    // Especialidades Diagnósticas
    { name: "Pathologist", value: "pathologist" },
    { name: "Radiology", value: "radiology" },
    { name: "Nuclear Medicine", value: "nuclear medicine" },
    { name: "Radiation Oncology", value: "radiation oncology" },

    // Neurología y Psiquiatría
    { name: "Neurology", value: "neurology" },
    { name: "Psychiatry", value: "psychiatry" },
    { name: "Child Psychiatry", value: "child psychiatry" },

    // Medicina de Emergencia y Cuidados Críticos
    { name: "Emergency Medicine", value: "emergency medicine" },
    { name: "Critical Care", value: "critical care" },

    // Medicina Física y Rehabilitación
    {
      name: "Physical Medicine and Rehabilitation",
      value: "physical medicine",
    },
    { name: "Pain Medicine", value: "pain medicine" },

    // Especialidades de la Piel
    { name: "Dermatology", value: "dermatology" },
    { name: "Dermatopathology", value: "dermatopathology" },

    // Otras Especialidades
    { name: "Allergy and Immunology", value: "allergy and immunology" },
    { name: "Sleep Medicine", value: "sleep medicine" },
    { name: "Sports Medicine", value: "sports medicine" },
    { name: "Hospitalist", value: "hospitalist" },
  ];
};

export const getTypeIdentification = async (
  nadeanField: boolean
): Promise<CatalogOption[]> => {
  const options = [
    { name: "NPI", value: "npi" },
    { name: "Lic#.", value: "lic#." },
    { name: "DEA", value: "dea" },
    { name: "MCD", value: "mcd" },
    { name: "MCR", value: "mcr" },
    { name: "UPIN", value: "upin" },
    { name: "Other", value: "other" },
    { name: "CTP", value: "ctp" },
    { name: "Immunization Registry ID", value: "immunization registry id" },
    { name: "Syndromic Surveillance ID", value: "syndromic surveillance id" },
    { name: "Staff ID", value: "staff id" },
    { name: "NADEAN", value: "nadean" },
    { name: "EIN", value: "ein" },
    { name: "Medicare", value: "medicare" },
    { name: "Medicaid", value: "medicaid" },
    { name: "Blue Cross", value: "blue cross" },
    { name: "Blue Shield", value: "blue shield" },
    { name: "CHAMPUS", value: "champus" },
    { name: "CHAMPVA", value: "champva" },
    { name: "Commercial", value: "commercial" },
    { name: "Railroad", value: "railroad" },
    { name: "Veterans", value: "veterans" },
    { name: "Workers Comp", value: "workers comp" },
    { name: "State ID", value: "state id" },
  ];

  if (!nadeanField) {
    return options.filter((opt) => opt.value !== "nadean");
  }

  return options;
};

export const getTypeReferringPhysiciaans = async (): Promise<
  CatalogOption[]
> => {
  return [
    { name: "Intitutional", value: "institution" },
    { name: "Person", value: "person" },
  ];
};

export const getTypeProviders = async (): Promise<CatalogOption[]> => {
  return [
    { name: "Advanced Practice Provider", value: "advanced practice provider" },
    { name: "Attending", value: "attending" },
    { name: "Fellow", value: "fellow" },
    { name: "Resident", value: "resident" },
  ];
};

export const getStatusEmploments = async (): Promise<CatalogOption[]> => {
  return [
    { name: "Full Time", value: "full time" },
    { name: "Part Time", value: "part time" },
    { name: "Not Employed", value: "not employed" },
    { name: "Retired", value: "retired" },
  ];
};

export const getStatusStudent = async (): Promise<CatalogOption[]> => {
  return [
    { name: "Full Time", value: "full time" },
    { name: "Part Time", value: "part time" },
  ];
};

export const getPlaceOfService = async (): Promise<CatalogOptionWithCode[]> => {
  return [
    { name: "Office", value: "office", code: "11" },
    {
      name: "Ambulatory surgicial center",
      value: "ambulatory surgicial center",
      code: "24",
    },
    { name: "Inpatient Hospital", value: "inpatient hospital", code: "21" },
    { name: "On campus-Outpatient", value: "on campus-outpatient", code: "22" },
    { name: "Outreach Site/Street", value: "outreach site", code: "27" },
    {
      name: "Telehealth Provided Other than in Patients Home",
      value: "telehealth provided other than in patients home",
      code: "2",
    },
    {
      name: "Ambulance - Land",
      value: "ambulance - land",
      code: "41",
    },
    {
      name: "Ambulance - Air or Water",
      value: "ambulance - air or water",
      code: "42",
    },

    {
      name: "Assisted Living Facility",
      value: "assisted living facility",
      code: "13",
    },
    {
      name: "Brithing Center",
      value: "brithing center",
      code: "25",
    },
    {
      name: "Community Mental Health Center",
      value: "community mental health center",
      code: "53",
    },
    {
      name: "Comprehensive Inpatient Rehabilitation Facility",
      value: "comprehensive inpatient rehabilitation facility",
      code: "61",
    },
    {
      name: "Comprehensive Outpatient Rehabilitation Facility",
      value: "comprehensive outpatient rehabilitation facility",
      code: "62",
    },
    {
      name: "Custodial care Facility",
      value: "custodial care facility",
      code: "33",
    },
    {
      name: "Emergency Room - Hospital",
      value: "emergency room - hospital",
      code: "23",
    },
    {
      name: "End-stage Renal Diesease Treatment Facility",
      value: "end-stage renal diesease treatment facility",
      code: "65",
    },

    {
      name: "Federally Qualifield Health Center",
      value: "federally qualifield health center",
      code: "50",
    },
    {
      name: "Group Home",
      value: "group home",
      code: "14",
    },
    {
      name: "Home",
      value: "home",
      code: "12",
    },
    {
      name: "Homeless Shelter",
      value: "homeless shelter",
      code: "4",
    },
    {
      name: "Hospice",
      value: "hospice",
      code: "34",
    },
    {
      name: "Independent Clinic",
      value: "independent clinic",
      code: "49",
    },
    {
      name: "Independent Laboratory",
      value: "independent laboratory",
      code: "81",
    },
    {
      name: "Indian Health Service Free-Standing Facility",
      value: "indian health service free-standing facility",
      code: "5",
    },
    {
      name: "Indian Health Service Provider-based Hospital",
      value: "indian health service provider-based hospital",
      code: "6",
    },
    {
      name: "Inpatient Psychiatric Facility",
      value: "inpatient psychiatric facility",
      code: "51",
    },
    {
      name: "Intermediate Care Facility/Mentally Retarded",
      value: "intermediate care facility/mentally retarded",
      code: "54",
    },
    {
      name: "Mass Immunization Center",
      value: "mass immunization center",
      code: "60",
    },
    {
      name: "Military Treatment Facility",
      value: "military treatment facility",
      code: "26",
    },
    {
      name: "Mobile Unit",
      value: "mobile unit",
      code: "15",
    },
    {
      name: "Non-residential Substance Abuse Treatment Facility",
      value: "non-residential substance abuse treatment facility",
      code: "57",
    },
    {
      name: "Nursing Facility",
      value: "nursing facility",
      code: "32",
    },
    {
      name: "Off Campus - Outpatient",
      value: "off campus - outpatient",
      code: "19",
    },
    {
      name: "Other Place of Service",
      value: "other place of service",
      code: "99",
    },
    {
      name: "Pharmacy",
      value: "pharmacy",
      code: "1",
    },
    {
      name: "Prison/Correctional Facility",
      value: "prison/correctional facility",
      code: "9",
    },
    {
      name: "Psychiatric Facility-Partial Hospitalization",
      value: "psychiatric facility-partial hospitalization",
      code: "52",
    },
    {
      name: "Psychiatric Residential Treatment",
      value: "psychiatric residential treatment",
      code: "56",
    },
    {
      name: "Public Health Clinic",
      value: "public health clinic",
      code: "71",
    },
    {
      name: "Residential Substance Abuse Treatment Facility",
      value: "residential substance abuse treatment facility",
      code: "55",
    },
    {
      name: "Rural Health Clinic",
      value: "rural health clinic",
      code: "72",
    },
    {
      name: "School",
      value: "school",
      code: "3",
    },
    {
      name: "Skilled Nursing Facility",
      value: "skilled nursing facility",
      code: "31",
    },
    {
      name: "Telehealth Provided in Patients Home",
      value: "telehealth provided in patients home",
      code: "10",
    },
    {
      name: "Temporary Lodging",
      value: "temporary lodging",
      code: "16",
    },
    {
      name: "Tribal 638 Free-Standing Facility",
      value: "tribal 638 free-standing facility",
      code: "7",
    },
    {
      name: "Tribal 638 Provider-Based Facility",
      value: "tribal 638 provider-based facility",
      code: "8",
    },
    {
      name: "Urgent care Facility",
      value: "urgent care facility",
      code: "20",
    },
    {
      name: "Walk-in Retail Health Clinic",
      value: "walk-in Retail health Clinic",
      code: "17",
    },
  ];
};

export const getClaimFillingIndicator = async (): Promise<CatalogOption[]> => {
  return [
    { name: "Automobile Medical", value: "automobile medical" },
    { name: "Blue Cross/Blue Shield", value: "blue cross/blue shield" },
    { name: "Champus", value: "champus" },
    { name: "Commercial Insurance Co.", value: "commercial insurance co." },
    { name: "Disability", value: "disability" },
    { name: "Federal Employees Program", value: "federal employees program" },
    {
      name: "Health Maintenance Organization",
      value: "health maintenance Organization",
    },
    { name: "Liability Medical", value: "liability medical" },
    { name: "Medicare Part A", value: "medicare part a" },
    { name: "Medicare Part B", value: "medicare part b" },
    { name: "Medicaid", value: "medicaid" },
    { name: "Other Federal Programs", value: "other federal programs" },
    { name: "Title V", value: "title v" },
    { name: "Veterans Affairs Plan", value: "veterans affairs plan" },
    {
      name: "Worker's Compensation Health Claim",
      value: "worker's compensation health claim",
    },
    { name: "Mutually Defined", value: "mutually defined" },
    { name: "Other Non-Federal Programs", value: "other non-federal programs" },
    {
      name: "Preferred Provider Organization - PPO",
      value: "preferred provider organization - ppo",
    },
    { name: "Point of Service - POS", value: "point of service - pos" },
    {
      name: "Exclusive Provider Organization - EPO",
      value: "exclusive provider organization - epo",
    },
    { name: "Indemnity Insurance", value: "indemnity insurance" },
    {
      name: "Health Maintenance Organization - HMO Medicare Risk",
      value: "health maintenance organization - hmo medicare risk",
    },
    { name: "Medicaid Managed Care", value: "medicaid managed care" },
  ];
};

export const getTypologyCodes = async (): Promise<
  CatalogOptionWithDescription[]
> => {
  return [
    { name: "1", value: "1", description: "MEDICARE" },
    { name: "11", value: "11", description: "Medicare (Managed Care)" },
    { name: "111", value: "111", description: "Medicare HMO" },
    {
      name: "1111",
      value: "1111",
      description: "Medicare Chronic Condition Special Needs Plan (C-SNP)",
    },
    {
      name: "1112",
      value: "1112",
      description: "Medicare Institutional Special Needs Plan (I-SNP)",
    },
    { name: "112", value: "112", description: "Medicare PPO" },
    { name: "113", value: "113", description: "Medicare POS" },
    { name: "119", value: "119", description: "Medicare Managed Care Other" },
    { name: "12", value: "12", description: "Medicare (Non-managed Care)" },
    { name: "121", value: "121", description: "Medicare FFS" },
    { name: "122", value: "122", description: "Medicare Drug Benefit" },
    {
      name: "123",
      value: "123",
      description: "Medicare Medical Savings Account (MSA)",
    },
    {
      name: "129",
      value: "129",
      description: "Medicare Non-managed Care Other",
    },
    { name: "13", value: "13", description: "Medicare Hospice" },
    {
      name: "14",
      value: "14",
      description: "Dual Eligibility Medicare/Medicaid Organization",
    },
    {
      name: "141",
      value: "141",
      description: "Dual Eligible Special Needs Plan (D-SNP)",
    },
    {
      name: "142",
      value: "142",
      description:
        "Fully Integrated Dual Eligible Special Needs Plan (FIDE-SNP)",
    },
    { name: "19", value: "19", description: "Medicare Other" },
    {
      name: "191",
      value: "191",
      description: "Medicare Pharmacy Benefit Manager",
    },

    { name: "2", value: "2", description: "MEDICAID" },
    { name: "21", value: "21", description: "Medicaid (Managed Care)" },
    { name: "211", value: "211", description: "Medicaid HMO" },
    {
      name: "2111",
      value: "2111",
      description: "Family Health Plus (NYS ADDITION)",
    },
    {
      name: "2112",
      value: "2112",
      description: "Healthy New York (NYS ADDITION)",
    },
    { name: "212", value: "212", description: "Medicaid PPO" },
    {
      name: "213",
      value: "213",
      description: "Medicaid PCCM (Primary Care Case Management)",
    },
    { name: "219", value: "219", description: "Medicaid Managed Care Other" },
    {
      name: "22",
      value: "22",
      description:
        "Medicaid (Non-managed Care Plan) (Fee-For-Service — NYS ADDITION)",
    },
    {
      name: "23",
      value: "23",
      description: "Medicaid/SCHIP (Child Health Plus — NYS ADDITION)",
    },
    { name: "24", value: "24", description: "Medicaid Applicant" },
    { name: "25", value: "25", description: "Medicaid - Out of State" },
    { name: "26", value: "26", description: "Medicaid - Long Term Care" },
    { name: "29", value: "29", description: "Medicaid Other" },
    {
      name: "291",
      value: "291",
      description: "Medicaid Pharmacy Benefit Manager",
    },
    { name: "299", value: "299", description: "Medicaid - Dental" },

    {
      name: "3",
      value: "3",
      description:
        "OTHER GOVERNMENT (Federal/State/Local) (excluding Department of Corrections)",
    },
    { name: "31", value: "31", description: "Department of Defense" },

    // TRICARE block
    { name: "311", value: "311", description: "TRICARE (CHAMPUS)" },
    { name: "3111", value: "3111", description: "TRICARE Prime -- HMO" },
    { name: "3112", value: "3112", description: "TRICARE Extra -- PPO" },
    {
      name: "3113",
      value: "3113",
      description: "TRICARE Standard - Fee For Service",
    },
    {
      name: "3114",
      value: "3114",
      description: "TRICARE For Life -- Medicare Supplement",
    },
    { name: "3115", value: "3115", description: "TRICARE Reserve Select" },
    {
      name: "3116",
      value: "3116",
      description: "Med Services Family Health Plan (USFHP) -- HMO",
    },
    {
      name: "3119",
      value: "3119",
      description: "Department of Defense - (other)",
    },

    { name: "312", value: "312", description: "Military Treatment Facility" },
    { name: "3121", value: "3121", description: "Enrolled Prime-HMO" },
    {
      name: "3122",
      value: "3122",
      description: "Non-enrolled Space Available",
    },
    { name: "3123", value: "3123", description: "TRICARE For Life (TFL)" },

    { name: "32", value: "32", description: "Department of Veterans Affairs" },
    {
      name: "321",
      value: "321",
      description: "Veteran care -- Care provided to Veterans",
    },
    {
      name: "3211",
      value: "3211",
      description: "Direct Care -- Care provided in VA facilities",
    },
    {
      name: "3212",
      value: "3212",
      description: "Indirect Care -- Care provided outside VA facilities",
    },
    { name: "32121", value: "32121", description: "Fee Basis" },
    {
      name: "32122",
      value: "32122",
      description: "Foreign Fee/Foreign Medical Program (FMP)",
    },

    // Inserción del último elemento
    { name: "322", value: "322", description: "Non-veteran care" },

    // CHAMPVA block
    {
      name: "3221",
      value: "3221",
      description: "Civilian Health and Medical Program for the VA (CHAMPVA)",
    },
    {
      name: "3222",
      value: "3222",
      description: "Spina Bifida Health Care Program (SB)",
    },
    {
      name: "3223",
      value: "3223",
      description: "Children of Women Vietnam Veterans (CWVV)",
    },
    { name: "3229", value: "3229", description: "Other non-veteran care" },

    { name: "33", value: "33", description: "Indian Health Service or Tribe" },
    {
      name: "331",
      value: "331",
      description: "Indian Health Service - Regular",
    },
    {
      name: "332",
      value: "332",
      description: "Indian Health Service - Contract",
    },
    {
      name: "333",
      value: "333",
      description: "Indian Health Service - Managed Care",
    },
    {
      name: "334",
      value: "334",
      description: "Indian Tribe - Sponsored Coverage",
    },
    { name: "34", value: "34", description: "HRSA Program" },
    { name: "341", value: "341", description: "Title V (MCH Block Grant)" },
    { name: "342", value: "342", description: "Migrant Health Program" },
    { name: "343", value: "343", description: "Ryan White Act" },
    {
      name: "344",
      value: "344",
      description: "Disaster-related (includes Covid-19)",
    },
    { name: "349", value: "349", description: "Other" },
    { name: "35", value: "35", description: "Black Lung" },
    { name: "36", value: "36", description: "State Government" },
    {
      name: "361",
      value: "361",
      description: "State SCHIP program (codes for individual states)",
    },
    {
      name: "362",
      value: "362",
      description: "Specific state programs (list/local code)",
    },
    {
      name: "369",
      value: "369",
      description: "State, not otherwise specified (other state)",
    },
    { name: "37", value: "37", description: "Local Government" },
    { name: "371", value: "371", description: "Local - Managed care" },
    { name: "3711", value: "3711", description: "HMO" },
    { name: "3712", value: "3712", description: "PPO" },
    { name: "3713", value: "3713", description: "POS" },
    { name: "372", value: "372", description: "FFS/Indemnity" },
    {
      name: "379",
      value: "379",
      description: "Local, not otherwise specified (other local, county)",
    },
    {
      name: "38",
      value: "38",
      description: "Other Government (Federal, State, Local not specified)",
    },
    {
      name: "381",
      value: "381",
      description: "Federal, State, Local not specified managed care",
    },
    {
      name: "3811",
      value: "3811",
      description: "Federal, State, Local not specified - HMO",
    },
    {
      name: "3812",
      value: "3812",
      description: "Federal, State, Local not specified - PPO",
    },
    {
      name: "3813",
      value: "3813",
      description: "Federal, State, Local not specified - POS",
    },
    {
      name: "3819",
      value: "3819",
      description:
        "Federal, State, Local not specified - not specified managed care",
    },
    {
      name: "382",
      value: "382",
      description: "Federal, State, Local not specified managed - FFS",
    },
    {
      name: "389",
      value: "389",
      description: "Federal, State, Local not specified managed - Other",
    },
    { name: "39", value: "39", description: "Other Federal" },
    {
      name: "391",
      value: "391",
      description: "Federal Employee Health Plan - Use when known",
    },
    { name: "4", value: "4", description: "DEPARTMENT OF CORRECTIONS" },
    { name: "41", value: "41", description: "Corrections Federal" },
    { name: "42", value: "42", description: "Corrections State" },
    { name: "43", value: "43", description: "Corrections Local" },
    { name: "44", value: "44", description: "Corrections Unknown Level" },
    { name: "5", value: "5", description: "PRIVATE HEALTH INSURANCE" },
    { name: "51", value: "51", description: "Managed Care (Private)" },
    { name: "511", value: "511", description: "Commercial Managed Care - HMO" },
    { name: "512", value: "512", description: "Commercial Managed Care - PPO" },
    { name: "513", value: "513", description: "Commercial Managed Care - POS" },
    {
      name: "514",
      value: "514",
      description: "Exclusive Provider Organization",
    },
    { name: "515", value: "515", description: "Gatekeeper PPO (GPPO)" },
    {
      name: "516",
      value: "516",
      description: "Commercial Managed Care - Pharmacy Benefit Manager",
    },
    {
      name: "517",
      value: "517",
      description: "Commercial Managed Care - Dental",
    },
    { name: "519", value: "519", description: "Managed Care, Other (non HMO)" },
    {
      name: "52",
      value: "52",
      description: "Private Health Insurance - Indemnity",
    },
    { name: "521", value: "521", description: "Commercial Indemnity" },
    {
      name: "522",
      value: "522",
      description:
        "Self-insured (ERISA) Administrative Services Only (ASO) plan",
    },
    {
      name: "523",
      value: "523",
      description: "Medicare supplemental policy (as second payer)",
    },
    { name: "524", value: "524", description: "Indemnity Insurance - Dental" },
    {
      name: "529",
      value: "529",
      description: "Private health insurance -- other commercial Indemnity",
    },
    {
      name: "53",
      value: "53",
      description:
        "Managed Care (private) or private health insurance (indemnity), not otherwise specified",
    },
    { name: "54", value: "54", description: "Organized Delivery System" },
    { name: "55", value: "55", description: "Small Employer Purchasing Group" },
    { name: "56", value: "56", description: "Specialized Stand Alone Plan" },
    { name: "561", value: "561", description: "Dental" },
    { name: "562", value: "562", description: "Vision" },
    { name: "59", value: "59", description: "Other Private Insurance" },
    { name: "6", value: "6", description: "BLUE CROSS/BLUE SHIELD" },
    { name: "61", value: "61", description: "BC Managed Care" },
    { name: "611", value: "611", description: "BC Managed Care - HMO" },
    { name: "612", value: "612", description: "BC Managed Care - PPO" },
    { name: "613", value: "613", description: "BC Managed Care - POS" },
    { name: "614", value: "614", description: "BC Managed Care - Dental" },
    { name: "619", value: "619", description: "BC Managed Care - Other" },
    { name: "62", value: "62", description: "BC Indemnity" },
    { name: "621", value: "621", description: "BC Indemnity" },
    {
      name: "622",
      value: "622",
      description:
        "BC Self-insured (ERISA) Administrative Services Only (ASO) Plan",
    },
    { name: "623", value: "623", description: "BC Medicare Supplemental Plan" },
    { name: "629", value: "629", description: "BC Indemnity - Dental" },
    {
      name: "63",
      value: "63",
      description: "BC (Indemnity or Managed Care) - Out of State",
    },
    {
      name: "64",
      value: "64",
      description: "BC (Indemnity or Managed Care) - Unspecified",
    },
    {
      name: "7",
      value: "7",
      description:
        "MANAGED CARE, UNSPECIFIED (to be used only if one can't distinguish public from private)",
    },
    { name: "71", value: "71", description: "HMO" },
    { name: "72", value: "72", description: "PPO" },
    { name: "73", value: "73", description: "POS" },
    {
      name: "79",
      value: "79",
      description: "Other Managed Care, Unknown if public or private",
    },
    {
      name: "8",
      value: "8",
      description:
        "NO PAYMENT FROM AN ORGANIZATION/AGENCY/PROGRAM/PRIVATE PAYER LISTED",
    },
    { name: "81", value: "81", description: "Self-pay" },
    { name: "82", value: "82", description: "No Charge" },
    { name: "821", value: "821", description: "Charity" },
    { name: "822", value: "822", description: "Professional Courtesy" },
    { name: "823", value: "823", description: "Research/Clinical Trial" },
    { name: "83", value: "83", description: "Refusal to Pay/Bad Debt" },
    { name: "84", value: "84", description: "Hill Burton Free Care" },
    { name: "85", value: "85", description: "Research/Donor" },
    { name: "89", value: "89", description: "No Payment, Other" },
    { name: "9", value: "9", description: "MISCELLANEOUS/OTHER" },
    { name: "91", value: "91", description: "Foreign National" },
    { name: "92", value: "92", description: "Other (Non-government)" },
    { name: "93", value: "93", description: "Disability Insurance" },
    { name: "94", value: "94", description: "Long-term Care Insurance" },
    { name: "95", value: "95", description: "Worker's Compensation" },
    { name: "951", value: "951", description: "Worker's Comp HMO" },
    { name: "953", value: "953", description: "Worker's Comp Fee-for-Service" },
    {
      name: "954",
      value: "954",
      description: "Worker's Comp Other Managed Care",
    },
    {
      name: "959",
      value: "959",
      description: "Worker's Comp, Other unspecified",
    },
    { name: "96", value: "96", description: "Auto Insurance (no fault)" },
    {
      name: "97",
      value: "97",
      description: "Legal Liability / Liability Insurance",
    },
    {
      name: "98",
      value: "98",
      description: "Other specified (includes Hospice - Unspecified plan)",
    },
    {
      name: "99",
      value: "99",
      description: "No Typology Code available for payment source",
    },
    {
      name: "9999",
      value: "9999",
      description: "Unavailable / No Payer Specified / Blank",
    },
    {
      name: "zzz",
      value: "zzz",
      description: "UNAVAILABLE/UNKNOWN",
    },
  ];
};

export const getEquivalentInsurance = async (): Promise<CatalogOption[]> => {
  return [
    {
      name: "HCFA",
      value: "hcfa",
    },
    {
      name: "Medicare",
      value: "medicare",
    },
    {
      name: "BCBS",
      value: "bcbs",
    },
    {
      name: "Unassigned",
      value: "unassigned",
    },
  ];
};

export const geBillingMethod = async (): Promise<CatalogOption[]> => {
  return [
    {
      name: "Print by Clearinghouse",
      value: "print by clearinghouse",
    },
    {
      name: "Electronic",
      value: "electronic",
    },
    {
      name: "Print to Paper",
      value: "print to paper",
    },
  ];
};

export const getFacilityBilling = async (): Promise<CatalogOption[]> => {
  return [
    {
      name: "UB-04 (institutional)",
      value: "ub-04 (institutional)",
    },
    {
      name: "CMS-1500 (Professional)",
      value: "cms-1500 (professional)",
    },
  ];
};

export const getCoverageType = async (): Promise<CatalogOption[]> => {
  return [
    {
      name: "Primary",
      value: "primary",
    },
    {
      name: "Secondary",
      value: "secondary",
    },
    {
      name: "Tertiary",
      value: "tertiary",
    },
    {
      name: "Other",
      value: "other",
    },
  ];
};

export const getPatientRelationships = async (): Promise<CatalogOption[]> => {
  return [
    { name: "Self", value: "self" },
    { name: "Spouse", value: "spouse" },
    { name: "Other", value: "other" },
  ];
};

export const getSatatusInsurancePlan = async (): Promise<CatalogOption[]> => {
  return [
    { name: "Active", value: "active" },
    { name: "Inactive", value: "inactive" },
  ];
};

export const getStaffType = async (): Promise<CatalogOption[]> => {
  return [
    { name: "Provider", value: "provider" },
    { name: "Member", value: "member" },
  ];
};

export const getStaffTypeMember = async (): Promise<CatalogOption[]> => {
  return [
    { name: "Administrative Personnel", value: "administrative personnel" },
    { name: "Anesthesiologist", value: "anesthesiologist" },
    { name: "Nurse", value: "nurse" },
    { name: "Medical Assistant", value: "medical assistant" },
    { name: "Physician Assistant", value: "physician assistant" },
    { name: "Technician", value: "technician" },
    { name: "Transcriptionist", value: "transcriptionist" },
    { name: "Radiologist", value: "radiologist" },
    { name: "Other", value: "other" },
  ];
};

export const getInterface = async (): Promise<CatalogOption[]> => {
  return [
    { name: "Example Path Lab", value: "path_lab" },
    { name: "GiegMedLab", value: "gieg_med_lab" },
    { name: "GiegMedPM", value: "gieg_med_pm" },
    { name: "Klara Document Ingestion", value: "klara_docs" },
    { name: "Quest", value: "quest" },
    { name: "Redox", value: "redox" },
    { name: "Electronic Clinical Lab Results", value: "lab_results" },
  ];
};

export const getServiceTypes = async (): Promise<CatalogOption[]> => {
  return [
    {
      name: "AMA",
      value: "ama",
    },
    {
      name: "General Letter",
      value: "general_letter",
    },
    {
      name: "Letter to Patient",
      value: "letter_to_patient",
    },
    {
      name: "Letter to Physician",
      value: "letter_to_physician",
    },
    {
      name: "Procedure Instruction Code",
      value: "procedure_instruction_code",
    },
    {
      name: "Procedure Instruction EGD",
      value: "procedure_instruction_egd",
    },
    {
      name: "Consultation",
      value: "consultation",
    },
    {
      name: "First Visit",
      value: "first_visit",
    },
    {
      name: "Follow Up",
      value: "follow_up",
    },
    {
      name: "Non-Visit Order",
      value: "non_visit_order",
    },
    {
      name: "Colonoscopy",
      value: "colonoscopy",
    },
    {
      name: "EGD",
      value: "egd",
    },
    {
      name: "EGD-Colonoscopy",
      value: "egd_colonoscopy",
    },
    {
      name: "EGD-Sigmoidoscopy",
      value: "egd_sigmoidoscopy",
    },
    {
      name: "Hemorrhoid Treatment",
      value: "hemorrhoid_treatment",
    },
    {
      name: "PEG Removal",
      value: "peg_removal",
    },
    {
      name: "Sigmoidoscopy",
      value: "sigmoidoscopy",
    },
  ];
};

export const getDuration = async (): Promise<CatalogOption[]> => {
  return [
    { name: "15 minutes", value: "15" },
    { name: "20 minutes", value: "20" },
    { name: "25 minutes", value: "25" },
    { name: "30 minutes", value: "30" },
    { name: "35 minutes", value: "35" },
    { name: "40 minutes", value: "40" },
    { name: "45 minutes", value: "45" },
    { name: "50 minutes", value: "50" },
    { name: "55 minutes", value: "55" },
    { name: "60 minutes", value: "60" },
    { name: "65 minutes", value: "65" },
    { name: "70 minutes", value: "70" },
    { name: "75 minutes", value: "75" },
    { name: "80 minutes", value: "80" },
    { name: "85 minutes", value: "85" },
    { name: "90 minutes", value: "90" },
    { name: "95 minutes", value: "95" },
    { name: "100 minutes", value: "100" },
    { name: "105 minutes", value: "105" },
    { name: "110 minutes", value: "110" },
    { name: "115 minutes", value: "115" },
    { name: "120 minutes", value: "120" },
    { name: "125 minutes", value: "125" },
    { name: "2.5 hours", value: "150" },
    { name: "3 hours", value: "180" },
    { name: "3.5 hours", value: "210" },
    { name: "4 hours", value: "240" },
    { name: "4.5 hours", value: "270" },
    { name: "5 hours", value: "300" },
    { name: "5.5 hours", value: "330" },
    { name: "6 hours", value: "360" },
    { name: "6.5 hours", value: "390" },
    { name: "7 hours", value: "420" },
    { name: "7.5 hours", value: "450" },
    { name: "8 hours", value: "480" },
    { name: "8.5 hours", value: "510" },
    { name: "9 hours", value: "540" },
  ];
};

export const getAppointmentStatus = async (): Promise<CatalogOption[]> => {
  return [
    { name: "Scheduled", value: "scheduled" },
    { name: "Confirmed", value: "confirmed" },
    { name: "In progress", value: "in progress" },
    { name: "Completed", value: "completed" },
    { name: "Rescheduled", value: "rescheduled" },
    { name: "No show", value: "no show" },
    { name: "Cancelled", value: "cancelled" },
  ];
};

export const getStatusOptions = async (): Promise<SelectOption[]> => {
  return [
    { value: "active", text: "Active" },
    { value: "pending", text: "Pending" },
    { value: "expired", text: "Expired" },
    { value: "suspended", text: "Suspended" },
    { value: "revoked", text: "Revoked" },
  ];
};

export const getLicenceTypeOptions = async (): Promise<SelectOption[]> => {
  return [
    { value: "MD", text: "Doctor of Medicine" },
    { value: "DO", text: "Doctor of Osteopathic Medicine" },
    { value: "PA-C", text: "Certified Physician Assistant" },
    { value: "NP", text: "Nurse Practitioner" },
    { value: "RN", text: "Registered Nurse" },
    { value: "LPN", text: "Licensed Practical Nurse" },
    { value: "LVN", text: "Licensed Vocational Nurse" },
    { value: "CNA", text: "Certified Nursing Assistant" },
    { value: "DDS", text: "Doctor of Dental Surgery" },
    { value: "DMD", text: "Doctor of Dental Medicine" },
    { value: "DPM", text: "Doctor of Podiatric Medicine" },
    { value: "DC", text: "Doctor of Chiropractic" },
    { value: "PharmD", text: "Doctor of Pharmacy" },
    { value: "RPh", text: "Registered Pharmacist" },
    { value: "CRNA", text: "Certified Registered Nurse Anesthetist" },
    { value: "CAA", text: "Certified Anesthesiologist Assistant" },
    { value: "CNM", text: "Certified Nurse Midwife" },
    { value: "PhD", text: "Doctor of Philosophy {Psychologist}" },
    { value: "PsyD", text: "Doctor of Psychology" },
    { value: "LCSW", text: "Licensed Clinical Social Worker" },
    { value: "LMFT", text: "Licensed Marriage and Family Therapist" },
    { value: "PT", text: "Physical Therapist" },
    { value: "OT", text: "Occupational Therapist" },
    { value: "SLP", text: "Speech-Language Pathologist" },
    { value: "RT(R)", text: "Radiologic Technologist" },
    { value: "RD", text: "Registered Dietitian" },
    { value: "CLS", text: "Clinical Laboratory Scientist" },
    { value: "MLS", text: "Medical Laboratory Scientist" },
    { value: "EMT", text: "Emergency Medical Technician" },
    { value: "Paramedic", text: "Paramedic" },
    { value: "RRT", text: "Registered Respiratory Therapist" },
    { value: "CRT", text: "Certified Respiratory Therapist" },
    { value: "CO", text: "Certified Orthotist" },
    { value: "CP", text: "Certified Prosthetist" },
    { value: "ATC", text: "Certified Athletic Trainer" },
    { value: "AuD", text: "Doctor of Audiology" },
    { value: "Genetic Counselor", text: "Certified Genetic Counselor" },
  ];
};

export const getCountries = async (): Promise<NameOnlyOption[]> => {
  return [
    { name: "Afghanistan" },
    { name: "Albania" },
    { name: "Algeria" },
    { name: "Andorra" },
    { name: "Angola" },
    { name: "Antigua and Barbuda" },
    { name: "Argentina" },
    { name: "Armenia" },
    { name: "Australia" },
    { name: "Austria" },
    { name: "Azerbaijan" },
    { name: "Bahamas" },
    { name: "Bahrain" },
    { name: "Bangladesh" },
    { name: "Barbados" },
    { name: "Belarus" },
    { name: "Belgium" },
    { name: "Belize" },
    { name: "Benin" },
    { name: "Bhutan" },
    { name: "Bolivia" },
    { name: "Bosnia and Herzegovina" },
    { name: "Botswana" },
    { name: "Brazil" },
    { name: "Brunei" },
    { name: "Bulgaria" },
    { name: "Burkina Faso" },
    { name: "Burundi" },
    { name: "Cabo Verde" },
    { name: "Cambodia" },
    { name: "Cameroon" },
    { name: "Canada" },
    { name: "Central African Republic" },
    { name: "Chad" },
    { name: "Chile" },
    { name: "China" },
    { name: "Colombia" },
    { name: "Comoros" },
    { name: "Congo (Congo-Brazzaville)" },
    { name: "Costa Rica" },
    { name: "Croatia" },
    { name: "Cuba" },
    { name: "Cyprus" },
    { name: "Czechia (Czech Republic)" },
    { name: "Democratic Republic of the Congo" },
    { name: "Denmark" },
    { name: "Djibouti" },
    { name: "Dominica" },
    { name: "Dominican Republic" },
    { name: "Ecuador" },
    { name: "Egypt" },
    { name: "El Salvador" },
    { name: "Equatorial Guinea" },
    { name: "Eritrea" },
    { name: "Estonia" },
    { name: "Eswatini" },
    { name: "Ethiopia" },
    { name: "Fiji" },
    { name: "Finland" },
    { name: "France" },
    { name: "Gabon" },
    { name: "Gambia" },
    { name: "Georgia" },
    { name: "Germany" },
    { name: "Ghana" },
    { name: "Greece" },
    { name: "Grenada" },
    { name: "Guatemala" },
    { name: "Guinea" },
    { name: "Guinea-Bissau" },
    { name: "Guyana" },
    { name: "Haiti" },
    { name: "Holy See" },
    { name: "Honduras" },
    { name: "Hungary" },
    { name: "Iceland" },
    { name: "India" },
    { name: "Indonesia" },
    { name: "Iran" },
    { name: "Iraq" },
    { name: "Ireland" },
    { name: "Israel" },
    { name: "Italy" },
    { name: "Ivory Coast" },
    { name: "Jamaica" },
    { name: "Japan" },
    { name: "Jordan" },
    { name: "Kazakhstan" },
    { name: "Kenya" },
    { name: "Kiribati" },
    { name: "Kuwait" },
    { name: "Kyrgyzstan" },
    { name: "Laos" },
    { name: "Latvia" },
    { name: "Lebanon" },
    { name: "Lesotho" },
    { name: "Liberia" },
    { name: "Libya" },
    { name: "Liechtenstein" },
    { name: "Lithuania" },
    { name: "Luxembourg" },
    { name: "Madagascar" },
    { name: "Malawi" },
    { name: "Malaysia" },
    { name: "Maldives" },
    { name: "Mali" },
    { name: "Malta" },
    { name: "Marshall Islands" },
    { name: "Mauritania" },
    { name: "Mauritius" },
    { name: "Mexico" },
    { name: "Micronesia" },
    { name: "Moldova" },
    { name: "Monaco" },
    { name: "Mongolia" },
    { name: "Montenegro" },
    { name: "Morocco" },
    { name: "Mozambique" },
    { name: "Myanmar (formerly Burma)" },
    { name: "Namibia" },
    { name: "Nauru" },
    { name: "Nepal" },
    { name: "Netherlands" },
    { name: "New Zealand" },
    { name: "Nicaragua" },
    { name: "Niger" },
    { name: "Nigeria" },
    { name: "North Korea" },
    { name: "North Macedonia" },
    { name: "Norway" },
    { name: "Oman" },
    { name: "Pakistan" },
    { name: "Palau" },
    { name: "Palestine State" },
    { name: "Panama" },
    { name: "Papua New Guinea" },
    { name: "Paraguay" },
    { name: "Peru" },
    { name: "Philippines" },
    { name: "Poland" },
    { name: "Portugal" },
    { name: "Qatar" },
    { name: "Romania" },
    { name: "Russia" },
    { name: "Rwanda" },
    { name: "Saint Kitts and Nevis" },
    { name: "Saint Lucia" },
    { name: "Saint Vincent and the Grenadines" },
    { name: "Samoa" },
    { name: "San Marino" },
    { name: "Sao Tome and Principe" },
    { name: "Saudi Arabia" },
    { name: "Senegal" },
    { name: "Serbia" },
    { name: "Seychelles" },
    { name: "Sierra Leone" },
    { name: "Singapore" },
    { name: "Slovakia" },
    { name: "Slovenia" },
    { name: "Solomon Islands" },
    { name: "Somalia" },
    { name: "South Africa" },
    { name: "South Korea" },
    { name: "South Sudan" },
    { name: "Spain" },
    { name: "Sri Lanka" },
    { name: "Sudan" },
    { name: "Suriname" },
    { name: "Sweden" },
    { name: "Switzerland" },
    { name: "Syria" },
    { name: "Tajikistan" },
    { name: "Tanzania" },
    { name: "Thailand" },
    { name: "Timor-Leste" },
    { name: "Togo" },
    { name: "Tonga" },
    { name: "Trinidad and Tobago" },
    { name: "Tunisia" },
    { name: "Turkey" },
    { name: "Turkmenistan" },
    { name: "Tuvalu" },
    { name: "Uganda" },
    { name: "Ukraine" },
    { name: "United Arab Emirates" },
    { name: "United Kingdom" },
    { name: "United States of America" },
    { name: "Uruguay" },
    { name: "Uzbekistan" },
    { name: "Vanuatu" },
    { name: "Venezuela" },
    { name: "Vietnam" },
    { name: "Yemen" },
    { name: "Zambia" },
    { name: "Zimbabwe" },
  ];
};

export const getPaymentMethodInsurance = (): CatalogOption[] => {
  return [
    { value: "insurance", name: "Insurance" },
    { value: "self pay", name: "Self pay" },
  ];
};

export const getClearingHouses = (): CatalogOption[] => {
  return [{ name: "Stedi", value: "stedi" }];
};

export const getInsurancePrograms = (): CatalogOption[] => {
  return [
    { value: "self-pay", name: "Self-pay" },
    { value: "central certification", name: "Central Certification" },
    { value: "other non-federal programs", name: "Other Non-Federal Programs" },
    {
      value: "preferred provider organization (ppo)",
      name: "Preferred Provider Organization (PPO)",
    },
    { value: "point of service (pos)", name: "Point of Service (POS)" },
    {
      value: "exclusive provider organization (epo)",
      name: "Exclusive Provider Organization (EPO)",
    },
    { value: "indemnity insurance", name: "Indemnity Insurance" },
    {
      value: "health maintenance organization (hmo) medicare risk",
      name: "Health Maintenance Organization (HMO) Medicare Risk",
    },
    { value: "automobile medical", name: "Automobile Medical" },
    { value: "blue cross/blue shield", name: "Blue Cross/Blue Shield" },
    { value: "champus", name: "Champus" },
    { value: "commercial insurance co.", name: "Commercial Insurance Co." },
    { value: "disability", name: "Disability" },
    {
      value: "federal employee program (fep)",
      name: "Federal Employee Program (FEP)",
    },
    {
      value: "health maintenance organization",
      name: "Health Maintenance Organization",
    },
    { value: "liability", name: "Liability" },
    { value: "liability medical", name: "Liability Medical" },
    { value: "medicare part a", name: "Medicare Part A" },
    { value: "medicare part b", name: "Medicare Part B" },
    { value: "medicaid", name: "Medicaid" },
    { value: "title v", name: "Title V" },
    {
      value: "veteran administration plan",
      name: "Veteran Administration Plan",
    },
    {
      value: "workers compensation health claim",
      name: "Workers Compensation Health Claim",
    },
    { value: "mutually defined / unknown", name: "Mutually Defined / Unknown" },
  ];
};

export const getPatientConditonsInsurance = (): CatalogOption[] => {
  return [
    { value: "none", name: "None" },
    { value: "auto accident", name: "Auto Accident" },
    { value: "employment", name: "Employment" },
    { value: "other accident", name: "Other Accident" },
  ];
};

export const getServicesProvidedInsurance = (): CatalogOption[] => {
  return [
    { name: "Pregnancy", value: "pregnancy" },
    { name: "EPSDT", value: "epsdt" },
    { name: "Family Planning", value: "family planning" },
    { name: "Homebound", value: "homebound" },
    { name: "An emergency", value: "an emergency" },
  ];
};

export const getEventsRelatedCondition = (): CatalogOption[] => {
  return [
    { value: "initial treatment date", name: "Initial Treatment Date" },
    {
      value: "onset of current symptoms or illness (date of injury)",
      name: "Onset of Current Symptoms or Illness (Date of Injury)",
    },
    {
      value: "date of same or similar illness",
      name: "Date of Same or Similar Illness",
    },
    {
      value: "unabled to work in current occupation",
      name: "Unabled to Work in Current Occupation",
    },
    {
      value: "disability related to condition",
      name: "Disability Related to Condition",
    },
    {
      value: "hospitalization related to condition",
      name: "Hospitalization Related to Condition",
    },
    { value: "last menstrual period", name: "Last Menstrual Period" },
    { value: "date last seen", name: "Date Last Seen" },
    { value: "referal date", name: "Referal Date" },
    { value: "acute manifestation date", name: "Acute Manifestation Date" },
    { value: "last x-ray date", name: "Last X-ray Date" },
    { value: "accident date", name: "Accident Date" },
    { value: "transfer of care", name: "Transfer of Care" },
    { value: "prescription", name: "Prescription" },
    {
      value: "report start (assumed care date)",
      name: "Report Start (Assumed Care Date)",
    },
    {
      value: "report end (relinquished care date)",
      name: "Report End (Relinquished Care Date)",
    },
    {
      value: "first visit or consultation",
      name: "First Visit or Consultation",
    },
  ];
};

export const getEpsdt = (): CatalogOption[] => {
  return [
    { name: "Not used", value: "not used" },
    { name: "Available - not used", value: "available - not used" },
    { name: "Under treatment", value: "under treatment" },
    { name: "New Services Resquested", value: "new services resquested" },
  ];
};

export const getStates = (): CatalogState[] => {
  return [
    {
      stateId: 100,
      abbreviation: "AL",
      name: "Alabama",
    },
    {
      stateId: 101,
      abbreviation: "AK",
      name: "Alaska",
    },
    {
      stateId: 102,
      abbreviation: "AZ",
      name: "Arizona",
    },
    {
      stateId: 103,
      abbreviation: "AR",
      name: "Arkansas",
    },
    {
      stateId: 104,
      abbreviation: "CA",
      name: "California",
    },
    {
      stateId: 105,
      abbreviation: "CZ",
      name: "Canal Zone",
    },
    {
      stateId: 106,
      abbreviation: "CO",
      name: "Colorado",
    },
    {
      stateId: 107,
      abbreviation: "CT",
      name: "Connecticut",
    },
    {
      stateId: 108,
      abbreviation: "DE",
      name: "Delaware",
    },
    {
      stateId: 109,
      abbreviation: "DC",
      name: "District of Columbia",
    },
    {
      stateId: 110,
      abbreviation: "FL",
      name: "Florida",
    },
    {
      stateId: 111,
      abbreviation: "GA",
      name: "Georgia",
    },
    {
      stateId: 112,
      abbreviation: "ID",
      name: "Idaho",
    },
    {
      stateId: 113,
      abbreviation: "IL",
      name: "Illinois",
    },
    {
      stateId: 114,
      abbreviation: "IN",
      name: "Indiana",
    },
    {
      stateId: 115,
      abbreviation: "IA",
      name: "Iowa",
    },
    {
      stateId: 116,
      abbreviation: "KS",
      name: "Kansas",
    },
    {
      stateId: 117,
      abbreviation: "KY",
      name: "Kentucky",
    },
    {
      stateId: 118,
      abbreviation: "LA",
      name: "Louisiana",
    },
    {
      stateId: 119,
      abbreviation: "ME",
      name: "Maine",
    },
    {
      stateId: 120,
      abbreviation: "MD",
      name: "Maryland",
    },
    {
      stateId: 121,
      abbreviation: "MA",
      name: "Massachusetts",
    },
    {
      stateId: 122,
      abbreviation: "MI",
      name: "Michigan",
    },
    {
      stateId: 123,
      abbreviation: "MN",
      name: "Minnesota",
    },
    {
      stateId: 124,
      abbreviation: "MS",
      name: "Mississippi",
    },
    {
      stateId: 125,
      abbreviation: "MO",
      name: "Missouri",
    },
    {
      stateId: 126,
      abbreviation: "MT",
      name: "Montana",
    },
    {
      stateId: 127,
      abbreviation: "NE",
      name: "Nebraska",
    },
    {
      stateId: 128,
      abbreviation: "NV",
      name: "Nevada",
    },
    {
      stateId: 129,
      abbreviation: "NH",
      name: "New Hampshire",
    },
    {
      stateId: 130,
      abbreviation: "NJ",
      name: "New Jersey",
    },
    {
      stateId: 131,
      abbreviation: "NM",
      name: "New Mexico",
    },
    {
      stateId: 132,
      abbreviation: "NY",
      name: "New York",
    },
    {
      stateId: 133,
      abbreviation: "NC",
      name: "North Carolina",
    },
    {
      stateId: 134,
      abbreviation: "ND",
      name: "North Dakota",
    },
    {
      stateId: 135,
      abbreviation: "OH",
      name: "Ohio",
    },
    {
      stateId: 136,
      abbreviation: "OK",
      name: "Oklahoma",
    },
    {
      stateId: 137,
      abbreviation: "OR",
      name: "Oregon",
    },
    {
      stateId: 138,
      abbreviation: "PA",
      name: "Pennsylvania",
    },
    {
      stateId: 139,
      abbreviation: "PR",
      name: "Puerto Rico",
    },
    {
      stateId: 140,
      abbreviation: "RI",
      name: "Rhode Island",
    },
    {
      stateId: 141,
      abbreviation: "SC",
      name: "South Carolina",
    },
    {
      stateId: 142,
      abbreviation: "SD",
      name: "South Dakota",
    },
    {
      stateId: 143,
      abbreviation: "TN",
      name: "Tennessee",
    },
    {
      stateId: 144,
      abbreviation: "TX",
      name: "Texas",
    },
    {
      stateId: 145,
      abbreviation: "UT",
      name: "Utah",
    },
    {
      stateId: 146,
      abbreviation: "VT",
      name: "Vermont",
    },
    {
      stateId: 147,
      abbreviation: "VA",
      name: "Virginia",
    },
    {
      stateId: 148,
      abbreviation: "VI",
      name: "Virgin Islands",
    },
    {
      stateId: 149,
      abbreviation: "WA",
      name: "Washington",
    },
    {
      stateId: 150,
      abbreviation: "WV",
      name: "West Virginia",
    },
    {
      stateId: 151,
      abbreviation: "WI",
      name: "Wisconsin",
    },
    {
      stateId: 152,
      abbreviation: "WY",
      name: "Wyoming",
    },
    {
      stateId: 153,
      abbreviation: "PI",
      name: "Pacific Islands",
    },
    {
      stateId: 154,
      abbreviation: "HI",
      name: "Hawaii",
    },
    {
      stateId: 155,
      abbreviation: "AA",
      name: "The Americas",
    },
    {
      stateId: 156,
      abbreviation: "AE",
      name: "Europe,Mid East,Af,Can",
    },
    {
      stateId: 157,
      abbreviation: "AP",
      name: "Pacific",
    },
    {
      stateId: 158,
      abbreviation: "AS",
      name: "American Samoa",
    },
    {
      stateId: 159,
      abbreviation: "FM",
      name: "Fed State of Micronesia",
    },
    {
      stateId: 160,
      abbreviation: "GU",
      name: "Guam",
    },
    {
      stateId: 161,
      abbreviation: "MH",
      name: "Marshall Islands",
    },
  ];
};
