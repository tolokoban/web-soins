import * as React from "react"

import * as State from "./state"
import Header from "./container/header";
import { IUser } from "./types"

import "./App.css"

import Intl from "./tfw/intl";
const _ = Intl.make(require("./App.yaml"));

interface IAppProps {
    user: IUser
}

export default class App extends React.Component<IAppProps, {}> {
    render() {
        return (
            <div className="App" >
                <Header />
                <div>Hello world!</div>
            </div>);
    }
}
