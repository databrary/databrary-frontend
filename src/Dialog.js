/**
 * Created by maksim on 5/12/17.
 */
import React, {PureComponent} from "react";
import Button from "react-md/lib/Buttons/Button";
import LoginForm from "./LoginForm";
import Dialog from "react-md/lib/Dialogs";


// const reducers = {
//     // ... your other reducers here ...
//     form: formReducer     // <---- Mounted at 'form'
// };
// const reducer = combineReducers(reducers);
// const store = createStore(reducer);
//                     <Provider store={store}>
//                         <LoginForm /></Provider>
export default class LoginDialog extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {visible: false};
    }

    openDialog = () => {
        this.setState({visible: true});
    };

    closeDialog = () => {
        this.setState({visible: false});
    };

    render() {
        const {visible} = this.state;

        return (
            <Button key="account_circle" className={this.props.className} icon onClick={this.openDialog}>account_circle
                <Dialog
                    id="simpleDialogExample"
                    visible={visible}
                    // title="Login"
                    onHide={this.closeDialog}
                >
                    <LoginForm/>
                </Dialog>
            </Button>
        );
    }
}
