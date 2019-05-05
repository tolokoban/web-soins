export interface IAction {
    type: string;
    [key: string]: any;
}

export interface IUser {
    email: string;
    nickname: string;
    roles: string[];
}

export interface IOrganization {
    id: string;
    name: string;
}

export interface ICarecenter {
    id: string;
    organization: string;
    name: string;
    code: string;
}

export interface IState {
    user: IUser;
    organizations: IOrganization[];
    carecenters: ICarecenter[];
}
