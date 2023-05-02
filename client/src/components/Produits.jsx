import { Card } from "react-bootstrap";

import Rating from "./Rating";

import {Link} from "react-router-dom"

const Produits = ({produits}) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${produits._id}`}>
        <Card.Img src={produits.image} variant="top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${produits._id}`}>
          <Card.Title as="div" className="title">
            <strong>{produits.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text as="div">
          <div className="my-3">
            <Rating value={produits.rating}
             text={`${produits.numReviews} reviews`} />
          </div>
        </Card.Text>
        <Card.Text as="div">${produits.price}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Produits