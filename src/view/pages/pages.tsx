import React from "react"
import Tfw from 'tfw'
import PagePatients from '../../container/pages/patients'
import PageReports from '../../container/pages/reports'
import PageStats from '../../container/pages/stats'
import PageStruct from '../../container/pages/struct'
import PageWelcome from './welcome'

import "./pages.css"

const Stack = Tfw.Layout.Stack

interface IPagesProps {
    className?: string[]
    page: string
}
interface IPagesState { }

export default class Pages extends React.Component<IPagesProps, IPagesState> {
    state = {}

    render() {
        const classes = [
            'view-Pages',
            ...Tfw.Converter.StringArray(this.props.className, [])
        ]

        return (
            <Stack
                className={classes.join(' ')}
                fullscreen={true}
                value={this.props.page}
            >
                <PageWelcome key="welcome" />
                <PagePatients key="patients" />
                <PageReports key="reports" />
                <PageStats key="stats" />
                <PageStruct key="struct" />
            </Stack>
        )
    }
}
