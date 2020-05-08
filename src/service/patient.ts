import Tfw from 'tfw'
import { IPatient } from "../types"

const WebService = Tfw.WebService
const castString = Tfw.Converter.String
const castInteger = Tfw.Converter.Integer

const SEPARATORS = [" ", "-", "'"]

interface IServiceResult {
    name: string
    list: Array<{ [key: string]: string }>
}

interface IConsultationsServiceReturn {
    id: number[]
    time: number[]
}

export interface IConsultation {
    id: number
    date: Date
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
        for (let k = 0; k < result.id.length; k++) {
            consultations.push({
                id: result.id[k],
                date: new Date(result.time[k] * 1000)
            })
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
