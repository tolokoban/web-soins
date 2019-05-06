import * as React from "react"
import { connect } from 'react-redux'
import CarecenterHeader from "./carecenter-header"
import Sidemenu from "../tfw/layout/sidemenu"
import Button from "../tfw/view/button"
import StatsConfig form "../presentational/stats-config"
import User from "../state/user"
import { IState, IDispatchFunction, IOrganization, ICarecenter } from "../types"

import _ from "../intl";

function mapStateToProps(state: IState) {
    return {
        head: state.user.nickname,
        menu: (<div>
            <ul>{state.organizations.map((organization: IOrganization) => (
                <li key={organization.id}>{organization.name}<ul>{
                    state.carecenters.filter((carecenter: ICarecenter) =>
                        carecenter.organizationId === organization.id)
                        .map((carecenter: ICarecenter) => (
                            <CarecenterHeader
                                key={carecenter.id}
                                carecenter={carecenter}
                                structures={state.structures} />
                        ))
                }</ul></li>
            ))
            }</ul>
            <br /><hr /><br />
            <Button label={_("logout")} icon="logout" wide={true}
                onClick={() => window.location.reload()} />
        </div>),
        body: (<div className="thm-bg1" style={{ padding: "2rem" }}>
            <StatsConfig />
        </div>)
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
