import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import "./index.css"
import Theme from "./tfw/theme"

ReactDOM.render(<App />, document.getElementById('LOGIN'));

Theme.register("soin", {
        white: "#fda", black: "#420",
        bg0: "#fee7c1", bg1: "#feedd0", bg2: "#fef2e0", bg3: "#fef8ef",
        bgP: "#961", bgS: "#ffa100"
    });
Theme.apply("soin");
