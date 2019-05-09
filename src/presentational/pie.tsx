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

const DEFAULT_COLORS = ["#b37036", "#cc7529", "#e67717", "#ff7700", "#765"];

export default class Pie extends React.Component<IPieProps, IPieState> {
    private readonly canvas: React.RefObject<HTMLCanvasElement> = React.createRef();

    componentDidMount() {
        this.paint();
    }

    componentDidUpdate() {
        this.paint();
    }

    paint() {
        if (!this.canvas.current) return;
        const
            canvas: HTMLCanvasElement = this.canvas.current,
            values = this.props.values,
            colors = castArray(this.props.colors, DEFAULT_COLORS),
            size = canvas.width,
            lineWidth = 1,
            radius = Math.floor(size / 2) - 3,
            turn = 2 * Math.PI,
            angleStep = turn / size,
            total = this.props.values.reduce((acc, val) => val + acc),
            ctx = canvas.getContext("2d");
        if (!ctx) return;
        let
            angle = 0,
            angleTarget = 0;

        const lineTo = (ang: number) => ctx.lineTo(radius * Math.sin(ang), -radius * Math.cos(ang));

        ctx.save();
        ctx.clearRect(0, 0, size, size);
        if (total > 0) {
            ctx.translate(size / 2, size / 2);
            ctx.fillStyle = "#000";
            ctx.globalAlpha = 0.5;
            ctx.ellipse(0, 0, size / 2, size / 2, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = "#000";
            ctx.lineWidth = lineWidth;
            for (let i = 0; i < colors.length; i++) {
                const color = colors[i % colors.length];
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.moveTo(0, 0);
                angleTarget = angle + turn * values[i] / total;
                do {
                    lineTo(angle);
                    angle += angleStep;
                } while (angle < angleTarget)
                lineTo(angleTarget);
                angle = angleTarget;
                ctx.closePath();
                ctx.globalAlpha = 1;
                ctx.fill();
                ctx.globalAlpha = 0.2;
                ctx.stroke();
            }
        }
        ctx.restore();
    }

    render() {
        const p = this.props;
        const colors = castArray(p.colors, DEFAULT_COLORS);
        const size = castInteger(p.size, 200);

        return (
            <canvas
                ref={this.canvas}
                width={size} height={size}
                className="presentation-pie">
            </canvas>
        );
    }
}
