import React from 'react'
import ReactDOM from 'react-dom'
import Input from "./tfw/view/input"
import Button from "./tfw/view/button"
import * as Dialog from "./tfw/factory/dialog"
import WebService from "./tfw/web-service"

import Intl from "./tfw/intl";
const _ = Intl.make(require("./Login.yaml"));

const AsyncStart = import("./main");

interface IAppState {
    username: string;
    password: string;
    focus: number;
}

export default class App extends React.Component<{}, {}> {
    private username: string;
    private password: string;

    constructor(props: {}) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.username = "";
        this.password = "";
    }

    handleLogin() {
        document.getElementById("LOGIN").classList.add("hide");
        WebService.login(this.username, this.password)
            .then(user => this.start(user), err => this.badLogin(err));
    }

    async start(user) {
        const applicationStarter = await AsyncStart;
        applicationStarter.default(user);
        document.body.classList.add("start");
        setTimeout(() => {
            const body = document.body;
            const splash1 = document.getElementById("splash1");
            const splash2 = document.getElementById("splash2");
            body.removeChild(splash1);
            body.removeChild(splash2);
        }, 1000);
    }

    badLogin(err) {
        document.getElementById("LOGIN").classList.remove("hide");
        console.log("err:", err);
        Dialog.alert(_('bad-login', this.username));
    }

    handleUsernameChange(value: string) {
        this.username = value;
    }

    handlePasswordChange(value: string) {
        this.password = value;
    }

    render() {
        return (
            <div className="app-login thm-bg0 thm-ele-dialog" >
                <Input
                    label="Utilisateur"
                    onChange={this.handleUsernameChange}
                    size={20}
                    focus={true} />
                <Input
                    label="Mot de passe"
                    onChange={this.handlePasswordChange}
                    size={20}
                    type="password" />
                <Button
                    label="Connexion"
                    onClick={this.handleLogin}
                    icon="user"
                    flat={true} />
            </div>
        );
    }
}
