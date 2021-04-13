import React from "react"
import SaveAs from "save-as"
import InputFile from "tololib/view/input-file"
import State from "../state"
import { IFilter } from "../types"
import FormFieldView from "../view/form-field"
import ConsultationQuery from "../view/consultation-query"
import { IStructure, IFormField, ITypes } from "../types"
import QueryService from "../service/query"
import Dialog from "tololib/factory/dialog"
import Translate from "../intl"

import "./report-view.css"

interface IReportViewProps {
    carecenter: number
    onFilesChange: (files: FileList) => void
}

interface IReportViewState {
    forms: { [key: string]: IFormField }
    types: ITypes
}

export default class ReportView extends React.Component<
    IReportViewProps,
    IReportViewState
> {
    constructor(props: IReportViewProps) {
        super(props)
        this.state = { forms: {}, types: {} }
    }

    componentDidMount() {
        const { carecenter } = this.props
        const state = State.store.getState()
        const structure = state.structures.find((s: IStructure) => s.id === carecenter)
        if (!structure) return
        this.setState({
            forms: structure.forms,
            types: structure.types
        })
    }

    handleFilesChange = (files: FileList) => {
        this.props.onFilesChange(files)
    }

    private async queryConsultations(filter: IFilter, minDate: number, maxDate: number) {
        const ids = await QueryService.getConsultationIds({
            filter,
            minDate,
            maxDate
        })
        const result = await QueryService.getConsultationsFields(ids)
        const header = `"Patient","Consultation Date ",${result.fields
            .map(f => `"${f}"`)
            .join(",")}`
        const body = Object.keys(result.patients)
            .map(patientKey =>
                result.patients[patientKey]
                    .map(tail =>
                        removeSquareBrakets(
                            JSON.stringify([
                                patientKey,
                                convertToDate(tail[0]),
                                ...tail.slice(1)
                            ])
                        )
                    )
                    .join("\n")
            )
            .join("\n")
        return `${header}\n${body}`
    }

    private handleQueryClick = async (
        filter: IFilter,
        minDate: number,
        maxDate: number
    ) => {
        console.info("filter=", filter)
        console.info("minDate=", minDate)
        console.info("maxDate=", maxDate)
        const csvContent = await Dialog.wait(
            Translate.queryInProgress,
            this.queryConsultations(filter, minDate, maxDate)
        )
        const file = new Blob([csvContent], { type: "text/csv;charset=utf-8" })
        SaveAs(
            file,
            `consultations.${convertToDate(minDate / 1000)}.${convertToDate(
                maxDate / 1000
            )}.csv`
        )
    }

    render() {
        const { forms, types } = this.state

        return (
            <div className="report-ReportView">
                <div>
                    <InputFile
                        wide={true}
                        icon="table"
                        label="Load report template from disk (*.fods)"
                        accept="fods"
                        multiple={true}
                        onClick={this.handleFilesChange}
                    />
                    <p
                        dangerouslySetInnerHTML={{
                            __html: Translate.hintReportTemplates
                        }}
                    ></p>
                    <ul>
                        <li>
                            <code>{"{{newPatients [Y,1,1] [Y,4,1]}}"}</code>:{" "}
                        </li>
                        <li>
                            <code>
                                {"{{newPatients [Y,1,1] [Y,4,1] filter:[GENDER #F]}}"}
                            </code>
                            :{" "}
                        </li>
                        <li>
                            <code>
                                {"{{newPatients [Y,1,1] [Y,4,1] filter:[age 18 40]}}"}
                            </code>
                            :{" "}
                        </li>
                        <li>
                            <code>{"{{visits [Y,1,1] [Y,4,1]}}</code>"}</code>:{" "}
                        </li>
                        <li>
                            <code>
                                {
                                    "{{visits [Y,1,1] [Y,4,1] filter:{MOTIF-CONSULTATION: #GENITAL-LEAK}}}"
                                }
                            </code>
                            :{" "}
                        </li>
                        <li>
                            <code>{"{{visits [Y,1,1] [Y,4,1] group:day}}"}</code>:{" "}
                        </li>
                    </ul>
                    <hr />
                    <ConsultationQuery onQueryClick={this.handleQueryClick} />
                </div>
                <div>
                    {Object.values(forms).map((field: IFormField) => (
                        <FormFieldView key={field.id} types={types} field={field} />
                    ))}
                </div>
            </div>
        )
    }
}

function removeSquareBrakets(text: string): string {
    return text.substr(1, text.length - 2)
}

function convertToDate(secondsSinceEpoch: number): string {
    const date = new Date(secondsSinceEpoch * 1000)
    const yy = date.getFullYear()
    let mm = `${date.getMonth() + 1}`
    let dd = `${date.getDate()}`
    while (mm.length < 2) mm = `0${mm}`
    while (dd.length < 2) dd = `0${dd}`

    return `${yy}-${mm}-${dd}`
}
