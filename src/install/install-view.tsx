import React from "react"
import Checkbox from "tololib/view/checkbox"
import Input from "tololib/view/input"
import Intl from "tololib/intl"

const _ = Intl.make(require("./install.yaml"))

import "./install-view.css"

interface IInstallProps {
    prefix: string
    onUpdate: (state: IInstallState) => void
}

type IStateAttributes =
    | "databaseHost"
    | "databaseName"
    | "databaseLogin"
    | "databasePassword"
    | "appAdminLogin"
    | "appAdminPassword"
    | "appAdminPasswordBis"

export interface IInstallState {
    createDatabase: boolean
    databaseHost: string
    databaseName: string
    databaseLogin: string
    databasePassword: string
    appAdminLogin: string
    appAdminPassword: string
    appAdminPasswordBis: string
}

export default class Install extends React.Component<IInstallProps, IInstallState> {
    constructor(props: IInstallProps) {
        super(props)
        this.state = {
            createDatabase: true,
            databaseHost: "localhost",
            databaseName: "",
            databaseLogin: "",
            databasePassword: "",
            appAdminLogin: "admin",
            appAdminPassword: "",
            appAdminPasswordBis: ""
        }
    }

    fire = () => {
        this.props.onUpdate(this.state)
    }

    on(attributeName: keyof IInstallState) {
        return (value: string) => {
            this.setState(
                state => ({
                    ...state,
                    [attributeName]: value
                }),
                this.fire
            )
        }
    }

    handleCreateDatabaseChanged = (createDatabase: boolean) => {
        this.setState({ createDatabase })
    }

    render() {
        const { databaseHost, databaseName, databaseLogin, databasePassword } = this.state
        const { appAdminLogin, appAdminPassword, appAdminPasswordBis } = this.state

        return (
            <div className="Install">
                <fieldset>
                    <legend>{_("database")}</legend>
                    <div className="flex">
                        <Input
                            label={_("host")}
                            value={databaseHost}
                            wide={true}
                            onChange={this.on("databaseHost")}
                        />
                        <Input
                            label={_("name")}
                            value={databaseName}
                            wide={true}
                            onChange={this.on("databaseName")}
                        />
                    </div>
                    <div className="flex">
                        <Input
                            label={_("db-usr")}
                            value={databaseLogin}
                            wide={true}
                            onChange={this.on("databaseLogin")}
                        />
                        <Input
                            label={_("db-pwd")}
                            value={databasePassword}
                            wide={true}
                            onChange={this.on("databasePassword")}
                        />
                    </div>
                </fieldset>
                <Checkbox
                    label="Create database structure"
                    value={this.state.createDatabase}
                    onChange={this.handleCreateDatabaseChanged}
                />
                {!this.state.createDatabase ? null : (
                    <fieldset>
                        <legend>{_("siteadmin")}</legend>
                        <Input
                            label={_("usr")}
                            value={appAdminLogin}
                            wide={true}
                            onChange={this.on("appAdminLogin")}
                        />
                        <div className="flex">
                            <Input
                                label={_("pwd")}
                                value={appAdminPassword}
                                wide={true}
                                type="password"
                                onChange={this.on("appAdminPassword")}
                            />
                            <Input
                                label={_("pwd")}
                                value={appAdminPasswordBis}
                                wide={true}
                                type="password"
                                onChange={this.on("appAdminPasswordBis")}
                            />
                        </div>
                    </fieldset>
                )}
            </div>
        )
    }
}
