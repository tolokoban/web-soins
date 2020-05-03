import React from "react"
import Tfw from 'tfw'

import "./section.css"

const Icon = Tfw.View.Icon
const Touchable = Tfw.View.Touchable
const Storage = new Tfw.Storage.PrefixedLocalStorage('web-soins/view/section')

interface ISectionProps {
    className?: string[]
    label: string
    // If defined string, expanded state will be stored in local storage
    // with this key.
    storage?: string
    children: JSX.Element
}
interface ISectionState {
    expanded: boolean
}

export default class Section extends React.Component<ISectionProps, ISectionState> {
    state = {
        expanded: this.props.storage ? Storage.get(this.props.storage, "true") : true
    }

    handleClick = () => {
        const expanded = !this.state.expanded
        const { storage } = this.props
        if (storage) {
            Storage.set(storage, expanded)
        }
        this.setState({ expanded })
    }

    render() {
        const { label, children } = this.props
        const classes = [
            'view-Section', 'thm-bg1',
            ...Tfw.Converter.StringArray(this.props.className, [])
        ]
        const { expanded } = this.state
        if (expanded) classes.push("expanded")

        return (<div className={classes.join(' ')}>
            <Touchable className="header thm-bgPL" onClick={this.handleClick}>
                <Icon content="right" rotate={expanded ? 90 : 0}/>
                <div>{label}</div>
            </Touchable>
            <div className="body">{children}</div>
        </div>)
    }
}
