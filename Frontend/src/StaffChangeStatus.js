import {Component} from "react";
import cookie from "react-cookies";
import {Table} from "react-bootstrap";

class StaffChangeStatus extends Component {

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

    getData() {
        fetch('http://localhost:5000/applications/queryAllApplications', {
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

    handleClick(id, status) {
        fetch('http://localhost:5000/applications/changeStatus?id='+id+'&status='+status, {
            method: 'get',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(result => {
            if (result.status === true) {
                alert("Change application status successfully!");
                this.getData();
            } else {
                alert("Some error happen!");
            }
        }).catch(error => {
            console.log(error);
        });
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
                    <a href="/Staff">Staff Functions</a>
                </div>
                <h3>Staff Change Application Status</h3>
                <br/>
                <div>
                    <Table>
                        <thead>
                        <tr>
                            <th>Application ID</th>
                            <th>User Name</th>
                            <th>Film Name</th>
                            <th>Status</th>
                            <th>Operations</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Array.from(this.state.applications).map((_, index) => (
                            <tr>
                                <td>{_["id"]}</td>
                                <td>{_["username"]}</td>
                                <td>{_["film_name"]}</td>
                                <td>{_["status"]}</td>
                                <td>
                                    <a onClick={() => this.handleClick(_["id"], "new")} style={{color:"blue"}}>new</a>
                                    <span> </span>
                                    <a onClick={() => this.handleClick(_["id"], "pending")} style={{color:"blue"}}>pending</a>
                                    <span> </span>
                                    <a onClick={() => this.handleClick(_["id"], "accepted")} style={{color:"blue"}}>accepted</a>
                                    <span> </span>
                                    <a onClick={() => this.handleClick(_["id"], "rejected")} style={{color:"blue"}}>rejected</a>
                                    <span> </span>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            </>;
        }
    }



}

export default StaffChangeStatus;
