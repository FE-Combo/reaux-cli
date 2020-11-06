import React from "react"
import ReactDOM from "react-dom";

const Index = () => {
    return <div>reaux</div>
}

const rootElement: HTMLDivElement = document.createElement("div");
rootElement.id = "framework-app-root";
document.body.appendChild(rootElement);
ReactDOM.render(<Index />, rootElement);
