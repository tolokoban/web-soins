import React from "react"
import Tfw from 'tfw'
import PageHeader from '../../../container/page-header'
import I from '../../../intl'
import { IPatient, ICarecenter } from '../../../types'
import PatientService, { IConsultation as IConsultationHeader } from '../../../service/patient'
import ConsultationService, { IConsultation } from '../../../service/consultation'
import PatientButton from '../../patient-button'
import Info from '../../info'

import PlaceholderImage from './placeholder.jpg'
import "./patients.css"

const Button = Tfw.View.Button
const Input = Tfw.View.Input
const List = Tfw.View.List

interface IPatientsProps {
    className?: string[]
    carecenter: ICarecenter
}
interface IPatientsState {
    patients: IPatient[]
    filter: string
    page: string
    patient?: IPatient
    consultations: IConsultationHeader[]
}

export default class Patients extends React.Component<IPatientsProps, IPatientsState> {
    state: IPatientsState = {
        patients: [],
        filter: "",
        page: "list",
        consultations: []
    }

    async componentDidMount() {
        const patients = await PatientService.list(this.props.carecenter.id)
        this.setState({ patients })
    }

    private handlePatientClick = async (patient: IPatient) => {
        this.setState({ patient, consultations: [] })
        const consultations = await PatientService.consultations(patient.id)
        this.setState({ consultations })
    }

    private async showConsultation(consultation: IConsultationHeader) {
        await ConsultationService.get(consultation.id)
    }

    renderPatient = (patient: IPatient) => <PatientButton
        patient={patient}
        onClick={this.handlePatientClick}
    />

    render() {
        const { patients, patient, filter, consultations } = this.state
        const classes = [
            'view-pages-Patients',
            ...Tfw.Converter.StringArray(this.props.className, [])
        ]
        const filteredPatients = patients
            .filter((patient: IPatient) => {
                const trimedFilter = filter.trim().toLowerCase()
                if (trimedFilter.length === 0) return true
                const name = `${patient.lastName.toLowerCase()} ${patient.firstName.toLowerCase()} ${patient.secondName.toLowerCase()}`
                return name.indexOf(trimedFilter) !== -1
            })

        return (<div className={classes.join(' ')}>
            <PageHeader key="list" label={I.buttonPatient()} icon="user">
                <div className="view-pages-Patients-list">
                    <div className="list">
                        <Input
                            wide={true}
                            label={
                                `${I.filter()} ${
                                    filteredPatients.length
                                } / ${
                                    patients.length
                                }`}
                            value={filter}
                            onChange={filter => this.setState({ filter })} />
                        <List
                            className="patients-list"
                            placeholder={PlaceholderImage}
                            itemHeight={48}
                            items={filteredPatients}
                            mapper={this.renderPatient}
                        />
                    </div>
                    {
                        patient &&
                        <div className="detail thm-bg1">
                            <header className="thm-bgPD">
                                <Info label={I.lastName()}>{patient.lastName}</Info>
                                <Info label={I.firstName()}>{patient.firstName}</Info>
                                <Info label={I.secondName()}>{patient.secondName}</Info>
                                <Info label={I.gender()}>{I.genderValue(patient.sex)}</Info>
                                <Info label={I.size()}>{`${patient.size} cm`}</Info>
                            </header>
                            <section>
                                {
                                    consultations.map(
                                        consultation => (
                                            <Button
                                                key={`consultation-${consultation.date.getTime()}`}
                                                icon="show"
                                                flat={true}
                                                wide={false}
                                                label={consultation.date.toLocaleString()}
                                                onClick={() => this.showConsultation(consultation)}
                                            />
                                        )
                                    )
                                }
                            </section>
                        </div>
                    }
                </div>
            </PageHeader>
        </div>)
    }
}
