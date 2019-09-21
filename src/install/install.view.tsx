import React from "react"
import Input from '../tfw/view/input'
import Intl from '../tfw/intl'

const _ = Intl.make(require("./install.yaml"))


import "./install.view.css"

interface IInstallProps {
    prefix: string,
    onUpdate: (state: IInstallState) => void
}

type IStateAttributes =
    "databaseHost" | "databaseName" |
    "databaseLogin" | "databasePassword" |
    "appAdminLogin" | "appAdminPassword" | "appAdminPasswordBis"

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
        const { appAdminLogin, appAdminPassword, appAdminPasswordBis } = this.state

        return (<div className="Install">
            <fieldset>
                <legend>{_('database')}</legend>
                <div className='flex'>
                    <Input label={_('host')} value={databaseHost}
                        wide={true}
                        onChange={this.on('databaseHost')}/>
                    <Input label={_('name')} value={databaseName}
                        wide={true}
                        onChange={this.on('databaseName')}/>
                </div>
                <div className='flex'>
                    <Input label={_('db-usr')} value={databaseLogin}
                        wide={true}
                        onChange={this.on('databaseLogin')}/>
                    <Input label={_('db-pwd')} value={databasePassword}
                        wide={true}
                        onChange={this.on('databasePassword')}/>
                </div>
            </fieldset>
            <fieldset>
                <legend>{_('siteadmin')}</legend>
                <Input label={_('usr')} value={appAdminLogin}
                    wide={true}
                    onChange={this.on('appAdminLogin')}/>
                <div className='flex'>
                    <Input label={_('pwd')} value={appAdminPassword}
                        wide={true} type='password'
                        onChange={this.on('appAdminPassword')}/>
                    <Input label={_('pwd')} value={appAdminPasswordBis}
                        wide={true} type='password'
                        onChange={this.on('appAdminPasswordBis')}/>
                </div>
            </fieldset>
        </div>)
    }
}
