import React from "react"
import State from "../../../state"
import PageHeader from "../../../view/page-header"
import Intl from "../../../intl"

import "./stats.css"

export default function Stats() {
    const carecenter = State.useSelector(state => state.current.carecenter)
    const organization = State.useSelector(state => state.current.organization)
    if (!carecenter || !organization) return null

    return (
        <div className="view-pages-Stats">
            <PageHeader
                carecenter={carecenter}
                organization={organization}
                label={Intl.buttonStats}
                icon="stat"
            />
        </div>
    )
}
