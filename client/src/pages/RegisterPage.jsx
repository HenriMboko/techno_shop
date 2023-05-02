import {useState, useEffect} from "react"
import {useSelector, useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import {createUser, reset} from "../features/auth/authSlice"

import { toast } from "react-toastify"

import {Form, Button, Row, Col, Container} from "react-bootstrap"


const RegisterPage = () => {

  const [formData, setFormData] = useState({
    name : '',
    email : '',
    password : '',
    passowrdConfirm : ''


  })
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const {isSuccess, user, isError, message} = useSelector((state)=>state.auth)
  
  const {name, email, password, passowrdConfirm} = formData
  
  useEffect(()=>{
    if(isError){
      toast.error(message)
    }
  },[isError, message])
  
  useEffect(()=>{
  
    if(isSuccess || user){
      dispatch(reset)
      navigate('/')
    }
  
  },[dispatch, navigate, isSuccess, user])
  
  const onChange = (ev) =>{
    setFormData({...formData, [ev.target.name]:ev.target.value})
  }
  
  const onSubmit = (ev) =>{
  
    ev.preventDefault()

    if(password != passowrdConfirm){
      toast.warning('password not match')
    }else{
      const userData = {
        name,
        email,
        password,
      }
    
      dispatch(createUser(userData))
    }
  
    
  }
  
  




  return (
    <Container>
    <Row className="justify-content-md-center">
      <Col xs={12} md={6} style={{ paddingTop : "7rem" }}>
            <h1>Sign In</h1>

            <Form onSubmit={onSubmit}>
            <Form.Group style={{ width : "30rem" }}>
                  <Form.Label>Name</Form.Label>
                  <Form.Control 
                    type="text"
                    name="name"
                    placeholder="Enter your Email"
                    value={name}
                    onChange={onChange}
                    required
                  >
                  </Form.Control>                
                </Form.Group>

                <Form.Group style={{ width : "30rem" }}>
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control 
                    type="email"
                    name="email"
                    placeholder="Enter your Email"
                    value={email}
                    onChange={onChange}
                    required
                  >
                  </Form.Control>                
                </Form.Group>

                <Form.Group style={{ paddingBottom : "0.2rem", width : "30rem" }}>
                  <Form.Label>Password</Form.Label>
                  <Form.Control 
                    type="password"
                    name="password"
                    placeholder="Enter your Password"
                    value={password}
                    onChange={onChange}
                    required
                  >
                  </Form.Control>
                </Form.Group>

                <Form.Group style={{ paddingBottom : "2rem", width : "30rem" }}>
                  <Form.Label>Password Confirm </Form.Label>
                  <Form.Control 
                    type="password"
                    name="passowrdConfirm"
                    placeholder="Confirm your password"
                    value={passowrdConfirm}
                    onChange={onChange}
                    required
                  >
                  </Form.Control>
                </Form.Group>

                <Button type="submit" style={{ color :'#000', width : "10rem"  }}
                  variant="secondary"
                >Submit</Button>
            </Form>

            <Row className="py-3">
              <Col>
                New Customre? <Link to='/login'>Register</Link>
              </Col>
            </Row>
      </Col>
    </Row>

  </Container>
  )
}

export default RegisterPage