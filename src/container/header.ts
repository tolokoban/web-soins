import { connect } from 'react-redux'
import Header from "../presentational/header"
import User from "../state/user"
import { IState, IDispatchFunction } from "../types"

function mapStateToProps(state: IState) {
  return {
    nickname: state.user.nickname,
    language: state.user.language
  }
}

function mapDispatchToProps(dispatch: IDispatchFunction) {
  return {
    onLanguageClick() {
      dispatch(User.setLanguage("jp"));
    },

    onLogoutClick() {
      window.location.reload();
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
