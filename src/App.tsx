import * as React from "react"
import Input from "./tfw/view/input"

interface IAppState {
    username: string,
    password: string
}

export default class App extends React.Component<{}, IAppState> {
    render() {
        return (<Fragment>
            <Input
        </Fragment>);
        }
    }
