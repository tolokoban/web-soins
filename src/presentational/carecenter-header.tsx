import * as React from "react"
import { ICarecenter } from "../types"
import Flex from "../tfw/layout/flex"
import Button from "../tfw/view/button"

import "./carecenter-header.css"
import _ from "../intl";


interface ICarecenterHeaderProps {
    carecenter: ICarecenter;
    onStatClick: (carecenter: ICarecenter) => void;
}

export default class CarecenterHeader extends React.Component<ICarecenterHeaderProps, {}> {
    constructor(props: ICarecenterHeaderProps) {
        super(props);
        this.handleStatClick = this.handleStatClick.bind(this);
    }

    handleStatClick() {
        const handler = this.props.onStatClick;
        if (typeof handler !== 'function') return;
        handler(this.props.carecenter);
    }

    render() {
        const carecenter: ICarecenter = this.props.carecenter;

        return (<div className="presentational-carecenter-header">
            <div>
                <div className="name">{carecenter.name}</div>
                <div className="prop">
                    <div>{_("code")}</div>
                    <div>{carecenter.code}</div>
                </div>
                <div className="prop">
                    <div>{_("patients-count")}</div>
                    <div>{carecenter.patientsCount}</div>
                </div>
                <div className="prop">
                    <div>{_("consultations-count")}</div>
                    <div>{carecenter.consultationsCount}</div>
                </div>
            </div>
            <div className="buttons">
                <Button icon="stat" small={true} onClick={this.handleStatClick} /><br />
                <Button icon="sitemap" small={true} onClick={this.handleStatClick} />
            </div>
        </div>);
    }
}
