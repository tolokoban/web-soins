import { connect } from 'react-redux'
import Header from "../presentational/header"
import * as UserState from "../state/user"

function mapStateToProps(state) {
    return {
        nickname: state.user.nickname,
        language: state.user.language
    }
}

function mapDispatchToProps(dispatch) {
    return {
        onLanguageClick() {
            dispatch(UserState.setLanguage("jp"));
        },

        onLogoutClick() {
            window.location.reload();
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
