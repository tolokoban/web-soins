import { IAction } from "../types"

const PREFIX = "user:";
const ATTRIBUTES = new Set(['nickname', 'language']);

export default {
    INITIAL_STATE: { email: "", nickname: "", language: "", roles: [] },

    reducer(state: IUser, action: IAction): IUser {
        const { type } = action;
        if (!type.startsWith(PREFIX)) return state;

        const attName = action.type.substr(PREFIX.length);
        if (!ATTRIBUTES.has(attName)) {
            throw Error(`Unknown attribute "${attName}"!`);
        }
        const attValue = action.data;
        return Object.assign(state, { [attName]: attValue });
    },

    setLanguage(language: string): IAction {
        return { type: "user:language", data: language };
    },

    setNickname(nickname: string): IAction {
        return { type: "user:nickname", data: nickname };
    }
}
