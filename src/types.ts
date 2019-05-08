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

export interface IPatientField {
    id: string;
    type: string;
    caption: { [key: string]: string }
}

export interface IStructure {
    id: number;
    organizationId: number;
    name: string;
    patientFields: IPatientField[];
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

export interface IState {
    user: IUser;
    stats: IStatsConfig[];
    organizations: IOrganization[];
    carecenters: ICarecenter[];
    structures: IStructure[];
    statsConfig: IStatsConfig;
}

export type IOccurence = [string, number];

export interface IOccurences {
    sum: number;
    occ: IOccurence[]
}

export type IDispatchFunction = (action: IAction) => void;
