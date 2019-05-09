import { IStructure, IPatientField } from "../types"
import Intl from "../tfw/intl"

export default {
    createPatientsFieldsFromStructure(structure: IStructure): { [key: string]: boolean } {
        const patientsFields : { [key: string]: boolean }= {};
        structure.patientFields.forEach((patientField: IPatientField) => {
            patientsFields[patientField.id] = true;
        });
        return patientsFields;
    },

    createPatientsFieldsCaptionsFromStructure(structure: IStructure): { [key: string]: string } {
        const patientsFieldsCaptions : { [key: string]: string }= {};
        structure.patientFields.forEach((patientField: IPatientField) => {
            patientsFieldsCaptions[patientField.id] = Intl.toText(patientField.caption);
        });
        return patientsFieldsCaptions;
    },

    getFieldCaption(key:string, structure:IStructure) {
        if( key.charAt(0) !== '#') return key;
        const item: {caption: string, type: string}|undefined =
         structure.formFields[key];
        if( !item ) return key;
        return Intl.toText(item.caption);
    }
}
