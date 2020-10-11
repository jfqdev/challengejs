import React from 'react';
import Op from './Op';
import ListGroup from 'react-bootstrap/ListGroup' ;
import './styles/Op.css'

 const OpList= (props)=>{
    const filtOp = props.filtOp;        
    
    const opComponent = filtOp.map((elemntodelArray,i)=>{
        
        
        return <ListGroup.Item action variant="light" className="groupList" ><Op key={filtOp[i].opid} opid={filtOp[i].opid} concepto={filtOp[i].concepto} fecha={filtOp[i].fecha} monto={filtOp[i].monto} /></ListGroup.Item>
        
    });
    console.log(opComponent)

    return (
        
        <ListGroup className="boxlist">   
            {opComponent}          
        </ListGroup>


    )
 };



export default OpList;