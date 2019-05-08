import WebService from "../tfw/web-service"
import Parser from "../structure/parser"
import Intl from "../tfw/intl"
import castString from "../tfw/converter/string"
import { IStructure, IPatientField } from "../types"

export interface IStructureService {
    id: number;
    name: string;
    exams: string;
    vaccins: string;
    patient: string;
    forms: string;
    types: string;
}


export default {
    async list(organizationId: number) {
        const structures: IStructureService[] =
            await WebService.exec("structure.list", organizationId);
        return structures.map((structure: IStructureService) => (
            {
                id: structure.id,
                organizationId,
                name: structure.name,
                patientFields: parsePatient(structure.patient),
                formFields: parseFormFields(structure),
                exams: parse(structure.exams),
                vaccins: parse(structure.vaccins),
                forms: parse(structure.forms),
                types: parse(structure.types),
                sources: {
                    exams: structure.exams,
                    vaccins: structure.vaccins,
                    patient: structure.patient,
                    forms: structure.forms,
                    types: structure.types
                }
            }
        ));
    }
}


function parse(def: string) {
    try {
        return Parser.parse(def);
    }
    catch (ex) {
        console.error("[parsePatient] ", ex);
        console.log(def);
    }
    return null;
}

function parsePatient(stringifiedPatientDef: string): IPatientField[] {
    try {
        const raw = Parser.parse(stringifiedPatientDef);
        const patients: IPatientField[] = Object.keys(raw).map((id: string) => {
            const patient = raw[id];
            return {
                id,
                type: patient.type,
                caption: Intl.toIntl(patient.caption)
            }
        });
        return patients;
    }
    catch (ex) {
        console.error("[parsePatient] ", ex);
    }
    return [];
}

interface IFlatField {
    type: string;
    caption: { [key: string]: string };
}

function parseFormFields(structure: IStructureService): { [key: string]: IFlatField } {
    const result: { [key: string]: IFlatField } = {};
    const fringe = [parse(structure.forms)];
    while (fringe.length > 0) {
        const item = fringe.shift();
        for (const name of Object.keys(item)) {
            const value = item[name];
            result[name] = { caption: Intl.toIntl(value.caption) };
            if (value.type) result[name].type = value.type;
            if (value.children) {
                fringe.push(value.children);
            }
        }
    }
    return result;
}
