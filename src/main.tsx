import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import State from "./state"
import Intl from "./tfw/intl";
import { IUser, IOrganization, ICarecenter, IStructure } from "./types"
import ServiceOrganization from "./service/organization"
import ServiceCarecenter from "./service/carecenter"
import ServiceStructure from "./service/structure"

import App from "./App";

export default {
    async start(user: IUser) {
        const root = document.getElementById("root");
        ReactDOM.render(
            <Provider store={State.store}><App user={user} /></Provider>,
            root);
        State.dispatch(State.User.setLanguage(Intl.lang));
        State.dispatch(State.User.setNickname(user.nickname));
        const organizations = await ServiceOrganization.list();
        State.dispatch(State.Organizations.setOrganizations(organizations));
        State.dispatch(State.Carecenters.setCarecenters([]));
        organizations.forEach(async (organization: IOrganization) => {
            const structures = await ServiceStructure.list(organization.id);
            structures.forEach((structure: IStructure) => {
                State.dispatch(State.Structures.addStructure(structure));
            });
            const carecenters = await ServiceCarecenter.list(organization.id);
            carecenters.forEach((carecenter: ICarecenter) => {
                State.dispatch(State.Carecenters.addCarecenter(carecenter));
            });
        })
    }
}
