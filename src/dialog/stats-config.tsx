import * as React from "react"
import { Provider } from 'react-redux'
import State from "../state"
import StatsConfig from "../container/stats-config"
import Dialog from "../tfw/factory/dialog"
import Button from "../tfw/view/button"

import _ from "../intl"

export default {
    show() {
        const dialog = Dialog.show({
            closeOnEscape: true,
            icon: "stat",
            title: _("create-stat"),
            content: (<Provider store={State.store}><StatsConfig /></Provider>),
            footer: [
                <Button
                    key="cancel"
                    label={_("cancel")}
                    flat={true}
                    onClick={() => dialog.hide()} />,
                <Button
                    key="ok"
                    label={_("create-stat")}
                    warning={true}
                    onClick={() => {
                        dialog.hide();
                        State.dispatch(State.addStat());
                    }} />
            ]
        });

    }
}
