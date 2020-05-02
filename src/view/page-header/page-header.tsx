import React from "react"
import Tfw from 'tfw'

import { ICarecenter, IOrganization } from "../../types"

import "./page-header.css"

const Icon = Tfw.View.Icon

export interface IPageHeaderProps {
    className?: string[]
    organization: IOrganization
    carecenter: ICarecenter
    label: string
    icon?: string
    children: JSX.Element
}
interface IPageHeaderState { }

export default class PageHeader extends React.Component<IPageHeaderProps, IPageHeaderState> {
    state = {}

    render() {
        const { organization, carecenter, label, icon, children } = this.props
        const classes = [
            'view-PageHeader', 'thm-bg0', 'thm-ele-nav',
            ...Tfw.Converter.StringArray(this.props.className, [])
        ]

        return (<div className={classes.join(' ')}>
            <header className="thm-bgPD">
                <div>
                    {icon && <Icon content={icon} />}
                    <div>{label}</div>
                </div>
                <div>{organization.name}</div>
                <div>{carecenter.name}</div>
            </header>
            <section>{children}</section>
        </div>)
    }
}
