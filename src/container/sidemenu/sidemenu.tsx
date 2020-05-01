import * as React from "react"
import { connect } from 'react-redux'
import CarecenterHeader from "../carecenter-header"
import Wait from "../../view/wait"
import Stat from "../../view/stat"
import Sidemenu from "../../tfw/layout/sidemenu"
import Icon from "../../tfw/view/icon"
import Flex from "../../tfw/layout/flex"
import Button from "../../tfw/view/button"
import User from "../../state/user"
import State from "../../state"
import Hash from "../../util/hash"

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
        menu: (<div>
            <ul>{state.organizations.map((organization: IOrganization) => (
                <li key={organization.id}>{organization.name}<ul>{
                    renderCareCenterHeader(state, organization)
                }</ul></li>
            ))
            }</ul>
            <br /><hr /><br />
            <Button label={Intl.logout()} icon="logout" wide={true}
                onClick={() => window.location.reload()} />
        </div>),
        body: stats.length > 0 ? stats : (
            <Flex
                dir="column"
                alignItems="center"
                classes={["container-sidemenu", "welcome"]}
            >
                <div>{Intl.welcome()}</div>
                <Icon content="stat" />
                <div>{Intl.report()}</div>
                <Icon content="report" />
            </Flex>
        )
    }
}

function renderCareCenterHeader(state: IState, organization: IOrganization) {
    const carecentersOfOrganization = state.carecenters.filter((carecenter: ICarecenter) =>
        carecenter.organizationId === organization.id)
    if (carecentersOfOrganization.length === 0) return <Wait/>

    return carecentersOfOrganization.map((carecenter: ICarecenter) => (
        <CarecenterHeader
            key={carecenter.id}
            carecenter={carecenter}
            structures={state.structures} />
    ))
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
