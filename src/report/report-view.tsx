import React from "react"
import InputFile from '../tfw/view/input-file'
import State from '../state'
import { IFilter } from '../types'
import FormFieldView from '../presentational/form-field'
import ConsultationQuery from '../presentational/consultation-query'
import { IStructure, IFormField, ITypes } from '../types'
import QueryService from '../service/query'
import Dialog from '../tfw/factory/dialog'
import _ from "../intl";

import "./report-view.css"

interface IReportViewProps {
    carecenter: number,
    onFilesChange: (files: FileList) => void
}

interface IReportViewState {
    forms: { [key: string]: IFormField },
    types: ITypes
}

export default class ReportView extends React.Component<IReportViewProps, IReportViewState> {
    constructor( props: IReportViewProps ) {
        super( props );
        this.state = { forms: {}, types: {} }
    }

    componentDidMount() {
        const { carecenter } = this.props
        const state = State.store.getState()
        const structure = state.structures.find((s: IStructure) => s.id === carecenter);
        if (!structure) return
        this.setState({
            forms: structure.forms,
            types: structure.types
        })
    }

    handleFilesChange = (files: FileList) => {
        this.props.onFilesChange(files)
    }

    private handleQueryClick = async (filter: IFilter, minDate: number, maxDate: number) => {
        console.info("filter=", filter);
        console.info("minDate=", minDate);
        console.info("maxDate=", maxDate);
        const ids = await Dialog.wait(
            _('query-in-progress'),
            QueryService.getConsultationIds({
                filter, minDate, maxDate
            }))
        console.info("ids=", ids);
    }

    render() {
        const { forms, types } = this.state

        return (<div className="report-ReportView">
            <div>
                <InputFile
                    wide={true}
                    icon="table"
                    label="Load report template from disk (*.fods)"
                    accept="fods"
                    multiple={true}
                    onClick={this.handleFilesChange}/>
                <p dangerouslySetInnerHTML={{
                    __html: _('hint-report-templates')
                }}></p>
                <ul>
                    <li><code>{'{{newPatients [Y,1,1] [Y,4,1]}}'}</code>: </li>
                    <li><code>{'{{newPatients [Y,1,1] [Y,4,1] filter:[GENDER #F]}}'}</code>: </li>
                    <li><code>{'{{newPatients [Y,1,1] [Y,4,1] filter:[age 18 40]}}'}</code>: </li>
                    <li><code>{'{{visits [Y,1,1] [Y,4,1]}}</code>'}</code>: </li>
                    <li><code>{'{{visits [Y,1,1] [Y,4,1] filter:{MOTIF-CONSULTATION: #GENITAL-LEAK}}}'}</code>: </li>
                    <li><code>{'{{visits [Y,1,1] [Y,4,1] group:day}}'}</code>: </li>
                </ul>
                <hr/>
                <ConsultationQuery onQueryClick={this.handleQueryClick} />
            </div>
            <div>{
                Object.values(forms).map((field: IFormField) => (
                    <FormFieldView key={field.id} types={types} field={field}/>
                ))
            }</div>
        </div>)
    }
}
