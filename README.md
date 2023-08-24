# MERN Stack E-Commerce Site

deploy on render: 

This is a project to help me better understand how to merge Node.js, React, and Redux Toolkit; I used MongoDB as the database. Anyone can see the homepage and product information, but there are also several protected routes for either logged in users or admin. The site features user authentication with JWTs and http-only cookies, and it also stores user credentials in local storage. Logged in users can submit product reviews, view orders, edit their credentials, and checkout with PayPal. Admins can see a full list of users and orders, and can update certain fields in those databases. Admins are also able to add and delete products to the store. 

### Languages / Libraries / Tools

JavaScript, React, Redux Toolkit

Node.js, Express, Mongoose, MongoDB

bcrypt, multer,  react-paypal, bootstrap, react-icons, react router, toastify

### Project Highlights

    1. Usual react / redux stuff like useState, useEffect, UseParams, useNavigate, useDispatch, use SElectorconditional rendering, React Router
    2. UI with React Bootstrap
    3. RTK and apiSlices to send requests (POST, GET, DELETE, PUT) to Node.js backend - backend has auth middlewares and error handling middlewares
    4. PayPal integration for easy payments
    5. UI for search functionality and pagination, both of which were set up on the backend server
    6. Protected routes with Node
    7. JWT with HTTP only cookies
    

### What I learned 

    1. I hadn't worked with apiSlices in Redux Toolkit, and it took a minute to understand the builder method. Once I did, it got a lot easier to understand how to build the calls to the API.
    
    2. Similarly, I was eventually able to develop a decent workflow when it came to adding new functionality. Work on backend controller, then the route, then move to the frontend api slice, then implement in the UI. I enjoyed getting the feeling that I had a method to the madness, as simple as that might sound .

    3. Understanding documentation in new libraries (like PayPal for instance) isn't always the easiest for me, perhaps because I don't always have the strongest grip on JS (since I mostly work with React, I sometimes neglect my pure JS). It goes better if I can find a video of how to use the library. That being said, since my forays into Node.js my JS has gotten much better, so I have noticed that it is easier to consume documentation than it used to be. 
    
    4. Bootstrap. I'd never worked with Bootstrap, but I definitely now see it's appeal. I'd like to work more with customizing some of the themes.
    
    5. This project helped me to better understand how to structure larger pages with React and components. I also enjoyed using components to house Forms, Meta tags, and Messages. Seeing all of these ways to cut down redundancies in code was very helpful. 