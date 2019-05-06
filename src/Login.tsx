import React from 'react'
import Icon from "./tfw/view/icon"
import Input from "./tfw/view/input"
import Button from "./tfw/view/button"
import Dialog from "./tfw/factory/dialog"
import WebService from "./tfw/web-service"
import Storage from "./tfw/storage"
import { IUser } from "./types"

import "./Login.css"
import Combo from "./tfw/view/combo"

import Intl from "./tfw/intl";
const _ = Intl.make(require("./Login.yaml"));

const AsyncStart = import("./main");

interface ILoginState {
    lang: string;
    email: string;
}

export default class App extends React.Component<{}, ILoginState> {
    private username: string;
    private password: string;

    constructor(props: {}) {
        super(props);
        this.state = Storage.local.get(
            "web-soins/login", { lang: Intl.lang, username: "eric" });

        this.handleLogin = this.handleLogin.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleLanguageChange = this.handleLanguageChange.bind(this);
        this.username = "";
        this.password = "";
        setTimeout(() => {
            this.username = "eric";
            this.password = "cires";
            this.handleLogin();
        }, 500);
    }

    componentDidUpdate() {
        Storage.local.set("web-soins/login", this.state);
    }

    handleLanguageChange(value: string) {
        Intl.lang = value;
        this.setState({ lang: value });
    }

    handleLogin() {
        WebService.login(this.username, this.password)
            .then((user: IUser) => this.start(user))
            .catch(err => this.badLogin(err));
    }

    async start(user: IUser) {
        const elem = document.getElementById("LOGIN");
        if (elem) elem.classList.add("hide");
        const applicationStarter = await AsyncStart;
        applicationStarter.default.start(user);
        document.body.classList.add("start");
        setTimeout(() => {
            const body = document.body;
            const splash1 = document.getElementById("splash1");
            const splash2 = document.getElementById("splash2");
            if (splash1) body.removeChild(splash1);
            if (splash2) body.removeChild(splash2);
        }, 1000);
    }

    badLogin(err: {}) {
        const elem = document.getElementById("LOGIN");
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
                    wide={true}
                    label="Utilisateur"
                    onChange={this.handleUsernameChange}
                    value={this.state.email}
                    size={20}
                    focus={true} />
                <Input
                    wide={true}
                    label="Mot de passe"
                    onChange={this.handlePasswordChange}
                    size={20}
                    type="password" />
                <Combo label="Language"
                    value={this.state.lang}
                    wide={true}
                    onChange={this.handleLanguageChange}>
                    <div key="en" className="login-flex"><Icon content="flag-en" /> English</div>
                    <div key="fr" className="login-flex"><Icon content="flag-fr" /> French</div>
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
