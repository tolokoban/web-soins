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
    countingReports() { return _('counting-reports') }
    createStat() { return _('create-stat') }
    createStatConsultation() { return _('create-stat-consultation') }
    createStatPatient() { return _('create-stat-patient') }
    dateMin() { return _('date-min') }
    dateMax() { return _('date-max') }
    executeQuery() { return _('execute-query') }
    extractions() { return _('extractions') }
    filter() { return _('filter') }
    firstName() { return _('firstname') }
    gender() { return _('gender') }
    genderValue(type: string) {
        switch (type.trim().toUpperCase()) {
            case 'M': return _('gender-male')
            case 'F': return _('gender-female')
            default: return _('gender-undefined')
        }
    }
    generatingReport() { return _('generating-report') }
    hintReportTemplates() { return _('hint-report-templates') }
    lastName() { return _('lastname') }
    loading() { return _('loading') }
    loadingReport() { return _('loading-report') }
    logout() { return _('logout') }
    patients() { return _('patients') }
    patientsCount() { return _('patients-count') }
    queryInProgress() { return _('query-in-progress') }
    report() { return _('report') }
    secondName() { return _('secondname') }
    size() { return _('size') }
    statType() { return _('stat-type') }
    struct() { return _('struct') }
    welcome() { return _('welcome') }
}

export default new Dict()
