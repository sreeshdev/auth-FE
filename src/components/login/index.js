import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import "./index.css"

const LogIn = () => {
    const [username, setUsername] = useState("")
    const [password, setpassword] = useState("")
    const [err, setError] = useState(null)
    const [token, setToken] = useState(null)
    let history = useHistory();
    useEffect(() => {
        if (token === null)
            axios.get("http://localhost:8000/api/token/")
                .then((res) => res.status === 201 ?
                    setToken({ id: res.data.id, token: res.data.token }) :
                    setError("Token Generate error"))
    }, [])

    const loginUser = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/signin/", { username, password, token })
            .then((res) => res.status === 201 ? history.push("/home") : setError(res.data.message))
    }
    return (<div className="main">
        <h4>Login</h4>
        <form className="form">
            <input className="inputBox"
                lable="Username"
                value={username}
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)} />
            <input className="inputBox"
                lable="Password"
                value={password}
                placeholder="Password"
                onChange={(e) => setpassword(e.target.value)} />
            {err !== null && <h6>{err}</h6>}
            <button className="button" value="Login" onClick={(e) => loginUser(e)}>Login</button>
            <a href="/signup">New here?, then Signup</a >

        </form>
    </div>);
}

export default LogIn;