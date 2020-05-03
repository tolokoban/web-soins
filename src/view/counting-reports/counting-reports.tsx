import React from "react"
import Tfw from 'tfw'

import "./counting-reports.css"

const Button = Tfw.View.Button
const _ = Tfw.Intl.make(require("./counting-reports.yaml"))

interface ICountingReportsProps {
    className?: string[]
}
interface ICountingReportsState {}

export default class CountingReports extends React.Component<ICountingReportsProps, ICountingReportsState> {
    state = {}

    render() {
        const classes = [
            'view-CountingReports',
            ...Tfw.Converter.StringArray(this.props.className, [])
        ]

        return (<div className={classes.join(' ')}>
            <Button label={_('ok')} />
        </div>)
    }
}
