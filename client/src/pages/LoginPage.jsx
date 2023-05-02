import {useState, useEffect} from "react"
import {useSelector, useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import {loginUser, reset} from "../features/auth/authSlice"

import { toast } from "react-toastify"

import {Form, Button, Row, Col, Container} from "react-bootstrap"

const LoginPage = () => {

const [formData, setFormData] = useState({
  email : '',
  password : ''
})

const dispatch = useDispatch()
const navigate = useNavigate()

const {isSuccess, user, isError, message} = useSelector((state)=>state.auth)

const {email, password} = formData

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

  const userData = {
    email,
    password,
  }

  dispatch(loginUser(userData))
}



  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6} style={{ paddingTop : "7rem" }}>
              <h1>Sign In</h1>

              <Form onSubmit={onSubmit}>
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

                  <Form.Group style={{ paddingBottom : "2rem", width : "30rem" }}>
                    <Form.Label>Passwotd</Form.Label>
                    <Form.Control 
                      type="password"
                      name="password"
                      placeholder="Enter your Email"
                      value={password}
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
                  New Customre? <Link to='/register'>Register</Link>
                </Col>
              </Row>
        </Col>
      </Row>

    </Container>
  )
}

export default LoginPage