import React from 'react'
import ReactDOM from 'react-dom'
import Login from './Login'
import "./index.css"
import Theme from "./tfw/theme"

ReactDOM.render(<Login />, document.getElementById('LOGIN'));

Theme.register("soin", {
        white: "#fda", black: "#420",
        bg0: "#febb77", bg1: "#fecf9f", bg2: "#fee3c7", bg3: "#fef8ef",
        bgP: "#630", bgS: "#b35900"
    });
Theme.apply("soin");
