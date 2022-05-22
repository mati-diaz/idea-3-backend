const bcryptjs = require('bcryptjs');
const createJWT = require('../helpers/createJWT');
const User = require('../models/User');

const register = async (req, res) => {
  try {
    const { email, name, password, role = 'CLIENT' } = req.body;

    const existMail = await User.findOne({ email });
    if (existMail) {
      return res.status(400).json({
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

    const token = await createJWT(name, role, newUser.id);

    res.status(201).json({
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

    const token = await createJWT(user.name, user.role, user.id);

    res.status(200).json({
      token,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error del servidor",
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: {$ne: req.user.id} });

    if (users.length) {
      res.status(200).json({ users });
    } else {
      res.status(204).json();
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: "Error del servidor",
    });
  }
}

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (user) {
      res.status(200).json({ user });
    } else {
      res.status(404).json({ msg: 'Usuario No Encontrado' });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({
      msg: "Error del servidor",
    });
  }
}

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, role } = req.body;

    await User.findByIdAndUpdate(id, { name, role });

    res.status(200).json({
      msg: 'Usuario Actualizado Correctamente'
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error del servidor",
    });
  }
}

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await User.findByIdAndDelete(id);

    res.status(200).json({
      msg: 'Usuario Eliminado Correctamente'
    });
  } catch (error) {
    res.status(500).json({
      msg: "Error del servidor",
    });
  }
}
 
module.exports = {
  register,
  login,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};
