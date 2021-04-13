import React from "react"
import Tfw from 'tololib'
import {
    IFilter, IFilterGroup, IFilterTest, IFilterNot, IFilterRange, IFilterAge
} from '../../types'



import "./filter-editor.css"

const Button = Tfw.View.Button
const _ = Tfw.Intl.make(require("./filter-editor.yaml"))

interface IFilterEditorProps {
    className?: string[]
}
interface IFilterEditorState {}

export default class FilterEditor extends React.Component<IFilterEditorProps, IFilterEditorState> {
    state = {}

    render() {
        const classes = [
            'view-FilterEditor',
            ...Tfw.Converter.StringArray(this.props.className, [])
        ]

        return (<div className={classes.join(' ')}>
            <Button label={_('ok')} />
        </div>)
    }
}
