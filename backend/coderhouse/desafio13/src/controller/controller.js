import ContenedorArchivo from "../contenedor/contenedorArchivo.js";
import User from "../models/User.js";
import validator from "validator";
import bcrypt from "bcrypt";
import { productFaker } from "../utils/faker.js";

const ProductsContainer = new ContenedorArchivo("productos");
const ChatContainer = new ContenedorArchivo("chat");

export const getFormView = async (req, res) => {
  try {
    const datos = await ProductsContainer.getAll();
    return res.render("../public/productos", {
      datos,
      email: req.session.email,
      error: false,
      renderTable: datos.length > 0,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getChat = async (req, res, next) => {
  const messages = await ChatContainer.getAll();
  return res.render("../public/chat", {
    messages,
    email: req.session.email,
  });
};

export const getProductTest = async (req, res, next) => {
  try {
    (async () => {
      try {
        await productFaker();
      } catch (error) {
        console.log(error);
      }
    })();
    const datos = await ProductsContainer.getAll();
    return res.render("../public/product-test", {
      datos,
      email: req.session.email,
      error: false,
      renderTable: datos.length > 0,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteAllProducts = async (req, res) => {
  await ProductsContainer.deleteAll();
  console.log("Productos borrados exitosamente");
  const datos = await ProductsContainer.getAll();
  return res.render("../public/productos", {
    datos: datos,
    email: req.session.email,
    error: false,
    renderTable: datos.length > 0,
  });
};

export const loginUser = async (req, res) => {
  return res.render("../public/login", {
    error: "",
  });
};

export const registerUser = async (req, res) => {
  return res.render("../public/register", {
    error: "",
  });
};

export const requestLogin = async (req, res) => {
  const { email, password } = req.body;

  let validationEmail = validator.isEmail(email);
  let validationPassword = !validator.isEmpty(password);

  if (validationEmail && validationPassword) {
    try {
      const user = await User.findOne({ email: email });

      if (!user) {
        return res.render("../public/login", {
          error: "El usuario no se encuentra registrado.",
        });
      } else {
        const isUserValid = await bcrypt.compare(password, user.password);

        if (isUserValid) {
          req.session.email = email;
          res.redirect("/");
        }
      }
    } catch (error) {
      return res.render("../public/login", {
        error: "No existe el usuario.",
      });
    }
  } else {
    return res.render("../public/login", {
      error: "Los datos ingresados son incorrectos.",
    });
  }
};

export const requestRegister = async (req, res) => {
  const { email, password } = req.body;

  let validationEmail = validator.isEmail(email);
  let validationPassword = !validator.isEmpty(password);

  if (!validationEmail && !validationPassword) {
    return res.render("../public/register", {
      error: "Los datos ingresados son incorrectos.",
    });
  } else {
    try {
      const foundUser = await User.findOne({ email: email });

      if (foundUser) {
        return res.render("../public/register", {
          error: "El usuario ya existe.",
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        const encryptPassword = await bcrypt.hash(password, salt);

        const user = new User({
          email,
          password: encryptPassword,
        });

        await user.save();

        req.session.email = email;
        return res.redirect("/");
      }
    } catch (error) {
      return res.render("../public/register", {
        error: "Por favor, ingrese los datos correctamente.",
      });
    }
  }
};

export const logoutUser = async (req, res) => {
  req.session.destroy((err) => {
    if (!err) res.redirect("/");
    else res.send({ status: "Logout ERROR", body: err });
  });
};
