import React from "react";

import { Row, Col } from "react-bootstrap";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";

import { useGetProductsQuery } from "../slices/productsApiSlice.js";

import Product from "../components/Product";

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
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
            {products?.map((product) => (
              <Col sm={12} med={6} lg={4} xl={3} key={product._id}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
