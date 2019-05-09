import React from 'react'
import ReactDOM from 'react-dom'
import Login from './Login'
import "./tfw/font/josefin.css"
import "./index.css"
import Theme from "./tfw/theme"
import WebService from "./tfw/web-service"

console.info("location.hostname=", location.hostname);
WebService.setRoot("https://web-soins.com/");

ReactDOM.render(
    <Login />,
    document.getElementById('LOGIN'));

Theme.register("soin", {
    white: "#fda", black: "#420",
    bg0: "#ffcb97", bg1: "#ffdab3", bg2: "#ffe6cc", bg3: "#fff3e6",
    bgP: "#742", bgPL: "#953", bgPD: "#531",
    bgS: "#ff9f30", bgSD: "#ff7f00", bgSL: "#ffbf60"
});
Theme.apply("soin");
