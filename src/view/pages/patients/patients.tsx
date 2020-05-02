import React from "react"
import Tfw from 'tfw'
import PageHeader from '../../../container/page-header'
import Intl from '../../../intl'
import { IPatient, ICarecenter } from '../../../types'
import PatientService from '../../../service/patient'
import "./patients.css"

const _ = Tfw.Intl.make(require("./patients.yaml"))

interface IPatientsProps {
    className?: string[]
    carecenter: ICarecenter
}
interface IPatientsState {
    patients: IPatient[]
}

export default class Patients extends React.Component<IPatientsProps, IPatientsState> {
    state = {
        patients: []
    }

    async componentDidMount() {
        const patients = await PatientService.list(this.props.carecenter.id)
        console.info("patients=", patients)
    }

    render() {
        const classes = [
            'view-pages-Patients',
            ...Tfw.Converter.StringArray(this.props.className, [])
        ]

        return (<div className={classes.join(' ')}>
            <PageHeader label={Intl.buttonPatient()} icon="user" />
        </div>)
    }
}
