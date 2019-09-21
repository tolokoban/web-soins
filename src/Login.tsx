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
    password: string;
}

export default class App extends React.Component<{}, ILoginState> {
    constructor(props: {}) {
        super(props);
        this.state = Storage.local.get(
            "web-soins/login", { lang: Intl.lang, email: "eric", password: "" });
    }

    componentDidMount() {
        const password = Storage.session.get("web-soins/password", "")
        if (!password || password.length ===0) return

        if (WebService.isLocalhost()) {
            this.setState(
                { email: "eric", password },
                this.handleLogin
            )
        }
    }

    componentDidUpdate() {
        Storage.local.set("web-soins/login", { lang: this.state.lang, email: this.state.email });
    }

    handleLanguageChange = (value: string) => {
        Intl.lang = value;
        this.setState({ lang: value });
    }

    handleLogin = () => {
        const { email, password } = this.state
        WebService.login(email, password)
            .then((user: IUser) => this.start(user))
            .catch(err => this.badLogin(err));
    }

    handleUsernameChange = (email: string) => {
        this.setState({ email })
    }

    handlePasswordChange = (password: string) => {
        this.setState({ password })
    }

    async start(user: IUser) {
        Storage.session.set("web-soins/password", this.state.password)
        
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
        console.log("err:", err);
        Dialog.alert(_('bad-login', this.state.email));
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
                    focus={true}
                    onChange={this.handlePasswordChange}
                    onEnterPressed={this.handleLogin}
                    value={this.state.password}
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
