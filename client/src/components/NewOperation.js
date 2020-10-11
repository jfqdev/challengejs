import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {Navbar,Button,Form,Nav,Table,Row,Col,Modal} from "react-bootstrap"
import { Link, Redirect} from "react-router-dom";



const NewOperation = (props)=>{
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [caja,setCaja] =  useState('ingreso');
    const [concepto,setConcepto] = useState('');
    const [fecha,setFecha] = useState('AAAA-MM-DD');;
    const [categoria,setCategoria] = useState(1);
    const [monto,setMonto] = useState(0);


    //HardCode categorias:

    const listofCats = {
        Salario :1,
        Reembolsos: 2,
        Premios: 3,
        Bono:4,
        Regalo:5,
        Cupones:6,
        Otros:7,     
        Comida:8,
        Navidad:9,
        Casa:10,
        Compras:11,
        Transporte:12,
        Viajar:13,
        Varios:14
      }


    //Hard code Caja

    const listCaja = {
        ingreso:1,
        egreso:2
    }

    //Helper Nueva Operacion

    const onClickNew = ()=>{
        handleClose();
        newOp();
    }

    
    //Handle select
    const catHandle= (e)=>{          
    setCategoria(e.target.value)    

    }

    //Post operation request
    const newOp = async()=>{
        let supMonto = monto;
        if(caja==='egreso'){
            supMonto = monto * (-1)
        }
        try{
          const res = await fetch("/operation/", {
            method: "POST",
            body: JSON.stringify({
                concepto: concepto,
                fecha: fecha,
                monto: supMonto,
                tipo: listCaja[caja],
                categoria: listofCats[categoria]
            }),
            headers: {
                'Content-Type': 'application/json',
                jwtToken: localStorage.token
            },

          });

          const parseOps = await res.json();
          window.location.reload();        

                 
        }catch(err){
          console.error(err.message)
        }
  
      }

    return(
        <Fragment>
        
        <Button variant="primary" onClick={handleShow}>
          Nueva Operacion
        </Button>
        
        <Modal
        show={show}
        onHide={handleClose}
        animation={false} size="lg"
        aria-labelledby="contained-modal-title-vcenter"
                
        >
          <Modal.Header closeButton>
            <Modal.Title>Editar Operación</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Concepto</Form.Label>
                        <Form.Control value={concepto} onChange={e => setConcepto(e.target.value)} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Monto</Form.Label>
                        <Form.Control value={monto} onChange={e => setMonto(e.target.value)}/>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Fecha</Form.Label>
                        <Form.Control value={fecha} onChange={e => setFecha(e.target.value)}/>
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Categoria</Form.Label>
                    <Form.Control as="select" value={categoria} onChange={(e)=>catHandle(e)}>                        
                    <option>Salario</option>
                    <option>Reembolsos</option>
                    <option>Premios</option>
                    <option>Bono</option>
                    <option>Regalo</option>
                    <option>Cupones</option>
                    <option>Otros</option>
                    <option>Comida</option>
                    <option>Navidad</option>
                    <option>Casa</option>
                    <option>Compras</option>
                    <option>Transporte</option>
                    <option>Viajar</option>
                    <option>Varios</option>                    

                    </Form.Control>
                    </Form.Group>
                </Form.Row>
                <Form.Row>
                    <Form.Check
                type="radio"
                label="Ingreso"
                value = {'ingreso'}               
                name="formHorizontalRadios"
                id="formHorizontalRadios1"              
                onClick = {(e)=> setCaja(e.target.value)}
                />
                <Form.Check
                type="radio"
                label="Egreso"
                value = {'egreso'}
                name="formHorizontalRadios"
                id="formHorizontalRadios2"
                onClick = {(e)=> setCaja(e.target.value)}
                />
                
                </Form.Row>
            </Form>    
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={onClickNew}>
              Nueva Operacion
            </Button>
          </Modal.Footer>
        </Modal>
        </Fragment>



    )
}


export default NewOperation