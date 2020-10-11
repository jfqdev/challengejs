import React, { Fragment, useEffect, useState } from "react";
import {Button,Modal,Form,FormGroup,Row,Col} from 'react-bootstrap';

function EditOp(props) {

    const {op} = props;


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [categoria, setCategoria] = useState(op.descripcion);
    const [monto,setMonto] = useState(op.monto);
    const [concepto,setConcepto] = useState(op.concepto);
    const [fecha,setFecha] = useState(op.fecha.substring(0, 10))
    const [categoriaId,setCategoriaId] = useState(0)
  

    //Hard code category list, fix this:

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


    //Helper to set field's original value
    const originalValue = ()=>{
        setMonto(op.monto);
        setConcepto(op.concepto);
        setFecha(op.fecha.substring(0,10));
        setCategoria(op.descripcion);
    }

    //On closing a modal
    const closeModal = ()=>{
        handleClose();
        originalValue();
        
    }

    //On save changes
    const saveModal = () =>{
      handleClose();
      editRequest();   
      
    }
  
    //On changing cat in a modal.
    const onCatChange = (e)=>{
      setCategoria(e.target.value);      
      setCategoriaId(listofCats[e.target.value]);
      
    }
    
    //Server Request to edit
    const editRequest = async()=>{
        
      try{
        const res = await fetch(`/operation/${op.opid}`, {
          method: "PUT",
          body: JSON.stringify({
              concepto: concepto,
              fecha: fecha,
              monto:monto,
              categoria_id: categoriaId
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
    
    return (
      <Fragment>
        <Button variant="warning" onClick={handleShow}>
          Editar
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
                    <Form.Label>State</Form.Label>
                    <Form.Control as="select" value={categoria} onChange={(e)=>onCatChange(e)}>                        
                    {props.catFilterList.map((cat)=>(
                    <option>{cat.descripcion}</option>
                     ))}
                    </Form.Control>
                    </Form.Group>
                </Form.Row>
            </Form>    
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="primary" onClick={saveModal}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Fragment>
    );
  }

export default EditOp;  