export interface IUserState {
    email: string;
    nickname: string;
    roles: string[];
}

interface IUserAction {
    type: string;
    data: any;
}

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

export class Actions {
    constructor(private dispatch: (action: {}) => void) { }

    setLanguage(language: string) {
        this.dispatch({ type: "user:language", data: language });
    };
};
