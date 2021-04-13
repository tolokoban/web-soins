import * as React from "react"
import "./header.css"

import Icon from "tololib/view/icon";
import Button from "tololib/view/button";

import Intl from "tololib/intl";
const _ = Intl.make(require("./header.yaml"));

interface IHeaderProps {
    nickname: string;
    language: string;
    onLanguageClick: () => void;
    onLogoutClick: () => void;
}

export default class Header extends React.Component<IHeaderProps, {}> {
    render() {
        const { nickname, language, onLanguageClick, onLogoutClick } = this.props;
        return (
            <header className="web-soins-header thm-bgP thm-ele-bar">
                <Button icon={`flag-${language}`}
                    label={nickname}
                    onClick={onLanguageClick}
                    flat={true} />
                <Button icon="logout"
                    label={_('logout')}
                    onClick={onLogoutClick}
                    flat={true} />
            </header>
        );
    }
}
