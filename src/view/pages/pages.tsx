import React from "react"
import Tfw from 'tfw'

import "./pages.css"

const Button = Tfw.View.Button
const Stack = Tfw.layout.Stack

interface IPagesProps {
    className?: string[]
    page: string
}
interface IPagesState {}

export default class Pages extends React.Component<IPagesProps, IPagesState> {
    state = {}

    render() {
        const classes = [
            'view-Pages',
            ...Tfw.Converter.StringArray(this.props.className, [])
        ]

        return (<Stack className={classes.join(' ')}>
            <Button label={_('ok')} />
        </Stack>)
    }
}
