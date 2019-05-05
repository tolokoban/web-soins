import * as React from "react"

import { IUser } from "./types"
import Sidemenu from "./container/sidemenu"

import "./App.css"

interface IAppProps {
    user: IUser
}

export default class App extends React.Component<IAppProps, {}> {
    render() {
        return <Sidemenu classes="App" />
    }
}
