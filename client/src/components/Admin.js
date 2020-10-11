import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {Navbar,Button,Form,Nav,Table,Row,Col} from "react-bootstrap"
import { Link, Redirect} from "react-router-dom";
import AdminOperations from "./AdminOperations";
import NewOperation from "./NewOperation"



const Admin = ({ setAuth }) => {

    const [caja, setCaja]= useState("ingreso");
    const [categoria, setCategoria] = useState("");
    const [trigger,setTrigger] = useState("");

    const [categoryList,setCategoryList] = useState([]);
    const [catFilterList,setCatFilterList] = useState([]);

    console.log(categoria);

    //Index for caja
    const indexCaja = {
        ingreso: 1,
        egreso: 2
    }

    const outTrigger = (e)=>{
      setTrigger(e)
    }


    //Category  list request from server
    const getCategoryList = async()=>{
        
        try{
          const res = await fetch("http://localhost:3001/information/category", {            
            headers: {
                'Content-Type': 'application/json',
                jwtToken: localStorage.token
            },

          });

          const parseCatList = await res.json();          
          setCategoryList(parseCatList);
          const filter = mapCategory();
          setCatFilterList(filter);
          setTrigger("render");

       
        }catch(err){
          console.error(err.message)
        }
  
      }
    
    //Triggers Category list request
    useEffect(() => {    
        getCategoryList();
      } , [trigger] );

    

    //Helper 
    const mapCategory = ()=>{
      let filter;
      if(caja === 'ingreso'){
        filter = categoryList.filter((cat,idx) => idx < 7);
      } else {
        filter = categoryList.filter((cat,idx) => idx >= 7 );
      }
      return filter      
    }
    //Setting a catFilterList depending on caja value
    useEffect( () => {
      const filter = mapCategory();
      setCatFilterList(filter);
      
    }, [caja])
     
        
    //Logout Helper
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

return(
    <Fragment>
         
       
        <Form.Group as={Row}>
          <Col >
            <Form.Check
              type="radio"
              label="Ingreso"
              value = {'ingreso'}               
              name="formHorizontalRadios"
              id="formHorizontalRadios1"              
              onClick = {(e)=> setCaja(e.target.value)}
              className = "p-2"
            />
            <Form.Check
              type="radio"
              label="Egreso"
              value = {'egreso'}
              name="formHorizontalRadios"
              id="formHorizontalRadios2"
              onClick = {(e)=> setCaja(e.target.value)}
              className = "p-2"
            />
        </Col>
        <Col>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label className = "p-1 m-1">Categorias</Form.Label>
              <Form.Control as="select" defaultValue="" onChange={(e)=>setCategoria(e.target.value)}>
                <option value={""}>Todas</option>
                {catFilterList.map((cat)=>(

                  <option value={cat.catid}>{cat.descripcion}</option>

                ))}

              </Form.Control>
          </Form.Group>
        </Col>

        </Form.Group>
      

        
        <NewOperation outTrigger = {outTrigger} trigger = {trigger}/>
        <AdminOperations caja={caja} categoria={categoria} catFilterList = {catFilterList} />
        <Button variant = "info"><Link to='/' className= "text-white">To Main</Link></Button>
        <Button className = "m-5" variant="secondary" onClick= {e=>logout(e)}>Cerrar sesión</Button>
        
    </Fragment>       

    )

}


export default Admin;




