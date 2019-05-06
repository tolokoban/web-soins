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

export interface IStructure {
    id: number;
    organizationId: number;
    name: string;
    exams: string;
    vaccins: string;
    patient: string;
    forms: string;
    types: string;
}

export interface IState {
    user: IUser;
    organizations: IOrganization[];
    carecenters: ICarecenter[];
    structures: IStructure[];
}

export type IDispatchFunction = (action: IAction) => void;
