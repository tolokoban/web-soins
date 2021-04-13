import React from "react"
import Tfw from "tololib"
import PagePatients from "../pages/patients"
import PageReports from "../pages/reports"
import PageStats from "../pages/stats"
import PageStruct from "../pages/struct"
import PageWelcome from "./welcome"
import State from '../../state'
import carecenter from "../../service/carecenter"

import "./pages.css"

const Stack = Tfw.Layout.Stack

interface PagesProps {
    className?: string[]
    page: string
}

export default function Pages(props: PagesProps) {
    const carecenter = State.useSelector(state => state.current.carecenter)
    return (
        <Stack className={getClassName(props)} fullscreen={true} value={props.page}>
            <PageWelcome key="welcome" />
            <PagePatients key="patients" carecenter={carecenter} />
            <PageReports key="reports" />
            <PageStats key="stats" />
            <PageStruct key="struct" />
        </Stack>
    )
}

function getClassName(props: PagesProps) {
    const classes = ["view-Pages"]
    if (typeof props.className === "string") {
        classes.push(props.className)
    }
    return classes.join(" ")
}
