import React from "react"
import Icon from '../../tfw/view/icon'
import _ from '../../intl'

import "./wait.css"

interface IWaitProps {
    label?: string
}

export default class Wait extends React.Component<IWaitProps, {}> {
    render() {
        return (<div className="webSoins-Wait">
            <Icon content="wait" animate={true} />
            <div>{this.props.label || _("loading")}</div>
        </div>)
    }
}
