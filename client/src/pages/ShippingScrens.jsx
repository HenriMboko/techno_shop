import {useState, useEffect} from "react"
import {useSelector, useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import {Shipping} from "../features/products/cartItem"

import { Button, Container, Form, Row } from "react-bootstrap"

const ShippingScrens = () => {



    const [formData, setForm] = useState({
        address : '',
        postalCode : '',
        country : '',
    })

     
const {address, postalCode, country} = formData

const onChange = (ev) =>{
    setForm({...formData, [ev.target.name] : ev.target.value})
}

const dispatch = useDispatch()

const onSubmit = (ev) =>{
    ev.preventDefautl()

    dispatch()
   

}


  return (
    <Container>
        <Row>
            <h1>Shipping</h1>
            <Form onSubmit={onSubmit}>
            <Form.Group style={{ width : "30rem" }}>
                  <Form.Label>Address</Form.Label>
                  <Form.Control 
                    type="text"
                    name="address"
                    placeholder="Enter your Address"
                    value={address}
                    onChange={onChange}
                    required
                  >
                  </Form.Control>                
                </Form.Group>
                <Form.Group style={{ width : "30rem" }}>
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control 
                    type="text"
                    name="postalCode"
                    placeholder="Enter your Email"
                    value={postalCode}
                    onChange={onChange}
                    required
                  >
                  </Form.Control>                
                </Form.Group>
                <Form.Group style={{ width : "30rem", paddingBottom : '1rem' }}>
                  <Form.Label>Country</Form.Label>
                  <Form.Control 
                    type="text"
                    name="country"
                    placeholder="Enter your Email"
                    value={country}
                    onChange={onChange}
                    required
                  >
                  </Form.Control>                
                </Form.Group>
                

                <Button type="submit" variant="primary">
                    Valider
                </Button>
            </Form>
        </Row>
    </Container>
  )
}

export default ShippingScrens