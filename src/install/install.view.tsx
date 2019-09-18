import React from "react"
import Button from '../tfw/view/button'
import Input from '../tfw/view/input'
import Intl from '../tfw/intl'

const _ = Intl.make(require("./install.yaml"))


import "./install.view.css"

interface IInstallProps {
    prefix: string,
    onUpdate: (state: IInstallState) => void
}

type IStateAttributes = "databaseHost" | "databaseName"
    | "databaseLogin" | "databasePassword"
    | "appAdminLogin" | "appAdminPassword" | "appAdminPasswordBis"

export interface IInstallState {
    databaseHost: string,
    databaseName: string,
    databaseLogin: string,
    databasePassword: string,
    appAdminLogin: string,
    appAdminPassword: string
    appAdminPasswordBis: string
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
            appAdminPassword: '',
            appAdminPasswordBis: ''
        }
    }

    fire = () => {
        this.props.onUpdate(this.state)
    }

    on(attributeName: IStateAttributes) {
        return (value: string) => {
            const state = { [attributeName]: value }
            this.setState(state, this.fire)
        }
    }

    render() {
        const { databaseHost, databaseName, databaseLogin, databasePassword } = this.state

        return (<div className="Install">
            <fieldset>
                <legend>{_('database')}</legend>
                <Input label={_('host')} value={databaseHost}
                    onChange={this.on('databaseHost')}/>
                <Input label={_('name')} value={databaseName}
                    onChange={this.on('databaseName')}/>
                <br/>
                <Input label={_('db-usr')} value={databaseLogin}/>
                <Input label={_('db-pwd')} value={databasePassword}/>
            </fieldset>
            <fieldset>
                <legend>{_('siteadmin')}</legend>
            </fieldset>
            <hr/>
        </div>)
    }
}
