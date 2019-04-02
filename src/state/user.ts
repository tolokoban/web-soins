export interface IUserState {
    email: string;
    nickname: string;
    roles: string[];
}

interface IUserAction {
    type: string;
    data: any;
}

export const INITIAL_STATE = { email: "", nickname: "", language: "", roles: [] };

const PREFIX = "user:";
const ATTRIBUTES = new Set(['nickname', 'language']);

export function reducer(state: IUserState, action: IUserAction) {
    const { type } = action;
    if (!type.startsWith(PREFIX)) return state;

    const attName = action.type.substr(PREFIX.length);
    if (!ATTRIBUTES.has(attName)) {
        throw Error(`Unknown attribute "${attName}"!`);
    }
    const attValue = action.data;
    return Object.assign(state, { [attName]: attValue });
}

export function setLanguage(language: string): IUserAction {
    return { type: "user:language", data: language };
}

export function setNickname(nickname: string): IUserAction {
    return { type: "user:nickname", data: nickname };
}

export class Actions {
    constructor(private dispatch: (action: {}) => void) { }

    setLanguage(language: string) { this.dispatch(setLanguage(language)); };
    setNickname(nickname: string) { this.dispatch(setNickname(nickname)); };
};
