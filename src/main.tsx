import React from 'react'
import ReactDOM from 'react-dom'

import App from "./App";

export default function(user) {
    const root = document.getElementById("root");
    ReactDOM.render(<App user={user} />, root);
}
