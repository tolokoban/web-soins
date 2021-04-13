import * as React from "react"
import { connect } from 'react-redux'
import Stat from "../../view/stat"
import Sidemenu from "tololib/layout/sidemenu"
import Icon from "tololib/view/icon"
import Flex from "tololib/layout/flex"
import User from "../../state/user"
import State from "../../state"
import Hash from "../../util/hash"
import MainPanel from '../../view/main-panel'
import Pages from '../../view/pages'

import { IState, IDispatchFunction, IOrganization, ICarecenter } from "../../types"
import Intl from "../../intl"

import "./sidemenu.css"

function mapStateToProps(state: IState) {
    const stats = state.stats.map(stat => {
        const carecenter = stat.carecenter;
        const structureId = carecenter.id;
        const structure = state.structures.find(s => s.id === structureId);
        if (!structure) {
            console.error(`There is no Structure with id=${structureId} in carecenter "${carecenter.name}"!`);
            return null;
        }
        const key = Hash.statsConfig(stat);
        return (<Stat key={key}
            stat={stat}
            onClose={() => State.dispatch(State.removeStat(key))}
            structure={structure} />);
    });
    return {
        head: state.user.nickname,
        menu: <MainPanel
                    carecenters={state.carecenters}
                    organizations={state.organizations}
                    structures={state.structures}/>,
        body: <Pages page={state.page} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Sidemenu);
