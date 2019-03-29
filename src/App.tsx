import * as React from "react"
import * as State from "./state"
import Icon from "./tfw/view/icon";
import Button from "./tfw/view/button";
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
    componentDidMound() {
        State.User.setLanguage(Intl.lang);
    }

    render() {
        const p = this.props,
            user = p.user;
        return (
            <div className="App">
                <header className="thm-bgP thm-ele-bar">
                    <Button icon={"flag-en"}
                        label={user.nickname}
                        flat={true} />
                    <Button icon="logout"
                        label={_('logout')}
                        flat={true} />
                </header>
                <div>
                    Hello world!
                </div>
            </div>);
    }
}
