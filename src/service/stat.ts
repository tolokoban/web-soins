import WebService from "../tfw/web-service"
import { IStatsConfig } from "../types"

interface IServiceExtract {
    patients: {};
    data: {};
}

export default {
    async extract( statsConfig: IStatsConfig) : Promise<{}> {
        const extraction = await WebService.exec("extract", {
            carecenter: statsConfig.carecenter.id,
            begin: convertTime(statsConfig.dateMin),
            end: convertTime(statsConfig.dateMax)
        });
        const result = {};
        Object.values(extraction.data).forEach( consultation => {
            Object.keys(consultation)
            .filter( key => key.charAt(0) === '#')
            .forEach( key => {
                const val = consultation[key];
                if( typeof result[key]=== 'undefined') {
                    result[key]={};
                }
                const item = result[key];
                const occurences = item[val];
                if( typeof occurences === 'undefined') {
                    item[val] = 1;
                } else {
                    item[val]++;
                }
            })

        })
        return result;
    }
}

/**
 * Convert a number of milliseconds into a number of seconds.
 */
function convertTime(milliseconds: number)  :number{
    return Math.floor( .5 + milliseconds * 0.001 );
}
