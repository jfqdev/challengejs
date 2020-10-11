import React, { Fragment, useEffect, useState } from "react";
import {Table,Button} from 'react-bootstrap';
import EditOp from './EditOp';

//<EditTodo todo={todo} />

const AdminOperations = (props) => {
    const [ops, setOps] = useState([]);
    //const [caja,setCaja] = useState(props.caja)
    //const [categoria,setCategoria] =  useState(props.categoria)
  
    //delete todo function
  
    const deleteTodo = async id => {
      try {
        const deleteTodo = await fetch(`http://localhost:3001/operation/${id}`, {
          method: "DELETE",
          headers:{
              jwtToken:localStorage.token
          }
        });
  
        setOps(ops.filter(op => op.opid !== id));
      } catch (err) {
        console.error(err.message);
      }
    };
    //Get Operations from server
    const getOps = async()=>{
        
        try{
          const res = await fetch("http://localhost:3001/operation/filtered", {
            method: "POST",
            body: JSON.stringify({
                caja: props.caja,
                categoria: props.categoria
            }),
            headers: {
                'Content-Type': 'application/json',
                jwtToken: localStorage.token
            },

          });

          const parseOps = await res.json();          
          setOps(parseOps);
       
        }catch(err){
          console.error(err.message)
        }
  
      }

      
  
    useEffect(() => {    
      getOps();
    },[props.caja,props.categoria]);  

  
    return (
<Table striped bordered hover size="sm">
  <thead>
    <tr>
      <th>Fecha</th>
      <th>Concepto</th>
      <th>Monto</th>
      <th>Categoria</th>
      <th className="text-center">Herramientas</th>
    </tr>
  </thead>
  <tbody>
      {ops.map(op=>(
        <tr key={op.opid}>
            <td>{op.fecha.substring(0, 10)}</td>
            <td>{op.concepto}</td>
            <td>{op.monto}</td>
            <td>{op.descripcion}</td>
            <td className="text-center w-25">
                <EditOp op={op} catFilterList = {props.catFilterList} />
                <Button className="m-1" variant="danger"
                  
                  onClick={() => deleteTodo(op.opid)}
                >
                  Eliminar
                </Button>
                                
                

              </td>

        </tr>
      ))}
  </tbody>

  
</Table>

      );


  };
  
  export default AdminOperations;
  