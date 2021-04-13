import * as React from "react"
import Button from "tololib/view/button"
import State from "../../state"
import MainPanelView from "../main-panel"
import Pages from "../pages"
import Sidemenu from "tololib/layout/sidemenu"

import "./app-view.css"

export interface SideMenuViewProps {
    className?: string
}

export default function (props: SideMenuViewProps) {
    const nickname = State.useSelector(state => state.user.nickname)
    const page = State.useSelector(state => state.page)
    const carecenters = State.useSelector(state => state.carecenters)
    const organizations = State.useSelector(state => state.organizations)
    const structures = State.useSelector(state => state.structures)

    return (
        <Sidemenu
            head={nickname}
            menu={
                <MainPanelView
                    carecenters={carecenters}
                    organizations={organizations}
                    structures={structures}
                />
            }
            body={<Pages page={page} />}
        />
    )
}