import WebService from "tololib/web-service"
import { IStatsConfig, IOccurences, IOccurence } from "../types"

interface IOccurencesDictionary {
    [key: string]: { [key: string]: number }
}

interface ExtractServiceResult {
    patients: {
        [key: string]: {
            [key: string]: string
        }
    }
    data: {
        [key: string]: {
            [key: string]: string
        }
    }
}

function isExtractServiceResult(arg: any): arg is ExtractServiceResult {
    if (!arg || typeof arg !== "object") return false

    const { patients, data } = arg
    for (const item of Object.values(patients)) {
        if (!item || typeof item !== "object") return false

        for (const value of Object.values(item as object)) {
            if (typeof value !== "string") return false
        }
    }
    for (const item of Object.values(data)) {
        if (!item || typeof item !== "object") return false

        for (const value of Object.values(item as object)) {
            if (typeof value !== "string") return false
        }
    }
    return true
}

export default {
    async extract(statsConfig: IStatsConfig): Promise<{}> {
        const extraction = await WebService.exec("extract", {
            carecenter: statsConfig.carecenter.id,
            begin: convertTime(statsConfig.dateMin),
            end: convertTime(statsConfig.dateMax)
        })
        if (!isExtractServiceResult(extraction)) {
            console.error("Bad format from service 'extract'!", extraction)
            throw Error("Bad format from service 'extract'!")
        }
        const result = {}
        Object.values(extraction.data).forEach(consultation => {
            Object.keys(consultation)
                .filter(key => key.charAt(0) === "#")
                .forEach(key => {
                    const val = consultation[key]
                    if (typeof result[key] === "undefined") {
                        result[key] = {}
                    }
                    const item = result[key]
                    const occurences = item[val]
                    if (typeof occurences === "undefined") {
                        item[val] = 1
                    } else {
                        item[val]++
                    }
                })
        })
        return convertIntoOccurences(result)
    }
}

/**
 * Convert a number of milliseconds into a number of seconds.
 */
function convertTime(milliseconds: number): number {
    return Math.floor(0.5 + milliseconds * 0.001)
}

function convertIntoOccurences(
    input: IOccurencesDictionary
): { [key: string]: IOccurences } {
    const result: { [key: string]: IOccurences } = {}
    Object.keys(input).forEach(fieldName => {
        const occurences = { sum: 0, occ: [] }
        result[fieldName] = occurences
        const fieldValues = input[fieldName]
        Object.keys(fieldValues).forEach(value => {
            const occ = fieldValues[value]
            occurences.sum += occ
            occurences.occ.push([value, occ])
        })
        occurences.occ.sort(sortDescBySecondElement)
    })
    return result
}

function sortDescBySecondElement(a: IOccurence, b: IOccurence): number {
    const A = a[1],
        B = b[1]
    return B - A
}
