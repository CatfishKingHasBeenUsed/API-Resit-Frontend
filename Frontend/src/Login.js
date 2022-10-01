import {Component} from "react";
import cookie from "react-cookies";

class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            role: ""
        }
    }

    changeUsername(e) {
        let uname = e.target.value;
        this.setState({
            username: uname
        });
    }

    changePassword(e) {
        let password = e.target.value;
        this.setState({
            password: password
        });
    }

    changeRole(e) {
        let role = e.target.value;
        this.setState({
            role: role
        });
    }

    handleLogin() {
        if (this.state.username === '' || this.state.username === null ||
            this.state.password === '' || this.state.password === null ||
            this.state.role === '' || this.state.role === null) {
            alert('Empty field exist! Please check again.');
            return;
        }

        const data = {
            username: this.state.username,
            password: this.state.password
        };

        if (this.state.role === 'user') {
            fetch('http://localhost:5000/users/login', {
                method: 'post',
                mode: 'cors',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(res => res.json()).then(result => {
                console.log(result);
                if (result.status === true) {
                    cookie.save('username', this.state.username, {path:'/'});
                    window.location.href = '/User';
                } else {
                    alert(result.data);
                }
            }).catch(error => {
                console.log(error);
            });
        } else if (this.state.role === 'staff') {
            fetch('http://localhost:5000/staffs/login', {
                method: 'post',
                mode: 'cors',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(res => res.json()).then(result => {
                console.log(result);
                if (result.status === true) {
                    cookie.save('username', this.state.username, {path:'/'})
                    window.location.href = '/Staff';
                } else {
                    alert(result.data);
                }
            }).catch(error => {
                console.log(error);
            });
        }
    }

    handleRegister() {
        window.location.href = '/Register';
    }

    render() {
        return <>
            <h3>Login</h3>
            <div>
                <div>
                    <p>Username:</p>
                    <input type="text" value={this.state.username} onChange={this.changeUsername.bind(this)}/>
                </div>
                <br/>
                <div>
                    <p>Password:</p>
                    <input type="text" value={this.state.password} onChange={this.changePassword.bind(this)}/>
                </div>
                <br/>
                <div>
                    <p>Role:</p>
                    <select value={this.state.role} onChange={this.changeRole.bind(this)}>
                        <option value ="">Undefined</option>
                        <option value ="user">Customer</option>
                        <option value ="staff">Staff</option>
                    </select>
                </div>
                <br/>
                <div>
                    <button onClick={this.handleLogin.bind(this)}>Login</button>
                </div>
                <br/>
                <div>
                    Have no account? <a onClick={this.handleRegister.bind(this)}><b><u>Register</u></b></a> here
                </div>
            </div>
        </>;
    }

}

export default Login;
