import React from "react"
import ReactDOM from "react-dom"
import Login from "./Login"
import "tololib/font/josefin.css"
import "./index.css"
import Theme from "tololib/theme"
import WebService from "tololib/web-service"
import Install from "./install"

console.info("location.hostname=", location.hostname)
if (location.hostname !== "localhost") {
    console.log("Data are on https://web-soins.com/")
    WebService.setRoot("https://web-soins.com/")
}

Theme.register("soin", {
    colorW: "#fda",
    colorB: "#420",
    color0: "#ffcb97",
    color1: "#ffdab3",
    color2: "#ffe6cc",
    color3: "#fff3e6",
    colorP: "#742",
    colorPL: "#953",
    colorPD: "#531",
    colorS: "#ff9f30",
    colorSD: "#ff7f00",
    colorSL: "#ffbf60"
})
Theme.apply("soin")

async function start() {
    try {
        const isInstallationOK = await Install.check("soin")
        console.info("isInstallationOK=", isInstallationOK)
        if (!isInstallationOK) {
            window.location.reload()
        }

        console.log("Render <Login/>...")
        ReactDOM.render(<Login />, document.getElementById("LOGIN"))
    } catch (ex) {
        console.error(ex)
    }
}

start()
