import Intl from "./tfw/intl"
const _ = Intl.make(require("./intl.yaml"))

class Dict {
    get buttonPatient() { return _('button-patient') }
    get buttonReports() { return _('button-reports') }
    get buttonStats() { return _('button-stats') }
    get buttonStruct() { return _('button-struct') }
    get cancel() { return _('cancel') }
    get close() { return _('close') }
    get code() { return _('code') }
    get consultations() { return _('consultations') }
    get consultationsCount() { return _('consultations-count') }
    get countingReports() { return _('counting-reports') }
    get createStat() { return _('create-stat') }
    get createStatConsultation() { return _('create-stat-consultation') }
    get createStatPatient() { return _('create-stat-patient') }
    get dateMin() { return _('date-min') }
    get dateMax() { return _('date-max') }
    get executeQuery() { return _('execute-query') }
    get extractions() { return _('extractions') }
    get filter() { return _('filter') }
    get firstName() { return _('firstname') }
    get gender() { return _('gender') }
    genderValue(type: string) {
        switch (type.trim().toUpperCase()) {
            case 'M': return _('gender-male')
            case 'F': return _('gender-female')
            default: return _('gender-undefined')
        }
    }
    get generatingReport() { return _('generating-report') }
    get hintReportTemplates() { return _('hint-report-templates') }
    get identifier() { return _('identifier') }
    get lastName() { return _('lastname') }
    get loading() { return _('loading') }
    get loadingReport() { return _('loading-report') }
    get logout() { return _('logout') }
    get patients() { return _('patients') }
    get patientsCount() { return _('patients-count') }
    get queryInProgress() { return _('query-in-progress') }
    get report() { return _('report') }
    get secondName() { return _('secondname') }
    get size() { return _('size') }
    get statType() { return _('stat-type') }
    get struct() { return _('struct') }
    get welcome() { return _('welcome') }
}

export default new Dict()
