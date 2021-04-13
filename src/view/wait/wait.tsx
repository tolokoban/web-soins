import React from "react"
import Icon from 'tololib/view/icon'
import Intl from '../../intl'

import "./wait.css"

interface IWaitProps {
    label?: string
}

export default class Wait extends React.Component<IWaitProps, {}> {
    render() {
        return (<div className="webSoins-Wait">
            <Icon content="wait" animate={true} />
            <div>{this.props.label || Intl.loading}</div>
        </div>)
    }
}
