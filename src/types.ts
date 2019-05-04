export interface IAction {
    type: string;
    [key: string]: any;
}

export interface IUserState {
    email: string;
    nickname: string;
    roles: string[];
}

export interface IOrganization {
    id: string;
    name: string;
}

export type IOrganizationState = IOrganization[];

export interface ICareCenter {
    id: string;
    organization: string;
    name: string;
    code: string;
}

export type  ICareCenterState = ICareCenter[];

export interface IState {
    user: IUserState;
    organizations: IOrganizationState;
    carecenters: ICareCenterState;
}
