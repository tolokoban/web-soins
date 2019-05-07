import { IStructure, IPatientField } from "../types"
import Intl from "../tfw/intl"

export default {
    createPatientsFieldsFromStructure(structure: IStructure): { [key: string]: boolean } {
        const patientsFields : { [key: string]: boolean }= {};
        structure.patientData.forEach((patientField: IPatientField) => {
            patientsFields[patientField.id] = true;
        });
        return patientsFields;
    },

    createPatientsFieldsCaptionsFromStructure(structure: IStructure): { [key: string]: string } {
        const patientsFieldsCaptions : { [key: string]: string }= {};
        structure.patientData.forEach((patientField: IPatientField) => {
            patientsFieldsCaptions[patientField.id] = Intl.toText(patientField.caption);
        });
        return patientsFieldsCaptions;
    }
}
