import {Component} from "react";

class Register extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            confirm_password: ""
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

    changeConfirmPassword(e) {
        let confirm_password = e.target.value;
        this.setState({
            confirm_password: confirm_password
        });
    }

    handleRegister() {
        if (this.state.username === '' || this.state.username === null ||
            this.state.password === '' || this.state.password === null ||
            this.state.confirm_password === '' || this.state.confirm_password === null) {
            alert('Empty field exist! Please check again.');
            return;
        }

        if (this.state.password !== this.state.confirm_password) {
            alert('Two password are not same! Please check again.');
            return;
        }

        const data = {
            username: this.state.username,
            password: this.state.password
        };

        fetch('http://localhost:5000/users/queryUser?username='+this.state.username, {
            method: 'get',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(result => {
            console.log(result);
            if (result.status === true) {
                alert('User already exists.');
            } else {
                fetch('http://localhost:5000/users/register', {
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
                        alert('User register successfully! You can login now!')
                    } else {
                        alert(result.data);
                    }
                }).catch(error => {
                    console.log(error);
                });
            }
        }).catch(error => {
            console.log(error);
        });
    }

    handleLogin() {
        window.location.href = '/Login';
    }

    render() {
        return <>
            <h3>Register</h3>
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
                    <p>Confirm Password:</p>
                    <input type="text" value={this.state.confirm_password} onChange={this.changeConfirmPassword.bind(this)}/>
                </div>
                <br/>
                <div>
                    <button onClick={this.handleRegister.bind(this)}>Register</button>
                </div>
                <br/>
                <div>
                    Go back to <a onClick={this.handleLogin.bind(this)}><b><u>Login</u></b></a> here
                </div>
            </div>
        </>;
    }

}

export default Register;
