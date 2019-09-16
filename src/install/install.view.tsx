import React from "react"
import Button from '../tfw/view/button'
import Input from '../tfw/view/input'
import Intl from '../tfw/intl'

const _ = Intl.make(require("./install.yaml"))


import "./install.view.css"

interface IInstallProps {
    prefix: string
}

export interface IInstallState {
    databaseHost: string,
    databaseName: string,
    databaseLogin: string,
    databasePassword: string,
    appAdminLogin: string,
    appAdminPassword: string
}

export default class Install extends React.Component<IInstallProps, IInstallState> {
    constructor( props: IInstallProps ) {
        super( props );
        this.state = {
            databaseHost: 'localhost',
            databaseName: '',
            databaseLogin: '',
            databasePassword: '',
            appAdminLogin: 'admin',
            appAdminPassword: ''
        }
    }

    render() {
        const { databaseHost } = this.state

        return (<div className="Install">
            <fieldset>
                <legend>{_('database')}</legend>
                <Input label={_('host')} value={databaseHost}/>
            </fieldset>
            <fieldset>
                <legend>{_('siteadmin')}</legend>
            </fieldset>
            <hr/>
        </div>)
    }
}
