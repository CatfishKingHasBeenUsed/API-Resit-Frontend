import {Component} from "react";
import cookie from "react-cookies";

class Staff extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: cookie.load("username")
        }
    }

    handleLogout() {
        cookie.remove('username');
        window.location.href = '/Login';
    }

    render() {
        if (this.state.username === '' || this.state.username === null || this.state.username === undefined) {
            return <>
                <h3>Please login first!</h3>
            </>;
        } else {
            return <>
                <div>
                    <a onClick={this.handleLogout.bind(this)}><b><u>Logout</u></b></a>
                </div>
                <h3>Staff functions</h3>
                <ul>
                    <li><a href="/StaffBrowseApplication">Browse application</a></li>
                    <li><a href="/StaffChangeStatus">Change application status</a></li>
                </ul>
            </>;
        }
    }


}

export default Staff;
