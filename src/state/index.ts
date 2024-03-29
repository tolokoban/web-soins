/**
 * The full state of the application is stored and managed here.
 */
import { createStore } from "redux"
import { useSelector } from "react-redux"
import Current from './current'
import User from "./user"
import Organizations from "./organizations"
import Page from "./page"
import Carecenters from "./carecenters"
import Structure from "../structure"
import Structures from "./structures"
import StatsConfig from "./stats-config"
import Stats from "./stats"
import Hash from "../util/hash"
import { IState, IAction } from "../types"

function dispatch(action: IAction) {
    store.dispatch(action)
}

const INITIAL_STATE: IState = {
    current: Current.INITIAL_STATE,
    carecenters: Carecenters.INITIAL_STATE,
    organizations: Organizations.INITIAL_STATE,
    page: Page.INITIAL_STATE,
    stats: Stats.INITIAL_STATE,
    statsConfig: StatsConfig.INITIAL_STATE,
    structures: Structures.INITIAL_STATE,
    user: User.INITIAL_STATE
}

function reducer(state: IState | undefined = INITIAL_STATE, action: IAction): IState {
    switch (action.type) {
        case "initStatsConfig": return initStatsConfig(state, action)
        case "addStat": return addStat(state, action)
        case "removeStat": return removeStat(state, action)
        default: return {
            current: Current.reducer(state.current, action),
            user: User.reducer(state.user, action),
            stats: Stats.reducer(state.stats, action),
            organizations: Organizations.reducer(state.organizations, action),
            page: Page.reducer(state.page, action),
            carecenters: Carecenters.reducer(state.carecenters, action),
            structures: Structures.reducer(state.structures, action),
            statsConfig: StatsConfig.reducer(state.statsConfig, action)
        }
    }
}

const store = createStore(reducer)

function addStat(state: IState, action: IAction): IState {
    const h = Hash.statsConfig(state.statsConfig)
    const stats = state.stats.filter(s => Hash.statsConfig(s) !== h)
    stats.push({ ...state.statsConfig })
    return { ...state, stats }
}

function removeStat(state: IState, action: IAction): IState {
    const stats = state.stats.filter(s => Hash.statsConfig(s) !== action.key)
    return { ...state, stats }
}

function initStatsConfig(state: IState, action: IAction): IState {
    const carecenterId = action.carecenterId
    const carecenter = state.carecenters.find(c => c.id === carecenterId)
    if (!carecenter) {
        throw Error(`There is no Carecenter with id=${carecenterId}!`)
    }
    const structureId = carecenter.structureId
    if (typeof structureId !== 'number') {
        throw Error('Missing attribute number "structureId"!')
    }
    const structure = state.structures.find(s => s.id === structureId)
    if (!structure) {
        throw Error(`There is no structure with id ${structureId}!`)
    }
    return {
        ...state,
        statsConfig: {
            ...state.statsConfig,
            carecenter,
            patientsFields: Structure.createPatientsFieldsFromStructure(structure),
            patientsFieldsCaptions: Structure.createPatientsFieldsCaptionsFromStructure(structure)
        }
    }
}

export default {
    store, dispatch,

    useSelector<T>(selector:(state: IState) => T): T {
        return useSelector(selector)
    },

    Current, Page, User, Organizations, Carecenters, Structures, StatsConfig,

    initStatsConfig(carecenterId: number): IAction {
        return { type: "initStatsConfig", carecenterId }
    },
    addStat(): IAction {
        return { type: "addStat" }
    },
    removeStat(key: string): IAction {
        return { type: "removeStat", key }
    }
}
