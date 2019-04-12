import React from 'react'
import ReactDOM from 'react-dom'
import Icon from "./tfw/view/icon"
import Input from "./tfw/view/input"
import Button from "./tfw/view/button"
import * as Dialog from "./tfw/factory/dialog"
import WebService from "./tfw/web-service"

import "./Login.css"
import Combo from "./tfw/view/combo"

import Intl from "./tfw/intl";
const _ = Intl.make(require("./Login.yaml"));

const AsyncStart = import("./main");

interface ILoginState {
    lang: string;
}

export default class App extends React.Component<{}, ILoginState> {
    private username: string;
    private password: string;

    constructor(props: {}) {
        super(props);
        this.state = { lang: Intl.lang };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleLanguageChanged = this.handleLanguageChanged.bind(this);
        this.username = "eric";
        this.password = "cires";
    }

    handleLanguageChanged(value: string) {
        Intl.lang = value;
        this.setState({ lang: value });
    }

    handleLogin() {
        const elem = document.getElementById("LOGIN");
        if (elem) elem.classList.add("hide");
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
            if (splash1) body.removeChild(splash1);
            if (splash2) body.removeChild(splash2);
        }, 1000);
    }

    badLogin(err) {
        const elem = document.getElementById("LOGIN");
        if (elem) elem.classList.add("hide");
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
                <Combo label="Language"
                    value={this.state.lang}
                    onValueChanged={this.handleLanguageChanged}>
                    <div key="en" class="login-flex"><Icon content="flag-en" /> English</div>
                    <div key="fr" class="login-flex"><Icon content="flag-fr" /> French</div>
                    <div key="jp" class="login-flex"><Icon content="flag-jp" /> Japanese</div>
                </Combo>
                <Button
                    label="Connexion"
                    onClick={this.handleLogin}
                    icon="user"
                    flat={true} />
            </div>

        );
    }
}
