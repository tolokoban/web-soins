import React from "react"

import WS from '../tfw/web-service'
import Dialog from '../tfw/factory/dialog'
import Install, { IInstallState } from './install.view'


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
        if (installationStatus === 0) return true

        const view = <Install prefix={tablesPrefix} />
        
        const onClose = () => {
            resolve(true)
        }

        const dialog = Dialog.show({
            closeOnEscape: true,
            content: view,
            onClose: onClose
        })
    })
}
