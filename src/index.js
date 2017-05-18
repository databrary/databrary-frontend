import {Provider} from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import App from "./components/App";
import "./scss/index.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import WebFontLoader from "webfontloader";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import {history, store} from "./redux/store";

WebFontLoader.load({
    google: {
        families: ['Roboto:300,400,500,700', 'Material Icons'],
    },
});

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: "#ff5722",
    },
});

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter history={history}>
            <MuiThemeProvider muiTheme={muiTheme}>
                <App />
            </MuiThemeProvider>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);