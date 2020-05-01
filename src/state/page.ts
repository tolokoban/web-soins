import { IAction } from "../types"

const PREFIX = "page:"

export default {
    INITIAL_STATE: [],

    reducer(state: string, action: IAction): string {
        const { type } = action
        if (!type.startsWith(PREFIX)) return state

        switch (action.type.substr(PREFIX.length)) {
            case "page": return action.page
            default: throw Error(`Unknown action "${type}"!`)
        }
    },

    page(page: string): IAction {
        return { type: "page:page", page };
    }
}
