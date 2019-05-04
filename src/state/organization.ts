import { IAction, IOrganization, IOrganizationState } from "../types"

const PREFIX = "organization:";

export default {
    INITIAL_STATE: [],

    reducer(state: IOrganizationState, action: IAction): IOrganizationState {
        const { type } = action;
        if (!type.startsWith(PREFIX)) return state;

        const command = action.type.substr(PREFIX.length);
        switch (command) {
            case "add": return add(state, action.organization);
            case "update": return update(state, action.organization);
            default: throw Error(`Unknown action "${type}"!`);
        }
    },

    addOrganization(organization: string): IAction {
        return { type: "organization:add", organization };
    },

    updateOrganization(organization: string): IAction {
        return { type: "organization:update", organization };
    }
}


function add(state: IOrganizationState, organization: IOrganization): IOrganizationState {
    const newState = state.slice();
    newState.push(organization);
    return newState;
}


function update(state: IOrganizationState, organization: IOrganization): IOrganizationState {
    return state.map(item => item.id === organization.id ? organization : item);
}
