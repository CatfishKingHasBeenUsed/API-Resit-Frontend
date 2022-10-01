import {Component} from "react";
import cookie from "react-cookies";

class UserOnlineApplication extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: cookie.load("username"),
            film_name: ""
        }
    }

    handleLogout() {
        cookie.remove('username');
        window.location.href = '/Login';
    }

    changeFilmName(e) {
        let film_name = e.target.value;
        this.setState({
            film_name: film_name
        });
    }

    handleSubmit() {
        if (this.state.film_name === '' || this.state.film_name === null) {
            alert('Film Name is empty!');
            return;
        }

        const data = {
            username: this.state.username,
            film_name: this.state.film_name
        };

        fetch('http://localhost:5000/applications/create', {
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
                alert("Application submit successfully!");
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
        } else {
            return <>
                <div>
                    <a onClick={this.handleLogout.bind(this)}><b><u>Logout</u></b></a>
                </div>
                <div>
                    <a href="/User">User Functions</a>
                </div>
                <h3>User Online Application</h3>
                <div>
                    <div>
                        <p>Film Name:</p>
                        <input type="text" value={this.state.film_name} onChange={this.changeFilmName.bind(this)}/>
                    </div>
                    <br/>
                    <div>
                        <p>Upload Photo:</p>
                        <input type="file"/>
                    </div>
                    <br/>
                    <div>
                        <button onClick={this.handleSubmit.bind(this)}>Submit</button>
                    </div>
                </div>
            </>;
        }
    }
}

export default UserOnlineApplication;
