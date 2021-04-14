import React from "react"
import Tfw from "tololib"
import State from "../../state"
import { ICarecenter, IOrganization } from "../../types"

import "./page-header.css"

const Icon = Tfw.View.Icon

interface PageHeaderProps {
    className?: string[]
    organization: IOrganization
    carecenter: ICarecenter
    label: string
    icon?: string
    children?: JSX.Element | JSX.Element[]
}

export default function PageHeader(props: PageHeaderProps) {
    const { label, icon, children } = props
    const organization = State.useSelector(state => state.current.organization)
    const carecenter = State.useSelector(state => state.current.carecenter)
    if (!organization || !carecenter) return null

    return (
        <div className={getClassName(props)}>
            <header className="thm-bgPD">
                <div className="thm-bgPL">
                    {icon && <Icon content={icon} />}
                    <div className="label">{label}</div>
                </div>
                <div>
                    {organization.name} / {carecenter.name}
                </div>
            </header>
            <section>{children}</section>
        </div>
    )
}

function getClassName(props: PageHeaderProps) {
    const classes = ["view-PageHeader", "thm-bg0", "thm-ele-nav"]
    if (typeof props.className === "string") {
        classes.push(props.className)
    }
    return classes.join(" ")
}
