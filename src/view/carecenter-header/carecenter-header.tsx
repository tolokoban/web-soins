import Tfw from 'tfw'
import * as React from "react"
import { ICarecenter, IOrganization, IStructure } from "../../types"
import State from '../../state'
import Intl from "../../intl"
import "./carecenter-header.css"

const Button = Tfw.View.Button

interface ICarecenterHeaderProps {
    carecenter: ICarecenter
    organization: IOrganization
    structures: IStructure[]
}

export default class CarecenterHeader extends React.Component<ICarecenterHeaderProps, {}> {
    constructor(props: ICarecenterHeaderProps) {
        super(props);
        this.handleStatClick = this.handleStatClick.bind(this);
    }

    setCurrent() {
        const { carecenter, organization } = this.props
        State.dispatch(State.Current.set({ carecenter, organization }))
    }

    handleStatClick = () => {
        this.setCurrent()
        State.dispatch(State.Page.page("stats"))
    }

    handleStructClick = () => {
        this.setCurrent()
        State.dispatch(State.Page.page("struct"))
    }

    handleReportClick = () => {
        this.setCurrent()
        State.dispatch(State.Page.page("reports"))
    }

    handlePatientClick = () => {
        this.setCurrent()
        State.dispatch(State.Page.page("patients"))
    }

    render() {
        const carecenter: ICarecenter = this.props.carecenter;
        const structure: IStructure | undefined = this.props.structures
            .find(s => s.id === carecenter.structureId);

        return (<div className="presentational-carecenter-header">
            <div>
                <div className="name">{carecenter.name}</div>
                <div className="prop">
                    <div>{Intl.code}</div>
                    <div>{carecenter.id}-{carecenter.code}</div>
                </div>
                <div className="prop">
                    <div>{Intl.patientsCount}</div>
                    <div>{carecenter.patientsCount}</div>
                </div>
                <div className="prop">
                    <div>{Intl.consultationsCount}</div>
                    <div>{carecenter.consultationsCount}</div>
                </div>
                <div className="prop">
                    <div>{Intl.struct}</div>
                    <div>{structure ? structure.name : '...'}</div>
                </div>
            </div>
            <div className="buttons">
                <Button
                    icon="stat"
                    label={Intl.buttonStats}
                    small={true}
                    onClick={this.handleStatClick} />
                <Button
                    icon="report"
                    label={Intl.buttonReports}
                    small={true}
                    onClick={this.handleReportClick} /><br />
                <Button
                    icon="user"
                    label={Intl.buttonPatient}
                    small={true}
                    onClick={this.handlePatientClick} /><br />
                <Button
                    icon="sitemap"
                    label={Intl.buttonStruct}
                    small={true}
                    onClick={this.handleStructClick} /><br />
            </div>
        </div>);
    }
}
