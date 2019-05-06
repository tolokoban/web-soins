import { connect } from 'react-redux'
import StatsConfig from "../presentational/stats-config"
import User from "../state/user"
import { IState, IDispatchFunction } from "../types"

function mapStateToProps(state: IState) {
    return {
        type: state.statsConfig.type
    }
}

function mapDispatchToProps(dispatch: IDispatchFunction) {
    return {
        onTypeChange(type: string) {
            dispatch(StatsConfig.setType(type));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatsConfig);
