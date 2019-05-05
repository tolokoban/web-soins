import { connect } from 'react-redux'
import CarecenterHeader from "../presentational/carecenter-header"
import { IState, ICarecenter, IDispatchFunction } from "../types"

function mapStateToProps(state: IState) {
    return {}
}

function mapDispatchToProps(dispatch: IDispatchFunction) {
    return {
        onStatClick(carecenter: ICarecenter) {
            console.log("carecenter=", carecenter);
        },

        onLogoutClick() {
            window.location.reload();
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CarecenterHeader);
