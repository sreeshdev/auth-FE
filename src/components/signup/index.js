import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import "./index.css"

const SignUp = () => {
    const [username, setUsername] = useState("")
    const [password, setpassword] = useState("")
    const [err, setError] = useState(null)
    let history = useHistory();
    const signupUser = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/signup/", { username, password }).then((res) => res.status === 201 ? history.push("/") : setError("Username or password error"))
    }
    return (<div className="main">
        <h4>SignUp</h4>
        <form className="form">
            <input className="inputBox"
                value={username}
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)} />
            <input className="inputBox"
                value={password}
                placeholder="Password"
                onChange={(e) => setpassword(e.target.value)} />
            {err !== null && <h6>{err}</h6>}
            <button className="button" value="SignUp" onClick={(e) => signupUser(e)}>SignUp</button>
            <a href="/">Already an member</a >
        </form>
    </div>);
}

export default SignUp;