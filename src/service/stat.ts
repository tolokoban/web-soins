import WebService from "tololib/web-service"
import { IStatsConfig, IOccurences, IOccurence } from "../types"

interface IServiceExtract {
    patients: {};
    data: {};
}

interface IOccurencesDictionary {
    [key: string]: { [key: string]: number }
}

export default {
    async extract(statsConfig: IStatsConfig): Promise<{}> {
        const extraction = await WebService.exec("extract", {
            carecenter: statsConfig.carecenter.id,
            begin: convertTime(statsConfig.dateMin),
            end: convertTime(statsConfig.dateMax)
        });
        const result = {};
        Object.values(extraction.data).forEach(consultation => {
            Object.keys(consultation)
                .filter(key => key.charAt(0) === '#')
                .forEach(key => {
                    const val = consultation[key];
                    if (typeof result[key] === 'undefined') {
                        result[key] = {};
                    }
                    const item = result[key];
                    const occurences = item[val];
                    if (typeof occurences === 'undefined') {
                        item[val] = 1;
                    } else {
                        item[val]++;
                    }
                })
        })
        return convertIntoOccurences(result);
    }
}

/**
 * Convert a number of milliseconds into a number of seconds.
 */
function convertTime(milliseconds: number): number {
    return Math.floor(.5 + milliseconds * 0.001);
}


function convertIntoOccurences(input: IOccurencesDictionary): { [key: string]: IOccurences } {
    const result: { [key: string]: IOccurences } = {};
    Object.keys(input).forEach(fieldName => {
        const occurences = { sum: 0, occ: [] };
        result[fieldName] = occurences;
        const fieldValues = input[fieldName];
        Object.keys(fieldValues).forEach(value => {
            const occ = fieldValues[value];
            occurences.sum += occ;
            occurences.occ.push([value, occ]);
        })
        occurences.occ.sort(sortDescBySecondElement);
    })
    return result;
}


function sortDescBySecondElement(a: IOccurence, b: IOccurence): number {
    const
        A = a[1],
        B = b[1];
    return B - A;
}
