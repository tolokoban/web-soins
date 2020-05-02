import React from "react"
import Tfw from 'tfw'

import Logo from "./welcome.svg"

import "./welcome.css"

interface IWelcomeProps {
    className?: string[]
}
interface IWelcomeState {
    loaded: boolean
}

export default class Welcome extends React.Component<IWelcomeProps, IWelcomeState> {
    private refDiv = React.createRef<HTMLDivElement>()

    state = {
        loaded: false
    }

    async componentDidMount() {
        const svg = await Tfw.Util.loadTextFromURL(Logo)
        const div = this.refDiv.current
        if (!div) return
        div.innerHTML = svg
        this.setState({ loaded: true })
    }

    render() {
        const classes = [
            'view-pages-Welcome',
            ...Tfw.Converter.StringArray(this.props.className, [])
        ]
        if (this.state.loaded) classes.push("loaded")

        return <div ref={this.refDiv} className={classes.join(' ')}></div>
    }
}
