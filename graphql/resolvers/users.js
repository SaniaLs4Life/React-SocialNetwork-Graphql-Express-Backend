const User = require("../../models/User");
const { SECRET_KEY } = require("../../configDB");
const {
  validateRegisterInputs,
  validateLoginInputs
} = require("../../util/validatiors");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { UserInputError } = require("apollo-server");

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}

module.exports = {
  Mutation: {
    async login(
      _,
      {
        loginInput: { username, password }
      }
    ) {
      const { valid, errors } = validateLoginInputs(username, password);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const user = await User.findOne({ username });
      if (!user) {
        errors.general = "User not found!";
        throw new UserInputError("User not found", { errors });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Wrong credentials!";
        throw new UserInputError("Wrong Credentials", { errors });
      }
      const token = generateToken(user);
      return {
        ...user._doc,
        id: user._id,
        token
      };
    },
    async register(
      _,
      {
        registerInput: { username, email, password, confirmPassword }
      }
    ) {
      const { valid, errors } = validateRegisterInputs(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Username is taken!", {
          errors: {
            username: "Username is already taken!"
          }
        });
      }
      password = await bcrypt.hash(password, 12);
      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString()
      });

      const res = await newUser.save();
      const token = generateToken(res);
      return {
        ...res._doc,
        id: res._id,
        token
      };
    }
  }
};
