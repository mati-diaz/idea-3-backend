const bcryptjs = require("bcryptjs");
const createJWT = require("../helpers/createJWT");
const User = require("../models/User");

const register = async (req, res) => {
  try {
    const { email, name, password, role } = req.body;

    const existMail = await User.findOne({ email });
    if (existMail) {
      return res.json({
        msg: "Ya existe un usuario con ese correo",
      });
    }

    const newUser = new User({
      email,
      name,
      password,
      role,
    });

    const salt = bcryptjs.genSaltSync();
    newUser.password = bcryptjs.hashSync(password, salt);

    await newUser.save();

    const token = await createJWT(name, role);

    res.json({
      msg: "User created succesfully",
      token,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error del servidor",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        msg: "No existe un usuario con ese Correo",
      });
    }

    const matchPasswords = bcryptjs.compareSync(password, user.password);

    if (!matchPasswords) {
      return res.json({
        msg: "Contraseña incorrecta",
      });
    }

    const token = await createJWT(user.name, user.role);

    res.json({
      token,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error del servidor",
    });
  }
};

module.exports = {
  register,
  login,
};
