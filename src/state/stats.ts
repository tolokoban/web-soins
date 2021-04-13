import { IAction, IStatsConfig } from "../types"
import castString from "tololib/converter/string"
import castBoolean from "tololib/converter/boolean"

const PREFIX = "stats:";

export default {
    INITIAL_STATE: [],

    reducer(state: IStatsConfig[], action: IAction): IStatsConfig[] {
        const { type } = action;
        if (!type.startsWith(PREFIX)) return state;

        switch (action.type.substr(PREFIX.length)) {
            case "addStat": return addStat(state, action);
            default: throw Error(`Unknown action "${type}"!`);
        }
    },

    addStat(stat: IStatsConfig): IAction {
        return { type: "stats:addStat", stat };
    }
}

function addStat(state: IStatsConfig[], action: IAction): IStatsConfig[] {
    const stats = state.stats.slice();
    stats.push( action.stat );
    return stats;
}
