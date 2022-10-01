import {Component} from "react";
import cookie from "react-cookies";
import {Table} from "react-bootstrap";

class UserInquireApplication extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: cookie.load("username"),
            applications: null
        }
    }

    handleLogout() {
        cookie.remove('username');
        window.location.href = '/Login';
    }

    handleClick(id) {
        fetch('http://localhost:5000/applications/queryApplicationsStatusById?application_id='+id, {
            method: 'get',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(result => {
            if (result.status === true) {
                alert("Current status is " + result.data[0]['status']);
            } else {
                alert("Some error happen!");
            }
        }).catch(error => {
            console.log(error);
        });
    }

    getData() {
        fetch('http://localhost:5000/applications/queryApplicationsByUsername?username='+this.state.username, {
            method: 'get',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(result => {
            if (result.status === true) {
                this.setState({
                    applications: result.data
                });
            } else {
                alert("Some error happen!");
            }
        }).catch(error => {
            console.log(error);
        });
    }

    componentWillMount() {
        this.getData();
    }

    render() {
        if (this.state.username === '' || this.state.username === null || this.state.username === undefined) {
            return <>
                <h3>Please login first!</h3>
            </>;
        } else if (this.state.applications === null) {
            return <>
                <h3>Please wait...</h3>
            </>;
        } else {
            return <>
                <div>
                    <a onClick={this.handleLogout.bind(this)}><b><u>Logout</u></b></a>
                </div>
                <div>
                    <a href="/User">User Functions</a>
                </div>
                <h3>User Inquire Application</h3>
                <div>
                    <Table>
                        <thead>
                        <tr>
                            <th>Application ID</th>
                            <th>Film Name</th>
                            <th>Operation</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Array.from(this.state.applications).map((_, index) => (
                            <tr>
                                <td>{_["id"]}</td>
                                <td>{_["film_name"]}</td>
                                <td><button onClick={() => this.handleClick(_["id"])}>Inquire</button></td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            </>;
        }
    }
}

export default UserInquireApplication;
