import * as React from "react"
import { connect } from 'react-redux'
import CarecenterHeader from "./carecenter-header"
import Stat from "../presentational/stat"
import Sidemenu from "../tfw/layout/sidemenu"
import Button from "../tfw/view/button"
import InputDate from "../tfw/view/input-date"
import User from "../state/user"
import { IState, IDispatchFunction, IOrganization, ICarecenter } from "../types"
import Pie from "../presentational/pie"
import _ from "../intl";

function mapStateToProps(state: IState) {
    const stats = state.stats.map( stat => {
        const carecenter = stat.carecenter;
        const structureId = carecenter.id;
        const structure = state.structures.find(s => s.id === structureId);
        if( !structure) {
            console.error(`There is no Structure with id=${structureId} in carecenter "${carecenter.name}"!`);
            return null;
        }
        return (<Stat key={JSON.stringify(stat)} stat={stat} structure={structure}/>);
    });
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
        body: stats.length > 0 ? stats : <div>{"Toutes vos statistiques s'afficheront ici..."}</div>
        // body: stats.length > 0 ? stats : <Pie values={[100, 78 ,24, 5]}/>
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
