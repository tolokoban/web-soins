import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import State from "./state"
import Intl from "./tfw/intl";
import { IUser, IOrganization, ICarecenter } from "./types"
import ServiceOrganization from "./service/organization"
import ServiceCarecenter from "./service/carecenter"

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
        console.log("organizations=", organizations);
        State.dispatch(State.Organizations.setOrganizations(organizations));
        State.dispatch(State.Carecenters.setCarecenters([]));
        organizations.forEach(async (organization: IOrganization) => {
            const carecenters = await ServiceCarecenter.list(organization.id);
            console.log("carecenters=", carecenters);
            carecenters.forEach((carecenter: ICarecenter) => {
                State.dispatch(State.Carecenters.addCarecenter(carecenter));
            });
        })
    }
}
