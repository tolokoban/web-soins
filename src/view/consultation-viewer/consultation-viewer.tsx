import React from "react"
import Tfw from 'tololib'
import StructureManager from '../../structure'
import { IStructure, IConsultation } from "../../types"

import "./consultation-viewer.css"

interface IConsultationViewerProps {
    className?: string
    structureData: IStructure,
    consultationData: IConsultation
}
interface IConsultationViewerState { }

export default class ConsultationViewer extends React.Component<IConsultationViewerProps, IConsultationViewerState> {
    state = {}

    render() {
        const classes = [
            'view-ConsultationViewer',
            Tfw.Converter.String(this.props.className, '')
        ]
        const { consultationData, structureData } = this.props
        console.info("consultationData=", consultationData)

        return (<div className={classes.join(' ')}>
            <ul>
                {
                    Object.keys(consultationData.fields).map(
                        key => {
                            const val = consultationData.fields[key]
                            const caption = StructureManager.getFieldCaption(
                                key, structureData
                            )
                            return <li key={`field-${key}`}>
                                <span className="key">{caption}</span>
                                <span>: </span>
                                <span className="val">{val}</span>
                            </li>
                        }
                    )
                }
            </ul>
        </div>)
    }
}
