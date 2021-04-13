import React from "react"

import WS from 'tololib/web-service'
import Button from 'tololib/view/button'
import Dialog from 'tololib/factory/dialog'
import Install, { IInstallState } from './install-view'
import Intl from 'tololib/intl'

const _ = Intl.make(require("./install.yaml"))


export default { check }

/**
 * Check if the Database has been correctly installed.
 */
async function check(tablesPrefix: string): Promise<boolean> {
    return new Promise(async (resolve) => {
        //  First step:
        //  -----------
        //  Call tfw.Install( tablesPrefix ).
        //  If the result is 0, everything is already installed.
        //  Otherwise, the result will be -9.

        const installationStatus = await WS.exec("tfw.Install", tablesPrefix)
        if (installationStatus === 0) {
            resolve(true)
            return
        }

        let installState: IInstallState = {
            createDatabase: true,
            databaseHost: 'localhost',
            databaseName: '',
            databaseLogin: '',
            databasePassword: '',
            appAdminLogin: 'admin',
            appAdminPassword: '',
            appAdminPasswordBis: ''
        }

        const onClose = async () => {
            const databaseConnectionStatus = await WS.exec("tfw.Install", {
                createDatabase: installState.createDatabase,
                prefix: tablesPrefix,
                host: installState.databaseHost,
                name: installState.databaseName,
                dbUsr: installState.databaseLogin,
                dbPwd: installState.databasePassword,
                usr: installState.appAdminLogin,
                pwd: installState.appAdminPassword
            })
            console.info("databaseConnectionStatus=", databaseConnectionStatus);
            switch( databaseConnectionStatus ) {
                case 0:
                    resolve(true)
                    dialog.hide()
                    return
                case -1: return Dialog.alert("Missing mandatory argument!")
                case -2: return Dialog.alert("Unknown host!")
                case -3: return Dialog.alert("Database not found!")
                case -4: return Dialog.alert("Invalid user name or password!")
                case -5: return Dialog.alert("Missing 'pri/install.sql' file!")
                case -6: return Dialog.alert("Database is not empty!")
                default: return Dialog.alert(`Unknown error: ${databaseConnectionStatus}!`)
            }
        }

        const view = <Install prefix={tablesPrefix}
                onUpdate={(state: IInstallState) => installState = state}/>

        const dialog = Dialog.show({
            closeOnEscape: false,
            content: view,
            footer: <Button label={_("ok")} wide={true} onClick={onClose}/>
        })
    })
}
