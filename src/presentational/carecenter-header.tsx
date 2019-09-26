import * as React from "react"
import { ICarecenter, IStructure } from "../types"
import Button from "../tfw/view/button"
import Report from '../report'
import _ from "../intl";

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

    render() {
        const carecenter: ICarecenter = this.props.carecenter;
        const structure: IStructure | undefined = this.props.structures.find(s => s.id === carecenter.structureId);

        return (<div className="presentational-carecenter-header">
            <div>
                <div className="name">{carecenter.name}</div>
                <div className="prop">
                    <div>{_("code")}</div>
                    <div>{carecenter.id}-{carecenter.code}</div>
                </div>
                <div className="prop">
                    <div>{_("patients-count")}</div>
                    <div>{carecenter.patientsCount}</div>
                </div>
                <div className="prop">
                    <div>{_("consultations-count")}</div>
                    <div>{carecenter.consultationsCount}</div>
                </div>
                <div className="prop">
                    <div>{_("struct")}</div>
                    <div>{structure ? structure.name : '...'}</div>
                </div>
            </div>
            <div className="buttons">
                <Button icon="stat" small={true} onClick={this.handleStatClick} /><br />
                <Button icon="report" small={true} onClick={this.handleReportClick} /><br />
                {/*<Button icon="sitemap" small={true}
                    enabled={structure ? true : false}
                    onClick={this.handleStructClick} />*/}
            </div>
        </div>);
    }
}