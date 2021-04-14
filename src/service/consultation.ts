import Tfw from 'tololib'
import { IConsultation } from '../types'

interface IGetResult {
    fields: string[]
    patients: {
        [key: string]: [number, ...string[]]
    }
}

const CONSULTATION_NOT_FOUND = 1

export default {
    CONSULTATION_NOT_FOUND,

    async get(consultationId: number): Promise<IConsultation> {
        const result: IGetResult = await Tfw.WebService.exec(
            "consultation.list", [consultationId]
        )
        const fields: { [key: string]: string } = {}
        console.info("result=", result)
        if (!result.patients || !result.fields) {
            Tfw.Util.fatal(
                CONSULTATION_NOT_FOUND, `Consultation id not found: ${consultationId}`)
        }
        const patientKey = Object.keys(result.patients)[0]
        if (!patientKey) {
            Tfw.Util.fatal(
                CONSULTATION_NOT_FOUND, `Consultation id not found: ${consultationId}`)
        }
        const [patientEnterDate, ...patientFields] = result.patients[patientKey]
        const fieldNames = result.fields
        const fieldValues: string[] = patientFields
        console.info("fieldNames=", fieldNames)
        console.info("fieldValues=", fieldValues)
        for (let k = 0; k < fieldNames.length; k++) {
            const fieldName = fieldNames[k]
            const fieldValue = fieldValues[k]
            fields[fieldName] = fieldValue
        }
        console.info("fields=", fields)
        return {
            id: consultationId,
            date: new Date(Number(patientFields[0]) * 1000),
            fields
        }
    }
}
