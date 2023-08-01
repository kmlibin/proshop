import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@admin.com",
    password: bcrypt.hashSync("secret", 10),
    isAdmin: true,
  },
  {
    name: "Susan Doe",
    email: "susan@susan.com",
    password: bcrypt.hashSync("secret", 10),
    isAdmin: false,
  },
  {
    name: "John Doe",
    email: "john@john.com",
    password: bcrypt.hashSync("secret", 10),
    isAdmin: false,
  },
  {
    name: "Cat Doe",
    email: "cat@cat.com",
    password: bcrypt.hashSync("secret", 10),
    isAdmin: false,
  },
];

export default users;
