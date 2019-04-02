import * as React from "react"
import "./combo.css"
import castString from "../converter/string"
import castBoolean from "../converter/boolean"
import castStringArray from "../converter/string-array"
import Icon from "./icon"

interface IComboProps {
    label?: string;
    value?: string;
    items: React.Component[];
    keys?: string[];
    wide?: boolean;
}

export default class Combo extends React.Component<IComboProps, {}> {
    list = React.createRef()
    button = React.createRef()
    listContainer = React.createRef()

    keys = [];

    constructor(props: IComboProps) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleKeydown = this.handleKeydown.bind(this);
    }

    handleKeydown(event: React.KeyboardEvent) {

    }

    handleClick(event: React.MouseEvent) {

    }

    render() {
        const p = this.props;
        const items = p.items;
        const label = castString(p.label, "").trim();
        const wide = castBoolean(p.wide, false);
        const keys = ensureGoodKeys(p.keys, items.length);
        const value = castString(p.value, keys[0]);

        return (
            <div className="tfw-view-combo thm-bg2"
                onKeydown={this.handleKeydown}
                onClick={this.handleClick}>
                {label.length > 0 ? <header className="thm-bgPL">{label}</header> : null}
                <div ref={this.button} className="button">
                    <div ref={this.listContainer} className="list-container">
                        <div ref={this.list} className="tfw-view-combo-list">{
                            items.map((item, index) => {
                                const key = keys[index];
                                const className = `item${key === value ? " selected" : ""}`;
                                <div className={className} key={keys[index]}>{
                                    item
                                }</div>
                            })
                        }</div>
                    </div>
                    <div className="icon">
                        <Icon size="24px" content="down" />
                    </div>
                </div>
            </div>
        );
    }
}


/**
 * KEys must be non empty strings. If a key is not defined, it will take its index (stringified) as value.
 *
 * @param  {string[]} keys
 * @param  {number} minimalLength
 *
 * @return {string[]}
 */
function ensureGoodKeys(keys: string[], minimalLength: number) {
    const goodKeys = castStringArray(p.keys, []);

    while (goodKeys.length < minimalLength) {
        goodKeys.push(`${goodKeys.length}`);
    }
    for (let k = 0; k < goodKeys.length; k++) {
        if (goodKeys[k].trim().length === 0) {
            goodKeys[k] = `${k}`;
        }
    }

    return goodKeys;
}
