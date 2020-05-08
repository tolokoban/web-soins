import React from "react"
import Tfw from 'tfw'

import "./info.css"

interface IInfoProps {
    className?: string
    label: string
    children: JSX.Element | string
}
interface IInfoState { }

export default class Info extends React.Component<IInfoProps, IInfoState> {
    state = {}

    render() {
        const { children } = this.props
        if (!children) return null
        if (typeof children === 'string' && children.trim().length === 0) return null

        const classes = [
            'view-Info',
            Tfw.Converter.String(this.props.className, "")
        ]

        return (<div className={classes.join(' ')}>
            <div className="label">{this.props.label}</div>
            <div>{children}</div>
        </div>)
    }
}
