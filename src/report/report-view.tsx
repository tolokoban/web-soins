import React from "react"
import InputFile from '../tfw/view/input-file'
import State from '../state'
import { IStructure, IFormField } from '../types'

import "./report-view.css"

interface IReportViewProps {
    carecenter: number,
    onFilesChange: (files: FileList) => void
}

interface IReportViewState {
    forms: { [key: string]: IFormField }
}

export default class ReportView extends React.Component<IReportViewProps, {}> {
    constructor( props: IReportViewProps ) {
        super( props );
        this.state = { forms: {} }
    }

    componentDidMount() {
        const { carecenter } = this.props
        const state = State.store.getState()
        const structure = state.structures.find((s: IStructure) => s.id === carecenter);
        if (!structure) return

    }

    handleFilesChange = (files: FileList) => {
        this.props.onFilesChange(files)
    }

    render() {
        return (<div className="report-ReportView">
            <InputFile
                wide={true}
                icon="table"
                label="Load report template from disk (*.fods)"
                accept="fods"
                multiple={true}
                onClick={this.handleFilesChange}/>
            <p>
                Report templates are spreadsheet saved as
                <b>Flat XML Spreadsheet</b> with placeholders like the following ones:
            </p>
            <ul>
                <li><code>{'{{newPatients [Y,1,1] [Y,4,1]}}'}</code>: </li>
                <li><code>{'{{newPatients [Y,1,1] [Y,4,1] filter:[GENDER #F]}}'}</code>: </li>
                <li><code>{'{{newPatients [Y,1,1] [Y,4,1] filter:[age 18 40]}}'}</code>: </li>
                <li><code>{'{{visits [Y,1,1] [Y,4,1]}}</code>'}</code>: </li>
                <li><code>{'{{visits [Y,1,1] [Y,4,1] filter:{MOTIF-CONSULTATION: #GENITAL-LEAK}}}'}</code>: </li>
                <li><code>{'{{visits [Y,1,1] [Y,4,1] group:day}}'}</code>: </li>
            </ul>
        </div>)
    }
}
