import * as React from "react"
import { Provider } from 'react-redux'
import State from "../state"
import StatsConfig from "../view/stats-config"
import Dialog from "tololib/factory/dialog"
import Button from "tololib/view/button"

import Translate from "../intl"

export default {
    show() {
        const dialog = Dialog.show({
            closeOnEscape: true,
            icon: "stat",
            title: Translate.createStat,
            content: (
                <Provider store={State.store}>
                    <StatsConfig />
                </Provider>
            ),
            footer: [
                <Button
                    key="cancel"
                    label={Translate.cancel}
                    flat={true}
                    onClick={() => dialog.hide()}
                />,
                <Button
                    key="ok"
                    label={Translate.createStat}
                    color="S"
                    onClick={() => {
                        dialog.hide()
                        State.dispatch(State.addStat())
                    }}
                />
            ]
        })

    }
}
