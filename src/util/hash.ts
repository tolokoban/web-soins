import { IStatsConfig } from "../types"

export default {
    statsConfig(obj: IStatsConfig): string {
        return `${obj.statsType}/${obj.dateMin}-${obj.dateMax}`;
    }
}
