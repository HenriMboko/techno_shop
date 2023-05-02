import { useEffect, useState } from "react";
//import { toast } from "react-toastify"

import {Form, Button, Row, Col, Container} from "react-bootstrap"
import {useSelector, useDispatch} from 'react-redux'
import { toast } from "react-toastify";
//import {Link, useNavigate} from 'react-router-dom'

import {reset, getProfileUser, updateUser} from "../features/auth/authSlice"


const ProfilScreens = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passowrdConfirm: "",
  });

  const dispatch = useDispatch()

  const {isSuccess, user, isError, message} = useSelector((state)=>state.auth)
  
  const {name, email, password, passowrdConfirm} = formData


  useEffect(() => {
    if(isError){
      toast.error(message)
    }
  }, [isError, message, dispatch])
  

  useEffect(() => {
      if(isSuccess){
        dispatch(getProfileUser())
      }
  }, [dispatch, isSuccess])
  

  const onChange = (ev) =>{
    setFormData({...formData, [ev.target.name]:ev.target.value})
  }

  const onSubmit = (ev) =>{
    ev.preventDefault()

    const userData = {
      name,
      email,
      password,
    }
    dispatch(updateUser(userData))
  }

  


  return (
    <Container>
      <Row >
        <Col xs={4} md={4}>
        <Col style={{ paddingTop : "1rem" }}>
            <h1 className="shopping_price">User Profile</h1>
            <Form onSubmit={onSubmit}>
            <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control 
                    type="text"
                    name="name"
                    placeholder={user.name}
                    value={name}
                    onChange={onChange}

                  >
                  </Form.Control>                
                </Form.Group>

                <Form.Group>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control 
                    type="email"
                    name="email"
                    placeholder={user.email}
                    value={email}
                    onChange={onChange}

                  >
                  </Form.Control>                
                </Form.Group>

                <Form.Group style={{ paddingBottom : "0.2rem"}}>
                  <Form.Label>Password</Form.Label>
                  <Form.Control 
                    type="password"
                    name="password"
                    placeholder="Enter your Password"
                    value={password}
                    onChange={onChange}

                  >
                  </Form.Control>
                </Form.Group>

                <Form.Group style={{ paddingBottom : "2rem" }}>
                  <Form.Label>Password Confirm </Form.Label>
                  <Form.Control 
                    type="password"
                    name="passowrdConfirm"
                    placeholder="Confirm your password"
                    value={passowrdConfirm}
                    onChange={onChange}

                  >
                  </Form.Control>
                </Form.Group>

                <Button type="submit" style={{ color :'#000', width : "10rem"  }}
                  variant="secondary"
                >Update User</Button>
            </Form>

      </Col>
        </Col>
      </Row>
    <Row>
      <Col  xs={8} md={8}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  </Container>
  );
};

export default ProfilScreens;
