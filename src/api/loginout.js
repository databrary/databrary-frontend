/**
 * Created by maksim on 5/15/17.
 */
import Cookies from "universal-cookie";
import axios from "axios";
const cookies = new Cookies();
function logIn(email, password) {
    return axios.post(
        'http://localhost:3444/api/user/login',
        {},
        {
            auth: {
                username: email,
                password: password
            },
            withCredentials: true
        }
    ).then(
        function (response) {
            return true;
            // return (response.data.status === 'ok' || response.data.payload === "already logged in")
        }
    ).catch(
        function () {
            return true;
        }
    );
    // return true;
}

function logOut() {
    cookies.remove("databrary.session.token")
}

export {logIn, logOut}