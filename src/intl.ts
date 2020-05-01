import Intl from "./tfw/intl"
const _ = Intl.make(require("./App.yaml"))

class Dict {
    buttonReports(...args: string[]) { return _('button-reports', ...args) }
    buttonStats(...args: string[]) { return _('button-stats', ...args) }
    cancel(...args: string[]) { return _('cancel', ...args) }
    close(...args: string[]) { return _('close', ...args) }
    code(...args: string[]) { return _('code', ...args) }
    consultations(...args: string[]) { return _('consultations', ...args) }
    consultationsCount(...args: string[]) { return _('consultations-count', ...args) }
    createStat(...args: string[]) { return _('create-stat', ...args) }
    createStatConsultation(...args: string[]) { return _('create-stat-consultation', ...args) }
    createStatPatient(...args: string[]) { return _('create-stat-patient', ...args) }
    dateMin(...args: string[]) { return _('date-min', ...args) }
    dateMax(...args: string[]) { return _('date-max', ...args) }
    executeQuery(...args: string[]) { return _('execute-query', ...args) }
    filter(...args: string[]) { return _('filter', ...args) }
    generatingReport(...args: string[]) { return _('generating-report', ...args) }
    hintReportTemplates(...args: string[]) { return _('hint-report-templates', ...args) }
    loading(...args: string[]) { return _('loading', ...args) }
    loadingReport(...args: string[]) { return _('loading-report', ...args) }
    logout(...args: string[]) { return _('logout', ...args) }
    patients(...args: string[]) { return _('patients', ...args) }
    patientsCount(...args: string[]) { return _('patients-count', ...args) }
    queryInProgress(...args: string[]) { return _('query-in-progress', ...args) }
    report(...args: string[]) { return _('report', ...args) }
    statType(...args: string[]) { return _('stat-type', ...args) }
    struct(...args: string[]) { return _('struct', ...args) }
    welcome(...args: string[]) { return _('welcome', ...args) }
}

export default new Dict()
