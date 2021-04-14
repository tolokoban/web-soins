import React from "react"
import State from "../../../state"
import PageHeader from "../../../view/page-header"
import Intl from "../../../intl"

import "./struct.css"

export default function Struct() {
    const organization = State.useSelector(state => state.current.organization)
    const carecenter = State.useSelector(state => state.current.carecenter)
    if (!organization || !carecenter) return null

    return (
        <div className="view-pages-Struct">
            <PageHeader
                carecenter={carecenter}
                organization={organization}
                label={Intl.buttonStruct}
                icon="sitemap"
            />
        </div>
    )
}
