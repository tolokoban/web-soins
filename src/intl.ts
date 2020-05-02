import Intl from "./tfw/intl"
const _ = Intl.make(require("./intl.yaml"))

class Dict {
    buttonPatient() { return _('button-patient') }
    buttonReports() { return _('button-reports') }
    buttonStats() { return _('button-stats') }
    buttonStruct() { return _('button-struct') }
    cancel() { return _('cancel') }
    close() { return _('close') }
    code() { return _('code') }
    consultations() { return _('consultations') }
    consultationsCount() { return _('consultations-count') }
    createStat() { return _('create-stat') }
    createStatConsultation() { return _('create-stat-consultation') }
    createStatPatient() { return _('create-stat-patient') }
    dateMin() { return _('date-min') }
    dateMax() { return _('date-max') }
    executeQuery() { return _('execute-query') }
    filter() { return _('filter') }
    generatingReport() { return _('generating-report') }
    hintReportTemplates() { return _('hint-report-templates') }
    loading() { return _('loading') }
    loadingReport() { return _('loading-report') }
    logout() { return _('logout') }
    patients() { return _('patients') }
    patientsCount() { return _('patients-count') }
    queryInProgress() { return _('query-in-progress') }
    report() { return _('report') }
    statType() { return _('stat-type') }
    struct() { return _('struct') }
    welcome() { return _('welcome') }
}

export default new Dict()
