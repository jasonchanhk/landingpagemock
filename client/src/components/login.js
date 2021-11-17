import React, { useState } from "react";
import { Navigate } from "react-router";
import { Link } from "react-router-dom";
import userDataService from "../services/user-data-service";

const Login = () => {

    const [loginData, setLoginData] = useState([]);
    const [notice, setNotice] = useState(null)

    const handleLoginChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        setLoginData(values => ({...values, [name]: value}))
    }

    function handleLoginSubmit(event){
        event.preventDefault();
        userDataService.userLogin(loginData)
        .then( response => {
            if (response.data.error){
                setNotice(response.data.error)
            }
            else{
                <Navigate to="/dashboard" />
            }
        })
    }

    //OOP grouping of object is needed

    return(
        <div className="container">
            <div className="row justify-content-center">
                <h2>Login</h2>
                <div className="col-6">
                {notice ? <div class="alert alert-danger" role="alert">{notice.message}</div> : <div></div> }
                    <form>
                        <input type="text" className="form-control" id="text" required name="email" placeholder="Email" onChange={handleLoginChange}/><br/>
                        <input type="text" className="form-control" id="text" required name="password" placeholder="Password" onChange={handleLoginChange}/><br/>
                        <button onClick={handleLoginSubmit} className="btn btn-primary">Submit</button>
                    </form>
                    <p>New to Blokbot? <Link to="/register">Register for an account</Link></p>   
                </div>
                
            </div>
        </div>
        
        
    )    
}

export default Login;