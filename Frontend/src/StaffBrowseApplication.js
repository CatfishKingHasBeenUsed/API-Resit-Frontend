import {Component} from "react";
import cookie from "react-cookies";
import {Table} from "react-bootstrap";

class StaffBrowseApplication extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: cookie.load("username"),
            applications: null,
            condition: "",
            keyword: ""
        }
    }

    handleLogout() {
        cookie.remove('username');
        window.location.href = '/Login';
    }

    changeCondition(e) {
        let condition = e.target.value;
        this.setState({
            condition: condition
        });
    }

    changeKeyword(e) {
        let keyword = e.target.value;
        this.setState({
            keyword: keyword
        });
    }

    handleSearch() {
        if (this.state.condition === '' || this.state.condition === null ||
            this.state.keyword === '' || this.state.keyword === null) {
            alert('Empty field exist! Please check again.');
            return;
        }

        if (this.state.condition === 'username') {
            fetch('http://localhost:5000/applications/queryApplicationsByUsername?username='+this.state.keyword, {
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
        } else if (this.state.condition === 'filmname') {
            fetch('http://localhost:5000/applications/queryApplicationsByFilmName?film_name='+this.state.keyword, {
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
                <h3>Staff Browse Application</h3>
                <br/>
                <div>
                    <div>
                        <p>Condition:</p>
                        <select value={this.state.condition} onChange={this.changeCondition.bind(this)}>
                            <option value ="">Undefined</option>
                            <option value ="username">User Name</option>
                            <option value ="filmname">Film Name</option>
                        </select>
                    </div>
                    <br/>
                    <div>
                        <p>Keyword:</p>
                        <input type="text" value={this.state.keyword} onChange={this.changeKeyword.bind(this)}/>
                    </div>
                    <br/>
                    <div>
                        <button onClick={this.handleSearch.bind(this)}>Search</button>
                    </div>
                </div>
                <br/>
                <div>
                    <Table>
                        <thead>
                        <tr>
                            <th>Application ID</th>
                            <th>User Name</th>
                            <th>Film Name</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Array.from(this.state.applications).map((_, index) => (
                            <tr>
                                <td>{_["id"]}</td>
                                <td>{_["username"]}</td>
                                <td>{_["film_name"]}</td>
                                <td>{_["status"]}</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            </>;
        }
    }

}

export default StaffBrowseApplication;
