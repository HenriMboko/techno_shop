import { useEffect } from "react"
import { Row, Col } from "react-bootstrap"
import {useSelector, useDispatch} from "react-redux"
import {getProduct} from "../features/products/prodSlice"
import Produits from "../components/Produits"


const Homepage = () => {

  const dispatch = useDispatch()

  const prod = useSelector((state) => state.prod.products)

useEffect(() => {
  dispatch(getProduct())
}, [dispatch])



  return (
    <Row>
      {
        prod.map((produits)=>{
          return(
            <Col key={produits._id} sm={12} md={6} lg={4} xl={3}>
             <Produits produits={produits} />
            </Col>
          )
        })
      }
    </Row>
  )
}

export default Homepage