import * as React from "react"
import { connect } from 'react-redux'
import CarecenterHeader from "./carecenter-header"
import Sidemenu from "../tfw/layout/sidemenu"
import Button from "../tfw/view/button"
import User from "../state/user"
import { IState, IDispatchFunction, IOrganization, ICarecenter } from "../types"

import _ from "../intl";

function mapStateToProps(state: IState) {
    return {
        head: state.user.nickname,
        menu: (<div>
            <ul>{
            state.organizations.map((organization: IOrganization) => (
                <li key={organization.id}>{organization.name}<ul>{
                    state.carecenters.filter((carecenter: ICarecenter) =>
                        carecenter.organizationId === organization.id)
                        .map( (carecenter: ICarecenter) => (
                            <CarecenterHeader key={carecenter.id} carecenter={carecenter} />
                        ) )
                }</ul></li>
            ))
        }</ul>
        <br/><hr/><br/>
        <Button label={_("logout")} icon="logout" wide={true}/>
    </div>),
        body: <div>Hello world!</div>
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
