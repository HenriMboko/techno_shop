import { useState } from "react";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";

import {removeFromCart} from "../features/products/cartItem"

import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const CartScreen = () => {
  const [qty, setQty] = useState(0);

  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const cart = useSelector((state)=>state.cart)

  const handleRemove = (item) => {
    dispatch(removeFromCart(item))
  };

  const handleToCheck = () =>{

  }

  return (
    <Row>
      <Col md={8}>
        <h1 className="shopping_Title">Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <p>
            Your Cart is empty <Link to="/">Go Back</Link>
          </p>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => {
              return (
                <ListGroup.Item key={item._id}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} width="100" alt={item.name} fuild rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/products/${item._id}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}> ${item.price}</Col>
                    <Col md={2} style={{ width : '4rem' }}>
                      <Form.Control
                        as="select"
                        variant={qty}
                        onChange={(ev) => setQty(ev.target.value)}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => {
                          return (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          );
                        })}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                    ${item.price * item.cartQuantity}
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => handleRemove(item)}
                      >
                        <i className="fas fa-trash"></i>Remove
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        )}
      </Col>
      <Col md={4} style={{paddingTop : '2rem', width : "20rem" }} >
            <Card>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h2 className="shopping_price">Total Price</h2>
                        <span>${cart.cartTotalAmount}</span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                <Button type='button' href="/shipping"
                className="btn-block" disabled={cartItems.length === 0}
                onClick={handleToCheck}>
                  Checkout
                </Button>
              </ListGroup.Item>
                </ListGroup>  
            </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
