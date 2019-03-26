import * as React from "react"
import Icon from "./icon"
import "./button.css"
import castInteger from "../converter/integer"
import castString from "../converter/string"
import castBoolean from "../converter/boolean"

interface IButtonProps {
    label?: string;
    icon?: string;
    flat?: boolean;
    small?: boolean;
    warning?: boolean;
    enabled?: boolean;
    tag?: any;
    onClick?: (tag: any) => void;
}

export default class Button extends React.Component<IButtonProps, {}> {
    render() {
        const p = this.props,
            label = castString(p.label, ""),
            icon = castString(p.icon, ""),
            flat = castBoolean(p.flat, false),
            small = castBoolean(p.small, false),
            warning = castBoolean(p.flat, false),
            classes = ["tfw-view-button"];
        if (flat) classes.push("flat");
        else classes.push(warning ? "thm-bgS" : "thm-bgP");
        if (small) classes.push("small");
        return (
            <button
                className={classes.join(" ")}
                onClick={p.onClick}>
                {
                    icon.length > 0
                        ? <Icon content={icon} size="28px" />
                        : null
                }
                {
                    label.length > 0
                        ? <div className="text">{label}</div>
                        : null
                }
            </button>);
    }
}
