import * as React from "react"
import Input from "./tfw/view/input"
import Button from "./tfw/view/button"
import * as Dialog from "./tfw/factory/dialog"
import WebService from "./tfw/web-service"

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
            .then(() => this.start(), err => this.badLogin(err));
    }

    start() {
        alert("OK");
    }

    badLogin(err) {
        document.getElementById("LOGIN").classList.remove("hide");
        console.log("err:", err);
        alert(`Bad: ${err}`);
    }

    handleUsernameChange(value: string) {
        this.username = value;
    }

    handlePasswordChange(value: string) {
        this.password = value;
    }

    render() {
        return (
            <div className= "app-login thm-bg0 thm-ele-dialog" >
            <Input
                    label="Utilisateur"
        onChange = { this.handleUsernameChange }
        size = { 20}
        focus = { true} />
            <Input
                    label="Mot de passe"
        onChange = { this.handlePasswordChange }
        size = { 20}
        type = "password" />
            <Button
                    label="Connexion"
        onClick = { this.handleLogin }
        icon = "user"
        flat = { true} />
            </div>
        );
    }
}
