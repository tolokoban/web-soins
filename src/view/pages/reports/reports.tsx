import React from "react"
import Tfw from 'tfw'
import PageHeader from '../../../container/page-header'
import Intl from '../../../intl'

import "./reports.css"

const Button = Tfw.View.Button
const _ = Tfw.Intl.make(require("./reports.yaml"))

interface IReportsProps {
    className?: string[]
}
interface IReportsState { }

export default class Reports extends React.Component<IReportsProps, IReportsState> {
    state = {}

    render() {
        const classes = [
            'view-pages-Reports',
            ...Tfw.Converter.StringArray(this.props.className, [])
        ]

        return (<div className={classes.join(' ')}>
            <PageHeader label={Intl.buttonReports()} icon="report" />
        </div>)
    }
}
