const jwt = require("jsonwebtoken");

const createJWT = (name, role, id) => {
  return new Promise((resolve, reject) => {
    const payload = { name, id };

    jwt.sign(
      payload,
      process.env.SECRET_JWT_KEY,
      {
        expiresIn: "24h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("The token was not generated");
        }

        resolve(token);
      }
    );
  });
}

module.exports = createJWT;
