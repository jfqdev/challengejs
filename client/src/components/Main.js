import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import OpList from "./OpList";
import './styles/main.css'
import {Navbar,Button,Form} from "react-bootstrap"
import { Link, Redirect} from "react-router-dom";

const Main = ({ setAuth }) => {
  const [balance, setBalance] = useState(0);
  const [lastOp,setLastOp] = useState([]);
  const [userName,setUserName] = useState('');

  // Helper to get balance from server and set balance's state.
  const getBalance = async () => {
    try {
      const res = await fetch("http://localhost:3001/operation/balance", {
        method: "GET",
        headers: { jwtToken: localStorage.token }
      });

      const parseBalance = await res.json();
      setBalance(parseBalance.sum);
    } catch (err) {
      console.error(err.message);
    }
  };

  // Helper to get Last 10 operation and set lastOp state

    const getLastOp = async()=> {
      try{
        const res = await fetch("http://localhost:3001/operation/last10",{
          method: "GET",
          headers: {jwtToken: localStorage.token}
        });
        const parseLastOp = await res.json();

        setLastOp(parseLastOp);
        
      }catch(err){
        console.error(err.message)
      }
    }

  //Get User name
    const getName = async()=>{

      try{
        const res = await fetch("http://localhost:3001/information/credentials",{
          method: "GET",
          headers: {jwtToken: localStorage.token}
        });
        const parseUserName = await res.json();
        
        setUserName(parseUserName.nombre);
     
      }catch(err){
        console.error(err.message)
      }

    }

  // Getting balance and last 10 operations only after first component mount.
  useEffect(() => {
    getBalance();
    getLastOp();
    getName();
  }, []);

  const logout = async e => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };
  
  return (
    <div>
      <Navbar>
        <Navbar.Brand>Balance: ${balance} </Navbar.Brand>        
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Form>
            <Form.Label className="mr-sm-2" >Hola {userName}</Form.Label>
            <Button variant="secondary" onClick= {e=>logout(e)}>Cerrar sesión</Button>
          </Form>
         </Navbar.Collapse>

      </Navbar>
      <Link to="/Admin"><Button variant="primary" size="lg" block>Administrar Operaciones</Button></Link>     
      <OpList filtOp = {lastOp}/>
      

    </div>
  );
};

export default Main;
