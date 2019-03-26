import * as React from "react"
import Input from "./tfw/view/input"
import Button from "./tfw/view/button"

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
        alert(this.username + ", " + this.password);
    }

    handleUsernameChange(value: string) {
        this.username = value;
    }

    handlePasswordChange(value: string) {
        this.password = value;
    }

    render() {
        return (
            <div className="app-login thm-bg0 thm-ele-dialog">
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
