import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
//import products from "../products"
import { Link, useParams } from "react-router-dom";
import { getByIDProduct } from "../features/products/prodSlice";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {addCartItems} from "../features/products/cartItem"

const ProductScreen = () => {
  //const product = products.find((p) => p._id === Request.params._id);

  const [qty, setQty] = useState(0);

  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.prod);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getByIDProduct(id));
  }, [dispatch, id]);


  const handleAddCart = () =>{
      dispatch(addCartItems(products))
  }

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={products.image} alt={products.name} fluid />
        </Col>
        <Col md="3">
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>{products.name}</h2>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={products.rating}
                text={`${products.numReviews} reviews`}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price: ${products.price}</ListGroup.Item>
            <ListGroup.Item>
              Description: ${products.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price : </Col>
                  <Col>
                    <strong>${products.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status : </Col>
                  <Col>
                    <strong>
                      $
                      {products.countInStock > 0 ? "In Stock" : "Ouut Of Stock"}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              {products.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        variant={qty}
                        onChange={(ev) => setQty(ev.target.value)}
                      >
                        {[...Array(products.countInStock).keys()].map((x) => {
                          return (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          );
                        })}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                onClick={handleAddCart}
                  className="btn-block"
                  type="button"
                  disabled={products.countInStock === 0}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
