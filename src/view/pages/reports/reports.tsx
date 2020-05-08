import React from "react"
import Tfw from 'tfw'
import PageHeader from '../../../container/page-header'
import Section from '../../section'
import Intl from '../../../intl'
import CountingReports from '../../counting-reports'
import ConsultationQuery from '../../consultation-query'

import "./reports.css"

const _ = Tfw.Intl.make(require("./reports.yaml"))

interface IReportsProps {
    className?: string[]
}
interface IReportsState {
}

export default class Reports extends React.Component<IReportsProps, IReportsState> {
    state = {}

    private handleQueryClick = () => {

    }

    render() {
        const classes = [
            'view-pages-Reports',
            ...Tfw.Converter.StringArray(this.props.className, [])
        ]

        return (<div className={classes.join(' ')}>
            <PageHeader label={Intl.buttonReports()} icon="report">
                <Section label={Intl.countingReports()} storage="counting-reports">
                    <CountingReports />
                </Section>
                <Section label={Intl.extractions()} storage="extractions">
                    <ConsultationQuery onQueryClick={this.handleQueryClick} />
                </Section>
            </PageHeader>
        </div>)
    }
}
