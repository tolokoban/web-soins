import React from "react"
import Tfw from 'tololib'

import { IPatient } from '../../types'

import "./patient-button.css"

const Touchable = Tfw.View.Touchable
//const _ = Tfw.Intl.make(require("./patient-button.yaml"))

interface IPatientButtonProps {
    className?: string[]
    patient: IPatient
    onClick(patient: IPatient): void
}
interface IPatientButtonState { }

export default class PatientButton extends React.Component<IPatientButtonProps, IPatientButtonState> {
    state = {}

    render() {
        const { patient, onClick } = this.props
        const classes = [
            'view-PatientButton', 'thm-bg2',
            ...Tfw.Converter.StringArray(this.props.className, [])
        ]

        return (<Touchable className={classes.join(' ')} onClick={() => onClick(patient)}>
            <div className="lastName">{patient.lastName}</div>
            <div className="firstName">{patient.firstName}</div>
            <div className="secondName">{patient.secondName}</div>
        </Touchable>)
    }
}
