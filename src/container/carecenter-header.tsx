import { connect } from 'react-redux'
import CarecenterHeader from "../view/carecenter-header"
import { IState, ICarecenter, IDispatchFunction } from "../types"
import State from "../state"
import StatsConfigDialog from "../dialog/stats-config"

function mapStateToProps(state: IState) {
    return {}
}

function mapDispatchToProps(dispatch: IDispatchFunction) {
    return {
        onStatClick(carecenter: ICarecenter) {
            console.log("carecenter=", carecenter);
            dispatch(State.initStatsConfig(carecenter.id));
            StatsConfigDialog.show();
        },

        onStructClick(carecenter: ICarecenter) {
            console.log("carecenter=", carecenter);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarecenterHeader);
