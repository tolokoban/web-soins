import React from "react"
import Tfw from "tololib"
import PageHeader from "../../page-header"
import Section from "../../section"
import Intl from "../../../intl"
import CountingReports from "../../counting-reports"
import ConsultationQuery from "../../consultation-query"
import State from "../../../state"

import "./reports.css"

const _ = Tfw.Intl.make(require("./reports.yaml"))

interface ReportsProps {
    className?: string[]
}

export default function Reports(props: ReportsProps) {
    const carecenter = State.useSelector(state => state.current.carecenter)
    if (!carecenter) return null

    const organization = State.useSelector(state => state.current.organization)
    if (!organization) return null

    const classes = ["view-pages-Reports"]
    if (typeof props.className === "string") classes.push(props.className)

    return (
        <div className={classes.join(" ")}>
            <PageHeader
                label={Intl.buttonReports}
                icon="report"
                carecenter={carecenter}
                organization={organization}
            >
                <Section label={Intl.countingReports} storage="counting-reports">
                    <CountingReports />
                </Section>
                <Section label={Intl.extractions} storage="extractions">
                    <ConsultationQuery onQueryClick={() => {}} />
                </Section>
            </PageHeader>
        </div>
    )
}
