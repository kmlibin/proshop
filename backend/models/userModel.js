import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

//create password matching
userSchema.methods.matchPassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

//saving to the database, this gets done before it's saved
userSchema.pre('save', async function (next) {
  //if it's not modified, we call the next piece of middlware
  if (!this.isModified('password')) {
    next()
  }
  //create a hashed password and save it to the db. grabbed password before it's saved
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})

const User = mongoose.model("User", userSchema);

export default User;
