import React from 'react'
import {Card, Accordion, Container, Row,Col} from 'react-bootstrap'; 
import './styles/Op.css'


const Op = (props)=> {
    
    let fontColor;
    let monto;

    //Showing $ left to the number
    if(props.monto<0){
        fontColor="fontEgreso";
        monto= (props.monto*(-1));
        monto = `-$${monto}`

    }else{
        fontColor=""
        monto = `$${props.monto}`
    }

    //Substracting data from date "prop.fecha" property

    let year = props.fecha.substring(0, 5)
    let month =  props.fecha.substring(5,8)
    let day = props.fecha.substring(8,10)
    let fullDate = `${year}${month}${day}`

    return(
    <Container >
        <Row>
            <Col xs={8}>                            
                <h2>{props.concepto}</h2>
                <p className="font-weight-light">{fullDate}</p>
            </Col>
            <Col xs ={4} className= "Monto">   
                <p className={`fuente ${fontColor}`}>{monto}</p>
            </Col>
        </Row>
    </Container>


    ); 

}

export default Op;

