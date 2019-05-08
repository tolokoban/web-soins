import * as React from "react"
import castArray from "../tfw/converter/array"
import castInteger from "../tfw/converter/integer"
import "./pie.css"

interface IPieProps {
    values: number[];
    colors?: string[];
    size?: number;
}
interface IPieState { }

const DEFAULT_COLORS = ["#0f0", "#4f4", "#8f8", "#cfc"];

export default class Pie extends React.Component<IPieProps, IPieState> {
    private canvas = React.createRef();

    componentDidMount() {
        this.paint();
    }

    componentDidUpdate() {
        this.paint();
    }

    paint() {
        const canvas = this.canvas.current;
        if (!canvas) return;
        const size = canvas.width;
        const radius = size / 2;
        const ctx = canvas.getContext("2d");
        const total = this.props.values.reduce((acc, val) => val + acc);

        ctx.save();
        ctx.clearRect(0, 0, size, size);
        ctx.translate(radius, radius);

        ctx.restore();
    }

    render() {
        const p = this.props;
        const colors = castArray(p.colors, DEFAULT_COLORS);
        const size = castInteger(p.size, 256);

        return (
            <canvas
                ref={this.canvas}
                width={size} height={size}
                className="presentation-pie">
            </canvas>
        );
    }
}
