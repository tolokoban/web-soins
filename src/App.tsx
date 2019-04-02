import * as React from "react"

import * as State from "./state"
import Header from "./container/header";

import "./App.css"

import Intl from "./tfw/intl";
const _ = Intl.make(require("./App.yaml"));

interface IAppProps {
    user: {
        email: string;
        nickname: string;
        hasRole: (role: string) => boolean;
    }
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
