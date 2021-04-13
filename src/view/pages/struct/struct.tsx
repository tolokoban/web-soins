import React from "react"
import Tfw from 'tololib'
import PageHeader from '../../../container/page-header'
import Intl from '../../../intl'

import "./struct.css"

const Button = Tfw.View.Button
const _ = Tfw.Intl.make(require("./struct.yaml"))

interface IStructProps {
    className?: string[]
}
interface IStructState {}

export default class Struct extends React.Component<IStructProps, IStructState> {
    state = {}

    render() {
        const classes = [
            'view-pages-Struct',
            ...Tfw.Converter.StringArray(this.props.className, [])
        ]

        return (<div className={classes.join(' ')}>
            <PageHeader label={Intl.buttonStruct()} icon="sitemap" />
        </div>)
    }
}
