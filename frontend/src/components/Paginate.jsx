import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import React from "react";

const Paginate = ({ pages, page, isAdmin = false, keyword='' }) => {
  return (
    pages > 1 && (
      <Pagination>
        {/* turn pages into an array, map through their keys ... key will be one behind pages, since indexes start at 0*/}
        {/* //the link to is how we put the param in to the url, picked up by the query and sent to controller. */}
        {[...Array(pages).keys()].map((num) => (
           
          <LinkContainer
            key={num + 1}
            to={!isAdmin ? keyword ? `/search/${keyword}/page/${num + 1}` : `/page/${num + 1}` : `/admin/productlist/${num + 1}`}
          >
            <Pagination.Item active = {num + 1 === page}>{num+1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
