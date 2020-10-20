export interface IAction {
    type: string;
    [key: string]: any;
}

export interface IUser {
    language?: string;
    email: string;
    nickname: string;
    roles: string[];
}

export interface IOrganization {
    id: number;
    name: string;
}

export interface ICarecenter {
    id: number;
    organizationId: number;
    structureId: number;
    patientsCount: number;
    consultationsCount: number;
    name: string;
    code: string;
}

export type IOccurence = [string, number];

export interface IOccurences {
    sum: number;
    occ: IOccurence[]
}

export interface IPatientField {
    id: string;
    type: string;
    caption: { [key: string]: string }
}

export interface IFormField {
    id: string,
    type?: string,
    caption: string,
    tags: string[],
    children: {
        [key: string]: IFormField
    }
}

export interface IType {
    id: string,
    caption?: string,
    children: ITypes
}

export interface ITypes {
    [key: string]: IType
}

export interface IStructure {
    id: number;
    organizationId: number;
    name: string;
    patientFields: IPatientField[];
    formFields: {
        [key: string]: { caption: string; type: string }
    };
    forms: {
        [key: string]: IFormField
    },
    types: ITypes,
    sources: {
        exams: string;
        vaccins: string;
        patient: string;
        forms: string;
        types: string;
    }
}

export interface IStatsConfig {
    carecenter: ICarecenter;
    statsType: "patients" | "consultations";
    dateMin: number;
    dateMax: number;
    patientsFields: { [key: string]: boolean };
    patientsFieldsCaptions: { [key: string]: string };
}

export interface IStateCurrent {
    carecenter?: ICarecenter
    organization?: IOrganization
}

export interface IState {
    current: IStateCurrent
    user: IUser
    stats: IStatsConfig[]
    organizations: IOrganization[]
    page: string
    carecenters: ICarecenter[]
    structures: IStructure[]
    statsConfig: IStatsConfig
}

export type IDispatchFunction = (action: IAction) => void;

export interface IPatient {
    id: number
    key: string
    firstName: string
    secondName: string
    lastName: string
    country: string
    sex: "M" | "F" | "?"
    // Taille en cm.
    size: number
}


export type IFilter = IFilterGroup | IFilterTest | IFilterNot | IFilterRange | IFilterAge

export type IFilterGroup = [
    "XOR" | "OR" | "AND",
  ...IFilter[]
]

export type IFilterTest = [
    "EQUAL" | "DIFF",
    string,      // Key
    ...string[]  // Values
]

export type IFilterNot = [
    "NOT", IFilter
]

export type IFilterRange = [
    "RANGE",
    // Key
    string,
    // Min
    number,
    // Max
    number
]

export type IFilterAge = [
    "AGE",
    // Min
    number,
    // Max
    number
]

type IFields = { [key: string]: string }

export interface IConsultation {
    id: number
    date: Date
    fields: IFields
}
