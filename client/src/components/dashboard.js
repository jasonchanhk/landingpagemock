import React from "react";
import { useState, useEffect } from "react";
import dataService from '../services/dashboard-data-service';
import userDataService from "../services/user-data-service";

const Dashboard = () => {
    
  const [ATP, setATP] = useState([]);
  const [selected, setSelected] = useState([]);
  const [pair, setPair] = useState({});

  useEffect(() => {
    retrieveATP();
  }, [])

  function retrieveATP(){
    dataService.getAll()
    .then( response => {
      console.log(response.data)
      setATP(response.data)
    })
    .catch( e => {
      console.log(e)
    })
  }

  function buildtablebody(){
    return ATP && ATP.map(pair => {
      return (
        <tr>
          <td>{pair.id}</td>
          <td>{pair.pair}</td>
          <td>{pair.bought_volume}</td>
          <td>{pair.bought_amount}</td>
          <td>{pair.date}</td>
          <td>{pair.time}</td>
          <td><button onClick={() => deletePair(pair.id)} className="btn btn-primary">delete</button></td>
          <td><button onClick={() => setSelected(pair)} className="btn btn-primary">select</button></td>
        </tr>
      )
    })
  }
  
  const deletePair = (id) => {
    dataService.deletePair(id)
      .then(response => {
        retrieveATP()
        console.log(response.data)
      })
      .catch(e => {
        console.log(e)
      })
  }

  const handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    setPair(values => ({...values, [name]: value}))
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    dataService.createPair(pair)
       .then(response => {
        retrieveATP()
        console.log(response.data)
       })
       .catch(e => {
         console.log(e)
       })
  }

  const handleUpdateChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    setSelected(values => ({...values, [name]: value}))
  }

  const handleUpdateSubmit = (event) => {
    event.preventDefault()
    dataService.updatePair(selected.id, selected)
       .then(response => {
        retrieveATP()
        console.log(selected)
       })
       .catch(e => {
         console.log(e)
       })
  }

  const logout = () => {
    userDataService.userLogout()
      .then(response => {
        console.log("logout successful...")
      })
      .catch(e => {
        console.log(e)
      })
  }
    return(        
        <div className="container">
            <h1>Dashboard</h1>
            <div className="row">
                <h1>Active Trading Pairs</h1>          
                <div className="col">
                    <table className="table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>pair</th>
                                <th>bought volume</th>
                                <th>bought amount</th>
                                <th>date</th>
                                <th>time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {buildtablebody()}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <h1>Create Record</h1>
                    <form>
                        <input type="text" className="form-control" id="text" required name="pair" placeholder="pair" onChange={handleInputChange}/><br/>
                        <input type="text" className="form-control" id="text" required name="bought_volume" placeholder="bought volume" onChange={handleInputChange}/><br/>
                        <input type="text" className="form-control" id="text" required name="bought_amount" placeholder="bought amount" onChange={handleInputChange}/><br/>
                        <input type="text" className="form-control" id="text" required name="date" placeholder="date" onChange={handleInputChange}/><br/>
                        <input type="text" className="form-control" id="text" required name="time" placeholder="time" onChange={handleInputChange}/><br/>
                        <button onClick={handleSubmit} className="btn btn-primary">Submit</button>
                    </form>            
                </div>
                <div className="col-6">
                    <h1>Update Record</h1>
                    <form>
                      <input type="text" className="form-control" id="text" required name="pair" value={selected.pair} onChange={handleUpdateChange}/><br/>
                      <input type="text" className="form-control" id="text" required name="bought_volume" value={selected.bought_volume} onChange={handleUpdateChange}/><br/>
                      <input type="text" className="form-control" id="text" required name="bought_amount" value={selected.bought_amount} onChange={handleUpdateChange}/><br/>
                      <input type="text" className="form-control" id="text" required name="date" value={selected.date} onChange={handleUpdateChange}/><br/>
                      <input type="text" className="form-control" id="text" required name="time" value={selected.time} onChange={handleUpdateChange}/><br/>
                      <button onClick={handleUpdateSubmit} className="btn btn-primary">Submit</button>
                    </form>            
                </div>
            </div>
            <div><button onClick={logout} className="btn btn-primary">Logout</button></div>
        </div>
    )    
}

export default Dashboard;