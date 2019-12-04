import WebService from "../tfw/web-service"
import { IFilter } from "../types"


export default { getConsultationIds }

interface IConsultationIdsQuery {
    filter: IFilter,
    minDate: number,
    maxDate: number
}

async function getConsultationIds(args: IConsultationIdsQuery) {
    const ids = await WebService.exec("query.consultation", args)
    return ids
}
