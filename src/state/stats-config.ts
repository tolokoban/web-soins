import { IAction, IStatsConfig } from "../types"
import castString from "../tfw/converter/string"
import castBoolean from "../tfw/converter/boolean"

const PREFIX = "stats-config:";

export default {
    INITIAL_STATE: {
        statsType: "patients",
        dateMin: lastMonth(),
        dateMax: today(),
        patientsFields: {
            birthday: true,
            size: false,
            nationality: true
        },
        patientsFieldsCaptions: {
            birthday: "Date de naissance",
            size: "Taille",
            nationality: "Nationalité"
        },
        carecenter: {}
    },

    reducer(state: IStatsConfig, action: IAction): IStatsConfig {
        const { type } = action;
        if (!type.startsWith(PREFIX)) return state;

        switch (action.type.substr(PREFIX.length)) {
            case "setType": return setType(state, action);
            case "setDateMin": return setDateMin(state, action);
            case "setDateMax": return setDateMax(state, action);
            case "setPatientsFields": return setPatientsFields(state, action);
            case "setPatientField": return setPatientField(state, action);
            default: throw Error(`Unknown action "${type}"!`);
        }
    },

    setType(statsType: "patients" | "consultations"): IAction {
        return { type: "stats-config:setType", statsType };
    },

    setDateMin(date:number): IAction {
        return { type: "stats-config:setDateMin", date };
    },

    setDateMax(date:number): IAction {
        return { type: "stats-config:setDateMax", date };
    },

    setPatientsFields(fields: { [key: string]: boolean }): IAction {
        return { type: "stats-config:setPatientsFields", fields };
    },

    setPatientField(fieldName: string, fieldVisibility: boolean): IAction {
        return { type: "stats-config:setPatientField", fieldName, fieldVisibility };
    }
}

function setType(state: IStatsConfig, action: IAction): IStatsConfig {
    return {
        ...state,
        statsType: action.statsType || "patients"
    };
}

function setDateMin(state: IStatsConfig, action: IAction): IStatsConfig {
    return {
        ...state,
        dateMin: action.date
    };
}

function setDateMax(state: IStatsConfig, action: IAction): IStatsConfig {
    return {
        ...state,
        dateMax: action.date
    };
}

function setPatientsFields(state: IStatsConfig, action: IAction): IStatsConfig {
    return {
        ...state,
        patientsFields: action.fields || {}
    };
}

function setPatientField(state: IStatsConfig, action: IAction): IStatsConfig {
    if (typeof action.fieldName !== 'string') {
        throw Error(`action must have an attribute "fieldName" of type "string" but we found "${typeof action.fieldName}"`);
    }
    const fieldName: string = castString(action.fieldName, "");
    const fieldVisibility: boolean = castBoolean(action.fieldVisibility, false);
    return {
        ...state,
        patientsFields: {
            ...state.patientsFields,
            [fieldName]: fieldVisibility
        }
    };
}


function today() {
    return Date.now();
}

function lastMonth() {
    const today = new Date();
    const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
    return lastMonth.getTime();
}
