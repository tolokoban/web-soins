import React from "react"
import Tfw from 'tfw'

import "./extractions.css"

const Button = Tfw.View.Button
const _ = Tfw.Intl.make(require("./extractions.yaml"))

interface IExtractionsProps {
    className?: string[]
}
interface IExtractionsState {}

export default class Extractions extends React.Component<IExtractionsProps, IExtractionsState> {
    state = {}

    render() {
        const classes = [
            'view-Extractions',
            ...Tfw.Converter.StringArray(this.props.className, [])
        ]

        return (<div className={classes.join(' ')}>
            <Button label={_('ok')} />
        </div>)
    }
}
