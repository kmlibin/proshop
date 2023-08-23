import React from "react";

import { Row, Col } from "react-bootstrap";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import { useParams } from 'react-router-dom'

import { useGetProductsQuery } from "../slices/productsApiSlice.js";

import Product from "../components/Product";
import Paginate from "../components/Paginate.jsx";

const HomeScreen = () => {
  //set up the param in the routes called page number (index.js)
  const {pageNumber} = useParams()
  const { data, isLoading, error } = useGetProductsQuery({pageNumber});
  return (
    <>
      {isLoading ? (
        <Loader/>
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {data.products?.map((product) => (
              <Col sm={12} med={6} lg={4} xl={3} key={product._id}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages = {data.pages} page ={data.page} />
        </>
      )}
    </>
  );
};

export default HomeScreen;
