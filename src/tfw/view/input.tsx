import * as React from "react";
import "../theme.css";
import "./input.css";


interface IStringSlot {
    (value: string): void;
}

interface IInputProps {
    label?: string;
    value?: string;
    delay?: number;
    size?: number;
    onChange?: IStringSlot
}

export default class Input extends React.Component<IInputProps, {}> {
    private timerId: number;
    readonly input: React.RefObject<HTMLInputElement>;

    constructor(props: IInputProps) {
        super(props);
        this.onFocus = this.onFocus.bind(this);
        this.onBlur = this.onBlur.bind(this);
        this.onChange = this.onChange.bind(this);
        this.timerId = 0;
        this.input = React.createRef();
    }

    onFocus(event: React.FocusEvent<HTMLInputElement>): void {
        const input = this.input ? this.input.current : null;
        if (!input) return;
        if (!input.classList) return;
        input.classList.remove("thm-bg3");
        input.classList.add("thm-bgSL");
        input.setSelectionRange(0, input.value.length);
    }

    onBlur(event: React.FocusEvent<HTMLInputElement>): void {
        const input = this.input ? this.input.current : null;
        if (!input) return;
        if (!input.classList) return;
        input.classList.add("thm-bg3");
        input.classList.remove("thm-bgSL");
    }

    onChange(event: React.ChangeEvent<HTMLInputElement>): void {
        const
            p = this.props,
            slot = p.onChange,
            delay = castInteger(p.delay, 300);

        event.preventDefault();

        if (typeof slot === 'function') {
            if (this.timerId !== 0) window.clearTimeout(this.timerId);
            const value = event.target.value;
            this.timerId = window.setTimeout(() => slot(value), delay);
        }
    }

    componentDidUpdate(oldProps: IInputProps) {
        const
            newProps = this.props,
            input = this.input ? this.input.current : null;

        if (input) input.value = castString(newProps.value);
    }

    render() {
        const
            p = this.props,
            label = castString(p.label),
            value = castString(p.value),
            size = Math.max(1, castInteger(p.size, 8)),
            id = nextId();

        return (<div className="tfw-view-input thm-ele-button" >
            {label ? (<label htmlFor={id} className="thm-bgPD">{label}</label>) : null}
            <input
                ref={this.input}
                className="thm-bg3"
                type="text"
                id={id}
                size={size}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onChange={this.onChange}
                defaultValue={value} />
        </div>);
    }
}

function castInteger(v: any, defaultValue: number = 0): number {
    if (typeof v !== 'number') return defaultValue;
    if (isNaN(v)) return defaultValue;
    return Math.max(0, Math.floor(v));
}

function castString(v: any): string {
    if (typeof v === 'number') return `${v}`;
    if (typeof v !== 'string') return "";
    return v;
}


let globalId = 0;
function nextId() {
    return `tfw-view-input-${globalId++}`;
}
