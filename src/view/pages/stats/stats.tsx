import React from "react"
import Tfw from 'tfw'
import PageHeader from '../../../container/page-header'
import Intl from '../../../intl'

import "./stats.css"

const Button = Tfw.View.Button
const _ = Tfw.Intl.make(require("./stats.yaml"))

interface IStatsProps {
    className?: string[]
}
interface IStatsState { }

export default class Stats extends React.Component<IStatsProps, IStatsState> {
    state = {}

    render() {
        const classes = [
            'view-pages-Stats',
            ...Tfw.Converter.StringArray(this.props.className, [])
        ]

        return (<div className={classes.join(' ')}>
            <PageHeader label={Intl.buttonStats()} icon="stat" />
        </div>)
    }
}
