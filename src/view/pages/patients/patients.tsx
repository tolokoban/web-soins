import React from "react"
import Tfw from 'tfw'
import PageHeader from '../../../container/page-header'
import Intl from '../../../intl'
import { IPatient, ICarecenter } from '../../../types'
import PatientService from '../../../service/patient'
import PatientButton from '../../patient-button'

import PlaceholderImage from './placeholder.jpg'
import "./patients.css"

const _ = Tfw.Intl.make(require("./patients.yaml"))
const List = Tfw.View.List
const Input = Tfw.View.Input
const Stack = Tfw.Layout.Stack

interface IPatientsProps {
    className?: string[]
    carecenter: ICarecenter
}
interface IPatientsState {
    patients: IPatient[]
    filter: string
    page: string
}

export default class Patients extends React.Component<IPatientsProps, IPatientsState> {
    state = {
        patients: [],
        filter: "",
        page: "list"
    }

    async componentDidMount() {
        const patients = await PatientService.list(this.props.carecenter.id)
        this.setState({ patients })
    }

    private handlePatientClick = (patient: IPatient) => {
        console.info("patient=", patient)
    }

    renderPatient = (patient: IPatient) => <PatientButton
        patient={patient}
        onClick={this.handlePatientClick}
    />

    render() {
        const { patients, filter, page } = this.state
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
            <Stack fullscreen={true} value={page}>
                <PageHeader key="list" label={Intl.buttonPatient()} icon="user">
                    <div className="view-pages-Patients-list">
                        <Input
                            wide={true}
                            label={_('filter', filteredPatients.length, patients.length)}
                            value={filter}
                            onChange={filter => this.setState({ filter })} />
                        <List
                            className="patients-list"
                            width="480px"
                            placeholder={PlaceholderImage}
                            itemHeight={48}
                            items={filteredPatients}
                            mapper={this.renderPatient}
                        />
                    </div>
                </PageHeader>
            </Stack>
        </div>)
    }
}
