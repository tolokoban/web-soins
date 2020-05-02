import WebService from "../tfw/web-service"
import { IFilter } from "../types"


export default { getConsultationIds, getConsultationsFields }

interface IConsultationIdsInput {
    filter: IFilter,
    minDate: number,
    maxDate: number
}

async function getConsultationIds(args: IConsultationIdsInput) {
    const ids = await WebService.exec("query.consultation", args)
    return ids
}

interface IConsultationsFieldsOutput {
    fields: string[],
    patients: {
        [key: string /* Patient's key */]: Array<[number, ...string[]]>
    }
}

async function getConsultationsFields(
    consultationIds: number[]
): Promise<IConsultationsFieldsOutput> {
    const output = await WebService.exec("consultation.list", consultationIds)
    return output
}
