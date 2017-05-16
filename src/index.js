// import React from "react";
// import ReactDOM from "react-dom";
// import {BrowserRouter as Router, browserHistory} from "react-router-dom";
//
//
// import App from "./App";
// import "./index.css";
import injectTapEventPlugin from "react-tap-event-plugin";
import {Provider} from "react-redux";
//
//
import store from "./redux/store";
import React from "react";
import ReactDOM from "react-dom";
import {browserHistory, BrowserRouter as Router} from "react-router-dom";
import App from "./App";
import "./index.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import WebFontLoader from "webfontloader";
import getMuiTheme from "material-ui/styles/getMuiTheme";
injectTapEventPlugin();

//
//
// import WebFontLoader from "webfontloader";
//
// WebFontLoader.load({
//     google: {
//         families: ['Roboto:300,400,500,700', 'Material Icons'],
//     },
// });
//

//
// ReactDOM.render(
//         <Router>
//             <App />
//         </Router>,
//     document.getElementById('root')
// );

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
        <Router history={browserHistory}>
            <MuiThemeProvider muiTheme={muiTheme}>
                <App />
            </MuiThemeProvider>
        </Router>
    </Provider>,
    document.getElementById('root')
);