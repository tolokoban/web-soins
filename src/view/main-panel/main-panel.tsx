import React from "react"
import Tfw from 'tfw'
import { IOrganization, ICarecenter, IStructure } from '../../types'
import Intl from '../../intl'
import CarecenterHeader from "../carecenter-header"
import Wait from "../../view/wait"

import "./main-panel.css"

const Button = Tfw.View.Button
const _ = Tfw.Intl.make(require("./main-panel.yaml"))

interface IMainPanelProps {
    className?: string[]
    carecenters: ICarecenter[]
    organizations: IOrganization[]
    structures: IStructure[]
}
interface IMainPanelState { }

export default class MainPanel extends React.Component<IMainPanelProps, IMainPanelState> {
    state = {}

    renderCareCenterHeader(organization: IOrganization) {
        const { carecenters, structures } = this.props
        const carecentersOfOrganization = carecenters.filter((carecenter: ICarecenter) =>
            carecenter.organizationId === organization.id)
        if (carecentersOfOrganization.length === 0) return <Wait />

        return carecentersOfOrganization.map((carecenter: ICarecenter) => (
            <CarecenterHeader
                key={carecenter.id}
                carecenter={carecenter}
                organization={organization}
                structures={structures}
            />))
    }

    render() {
        const { organizations } = this.props
        const classes = [
            'view-MainPanel',
            ...Tfw.Converter.StringArray(this.props.className, [])
        ]
        return (<div className={classes.join(' ')}>
            <ul>{organizations.map((organization: IOrganization) => (
                <li key={organization.id}>{organization.name}<ul>{
                    this.renderCareCenterHeader(organization)
                }</ul></li>
            ))
            }</ul>
            <br /><hr /><br />
            <Button label={Intl.logout} icon="logout" wide={true}
                onClick={() => window.location.reload()} />
        </div>)
    }
}
