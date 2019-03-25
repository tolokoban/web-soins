"use strict";

import * as React from "react";
import castBoolean from "../converter/boolean";
import castUnit from "../converter/unit";
import { iconsBook, TIconDefinition } from "../icons";
import "./icon.css";

enum EnumPenColor { B, F, P, PD, PL, S, SD, SL }

interface IIconProps {
    visible?: boolean;
    content?: string | TIconDefinition;
    size?: string | number;
    animate?: boolean;
    flipH?: boolean;
    flipV?: boolean;
    pen0?: EnumPenColor;
    pen1?: EnumPenColor;
    pen2?: EnumPenColor;
    pen3?: EnumPenColor;
    pen4?: EnumPenColor;
    pen5?: EnumPenColor;
    pen6?: EnumPenColor;
    pen7?: EnumPenColor;
    onClick?: () => void;
    onHide?: () => void;
}

export default class Icon extends React.Component<IIconProps, {}> {
    static isValidIconName(name: string): boolean {
        return typeof iconsBook[name] !== 'undefined';
    }

    static getAllIconNames(): string[] {
        return Object.keys(iconsBook).sort();
    }

    private refIcon: any;
    private visible: boolean;
    private timeoutHandle: number;

    constructor(props: IIconProps) {
        super(props);
        this.refIcon = React.createRef();
        this.visible = false;
        this.timeoutHandle = 0;
    }

    triggerVisibleAnimation() {
        const
            elemIcon = this.refIcon.current,
            visible = this.visible;
        if (this.timeoutHandle) {
            window.clearTimeout(this.timeoutHandle);
            this.timeoutHandle = 0;
        }
        requestAnimationFrame(() => {
            if (visible) elemIcon.classList.remove("zero");
            else {
                elemIcon.classList.add("zero");
                const slot = this.props.onHide;
                if (typeof slot === 'function') {
                    this.timeoutHandle = window.setTimeout(slot, 300);
                }
            }
        });
    }

    render() {
        const
            p = this.props,
            visible = castBoolean(p.visible, true),
            animate = castBoolean(p.animate, false),
            flipH = castBoolean(p.flipH, false),
            flipV = castBoolean(p.flipV, false),
            size = castUnit(p.size, "28px"),
            content = castContent(p.content),
            onClick = p.onClick,
            classes = ["tfw-view-icon"];
        const svgContent = createSvgContent(content, p);
        if (!svgContent) return null;

        if (animate) classes.push("animate");
        if (flipH) classes.push("flipH");
        if (flipV) classes.push("flipV");
        if (visible) classes.push("zero");
        if (typeof onClick === 'function') classes.push("active");

        this.visible = visible;
        requestAnimationFrame(() => this.triggerVisibleAnimation());

        return (
            <svg className={classes.join(" ")}
                ref={this.refIcon}
                viewBox="-65 -65 130 130"
                preserveAspectRatio="xMidYMid"
                width={size}
                height={size}
                onClick={onClick}>
                {svgContent}
                <g strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    {createSvgContent(content, p)}
                </g>
            </svg>
        );
    }
}

function createSvgContent(def: TIconDefinition, props: IIconProps): any {
    const
        elementName = def[0],
        { attributes, children } = parseDef(def);

    if (typeof elementName === 'undefined') return <g></g>;

    return React.createElement(
        elementName,
        manageColors(attributes, props),
        children.map(child => createSvgContent(child, props))
    ) as React.ReactSVGElement;
}


function manageColors(attribs: {}, props: IIconProps) {
    // @TODO For special forms of "fill" and "stroke", add classes.
    return attribs;
}

function parseDef([name, arg1, arg2]: TIconDefinition) {
    let attributes: undefined | {},
        children: undefined | any[];

    if (Array.isArray(arg1)) children = arg1;
    else if (typeof arg1 !== 'undefined') attributes = arg1;
    if (Array.isArray(arg2)) children = arg2;
    else if (typeof arg2 !== 'undefined') attributes = arg2;

    if (typeof attributes === 'undefined') attributes = {};
    if (typeof children === 'undefined') children = [];

    return { attributes, children };
}

function castContent(content: string | TIconDefinition = "ok"): TIconDefinition {
    if (Array.isArray(content)) return content;
    return iconsBook[content] || [];
}

/*
// tfw.view.icon
{View SVG
  view.attribs: {
    visible: {boolean true}
    content: {any "" behind: onContentChanged}
    size: {unit 28}
    animate: {boolean false}
    flip-h: {boolean false}
    flip-v: {boolean false}
    pen0: {string 0  behind: onPen0Changed}
    pen1: {string 1  behind: onPen1Changed}
    pen2: {string P  behind: onPen2Changed}
    pen3: {string PD behind: onPen3Changed}
    pen4: {string PL behind: onPen3Changed}
    pen5: {string S  behind: onPen4Changed}
    pen6: {string SD behind: onPen6Changed}
    pen7: {string SL behind: onPen7Changed}
  }

  class: tfw-view-icon
  class.|hide: {Bind visible}
  class.animate: {Bind animate}
  class.flipH: {Bind flip-h}
  class.flipV: {Bind flip-v}
  style.width: {Bind size}
  style.height: {Bind size}
  width: 100%
  height: 100%
  viewBox: "-65 -65 130 130"
  preserveAspectRatio: "xMidYMid meet"
}
*/
