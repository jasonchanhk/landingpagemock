import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import userDataService from "../services/user-data-service";

const Register = () => {

    const [registerData, setRegisterData] = useState([]);
    const navigate = useNavigate()


    const handleRegisterChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        setRegisterData(values => ({...values, [name]: value}))
    }

    async function handleRegisterSubmit(event){
        event.preventDefault()
        let result = await userDataService.userRegister(registerData)
        if (result.error){
            console.log(result.error)
        }
        else(
            console.log(result)
        )
    }

    //OOP grouping of object is needed


    return(
        <div className="container">
            <div className="row justify-content-center">
            <h2>Register</h2>
                <div className="col-6">                    
                    <form>
                        <input type="text" className="form-control" id="text" required name="email" placeholder="Email" onChange={e => handleRegisterChange(e)}/><br/>
                        <input type="text" className="form-control" id="text" required name="password" placeholder="Password" onChange={e => handleRegisterChange(e)}/><br/>
                        <button onClick={handleRegisterSubmit} className="btn btn-primary">Submit</button>
                    </form>  
                    <p><Link to="/login">Back to Login</Link></p> 
                </div>
            </div>
        </div>
        
        
    )    
}

export default Register;