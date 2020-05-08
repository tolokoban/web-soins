import React from "react"
import Tfw from 'tfw'

import "./section.css"

const Icon = Tfw.View.Icon
const Touchable = Tfw.View.Touchable
const Storage = new Tfw.Storage.PrefixedLocalStorage('web-soins/view/section')
const castString = Tfw.Converter.String
const castBoolean = Tfw.Converter.Boolean

interface ISectionProps {
    className?: string[]
    label: string
    // Default expand value.
    default?: boolean
    // Default to "thm-bg1"
    background?: string
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
        expanded: this.props.storage ?
            Storage.get(this.props.storage, castBoolean(this.props.default, true)) : 
            castBoolean(this.props.default, true)
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
        const { label, children, background } = this.props
        const classes = [
            'view-Section', castString(background, 'thm-bg1'),
            ...Tfw.Converter.StringArray(this.props.className, [])
        ]
        const { expanded } = this.state
        if (expanded) classes.push("expanded")

        return (<div className={classes.join(' ')}>
            <Touchable className="header thm-bgPL thm-ele-button" onClick={this.handleClick}>
                <Icon content="tri-right" rotate={expanded ? 90 : 0}/>
                <div>{label}</div>
            </Touchable>
            <div className="body">{children}</div>
        </div>)
    }
}
