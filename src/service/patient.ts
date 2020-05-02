import Tfw from 'tfw'
import WebService from "../tfw/web-service"
import { IPatient } from "../types"

const castString = Tfw.Converter.String
const castInteger = Tfw.Converter.Integer

interface IServiceResult {
    name: string
    list: Array<{ [key: string]: string }>
}

export default {
    async list(carecenterId: number): Promise<IPatient[]> {
        const result: IServiceResult = await WebService.exec(
            "carecenter.listPatients", carecenterId)
        return result.list.map(p => ({
            id: castInteger(p.id),
            key: castString(p.key, ""),
            firstName: castString(p['#PATIENT-FIRSTNAME'], ""),
            secondName: castString(p['#PATIENT-SECONDNAME'], ""),
            lastName: castString(p['#PATIENT-LASTNAME'], ""),
            country: castString(p['#PATIENT-COUNTRY'], ""),
            sex: castSex(p['#PATIENT-GENDER']),
            size: castInteger(p['#PATIENT-SIZE'])
        }))
    }
}


function castSex(sex: any) {
    switch (castString(sex, "")) {
        case '#H': return "M"
        case '#F': return "F"
        default: return "?"
    }
}
