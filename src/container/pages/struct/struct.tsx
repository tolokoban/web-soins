import { connect } from 'react-redux'
import { IState } from "../../../types"
import State from '../../../state'
import View from "../../../view/pages/struct"

function mapStateToProps(state: IState) {
    return {
        carecenter: state.current.carecenter
    }
}

function mapDispatchToProps(dispatch) {
    return {
        // onClick: ...
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(View)
