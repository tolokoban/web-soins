import React from "react"
import Tfw from 'tfw'

import { IPatient } from '../../types'


import "./patient-consultations.css"

const Button = Tfw.View.Button
const _ = Tfw.Intl.make(require("./patient-consultations.yaml"))

interface IPatientConsultationsProps {
    className?: string[]
    carecenterId: number
    patient: IPatient
    onBackClick(): void
}
interface IPatientConsultationsState {}

export default class PatientConsultations extends React.Component<IPatientConsultationsProps, IPatientConsultationsState> {
    state = {}

    render() {
        const classes = [
            'view-PatientConsultations',
            ...Tfw.Converter.StringArray(this.props.className, [])
        ]

        return (<div className={classes.join(' ')}>
            <Button label={_('ok')} />
        </div>)
    }
}
