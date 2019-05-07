import WebService from "../tfw/web-service"
import Parser from "../structure/parser"
import Intl from "../tfw/intl"
import castString from "../tfw/converter/string"
import { IStructure, IPatientField } from "../types"

export default {
    async list(organizationId: number) {
        const structures = await WebService.exec("structure.list", organizationId);
        return structures.map((structure: IStructure) => Object.assign(
            structure, {
                organizationId,
                patientData: parsePatient(structure.patient)
            }
        ));
    }
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
