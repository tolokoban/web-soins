import { connect } from 'react-redux'
import StatsPatientConfig from "../presentational/stats-patients-config"
import Actions from "../state/stats-config"
import { IState, IDispatchFunction } from "../types"

function mapStateToProps(state: IState) {
    return {
        fields: state.statsConfig.patientsFields,
        fieldsCaptions: state.statsConfig.patientsFieldsCaptions
    }
}

function mapDispatchToProps(dispatch: IDispatchFunction) {
    return {
        onFieldChange(fieldName: string, isSelected: boolean) {
            dispatch(Actions.setPatientField(fieldName, isSelected));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatsPatientConfig);
