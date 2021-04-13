import Tfw from 'tololib'
import { IPatient } from "../types"

const WebService = Tfw.WebService
const castString = Tfw.Converter.String
const castInteger = Tfw.Converter.Integer

const SEPARATORS = [" ", "-", "'"]

interface IServiceResult {
    name: string
    list: Array<{ [key: string]: string }>
}

// [id, time, key, value]
type IConsultationsServiceReturn = Array<[number, number, string, string]>

export interface IConsultation {
    id: number
    date: Date
    fields: { [key: string]: string }
}

export default {
    async list(carecenterId: number): Promise<IPatient[]> {
        const result: IServiceResult = await WebService.exec(
            "carecenter.listPatients", carecenterId)
        const patients: IPatient[] = result.list.map(p => ({
            id: castInteger(p.id),
            key: castString(p.key, ""),
            firstName: capitalize(castString(p['#PATIENT-FIRSTNAME'], "").trim(), SEPARATORS),
            secondName: capitalize(castString(p['#PATIENT-SECONDNAME'], "").trim(), SEPARATORS),
            lastName: castString(p['#PATIENT-LASTNAME'], "").trim().toUpperCase(),
            country: castString(p['#PATIENT-COUNTRY'], ""),
            sex: castSex(p['#PATIENT-GENDER']),
            size: castInteger(p['#PATIENT-SIZE'])
        }))
        patients.sort((p1: IPatient, p2: IPatient) => {
            const ln1 = p1.lastName.trim().toUpperCase()
            const ln2 = p2.lastName.trim().toUpperCase()
            if (ln1 < ln2) return -1
            if (ln1 > ln2) return +1
            const fn1 = `${p1.firstName} / ${p1.secondName}`.trim().toUpperCase()
            const fn2 = `${p2.firstName} / ${p1.secondName}`.trim().toUpperCase()
            if (fn1 < fn2) return -1
            if (fn1 > fn2) return +1
            return 0
        })
        return patients
    },

    async consultations(patientId: number): Promise<IConsultation[]> {
        const result: IConsultationsServiceReturn = await WebService.exec(
            "patient.listConsultations", patientId)

        const consultations: IConsultation[] = []
        let currentConsultation: IConsultation = {
            id: 0,
            date: new Date(),
            fields: {}
        }
        let lastId = 0
        for (const row of result) {
            const [id, time, key, value] = row
            if (lastId !== id) {
                currentConsultation = {
                    id,
                    date: new Date(time * 1000),
                    fields: {}
                }
                consultations.push(currentConsultation)
                lastId = id
            }
            currentConsultation.fields[key] = value
        }
        return consultations
    }
}


function castSex(sex: any) {
    switch (castString(sex, "")) {
        case '#H': return "M"
        case '#F': return "F"
        default: return "?"
    }
}


function capitalize(text: string, separators: string[] = []): string {
    if (separators.length === 0) {
        const trimedText = text.trim().toLowerCase()
        return `${trimedText.charAt(0).toUpperCase()}${trimedText.substr(1)}`
    }
    const nextSeparators = separators.slice(1)
    const sep = separators[0]
    return text.trim()
        .split(sep)
        .map(child => capitalize(child, nextSeparators))
        .join(sep)
}
