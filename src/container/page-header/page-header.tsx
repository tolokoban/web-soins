import { connect } from 'react-redux'
import { IState } from "../../types"
import State from '../../state'
import View from "../../view/page-header"
import { IPageHeaderProps } from "../../view/page-header"

function mapStateToProps(state: IState) {
    const props: Partial<IPageHeaderProps> = {
        organization: state.current.organization,
        carecenter: state.current.carecenter
    }
    return props
}

function mapDispatchToProps(dispatch) {
    return {
        // onClick: ...
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(View)
