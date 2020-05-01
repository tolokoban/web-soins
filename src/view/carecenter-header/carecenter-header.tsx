import * as React from "react"
import { ICarecenter, IStructure } from "../../types"
import Button from "../../tfw/view/button"
import Report from '../../report'

import Intl from "../../intl"
import "./carecenter-header.css"





interface ICarecenterHeaderProps {
    carecenter: ICarecenter;
    structures: IStructure[];
    onStatClick: (carecenter: ICarecenter) => void;
    onStructClick: (carecenter: ICarecenter) => void;
}

export default class CarecenterHeader extends React.Component<ICarecenterHeaderProps, {}> {
    constructor(props: ICarecenterHeaderProps) {
        super(props);
        this.handleStatClick = this.handleStatClick.bind(this);
    }

    handleStatClick = () => {
        const handler = this.props.onStatClick;
        if (typeof handler !== 'function') return;
        handler(this.props.carecenter);
    }

    handleStructClick = () => {
        const handler = this.props.onStructClick;
        if (typeof handler !== 'function') return;
        handler(this.props.carecenter);
    }

    handleReportClick = () => {
        const { carecenter } = this.props
        Report.generate({ carecenter: carecenter.id })
    }

    handleStructClick = () => {

    }

    render() {
        const carecenter: ICarecenter = this.props.carecenter;
        const structure: IStructure | undefined = this.props.structures.find(s => s.id === carecenter.structureId);

        return (<div className="presentational-carecenter-header">
            <div>
                <div className="name">{carecenter.name}</div>
                <div className="prop">
                    <div>{Intl.code()}</div>
                    <div>{carecenter.id}-{carecenter.code}</div>
                </div>
                <div className="prop">
                    <div>{Intl.patientsCount()}</div>
                    <div>{carecenter.patientsCount}</div>
                </div>
                <div className="prop">
                    <div>{Intl.consultationsCount()}</div>
                    <div>{carecenter.consultationsCount}</div>
                </div>
                <div className="prop">
                    <div>{Intl.struct()}</div>
                    <div>{structure ? structure.name : '...'}</div>
                </div>
            </div>
            <div className="buttons">
                <Button
                    icon="stat"
                    label={Intl.buttonStats()}
                    small={true}
                    onClick={this.handleStatClick} />
                <Button
                    icon="report"
                    label={Intl.buttonReports()}
                    small={true}
                    onClick={this.handleReportClick} /><br />
                <Button
                    icon="sitemap"
                    label={Intl.struct()}
                    small={true}
                    onClick={this.handleStructClick} /><br />
            </div>
        </div>);
    }
}
