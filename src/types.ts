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
    patientsCount: number;
    consultationsCount: number;
    name: string;
    code: string;
}

export interface IState {
    user: IUser;
    organizations: IOrganization[];
    carecenters: ICarecenter[];
}

export type IDispatchFunction = (action: IAction)=>void;
