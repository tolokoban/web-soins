import { connect } from 'react-redux'
import StatsConfig from "../view/stats-config"
import Actions from "../state/stats-config"
import { IState, IDispatchFunction } from "../types"

function mapStateToProps(state: IState) {
    return {
        statsType: state.statsConfig.statsType,
        dateMin: state.statsConfig.dateMin,
        dateMax: state.statsConfig.dateMax
    }
}

function mapDispatchToProps(dispatch: IDispatchFunction) {
    return {
        onTypeChange(type: "patients" | "consultations") {
            dispatch(Actions.setType(type));
        },

        onDateMinChange(date: number) {
            console.info("[onDateMinChange] date=", date);
            dispatch(Actions.setDateMin(date));
        },

        onDateMaxChange(date: number) {
            dispatch(Actions.setDateMax(date));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatsConfig);
