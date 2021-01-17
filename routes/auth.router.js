const router = require("express").Router()
const { body, validationResult } = require("express-validator")
const errorFormatter = require("../config/errorFormatter")
const User = require("../models/user.model")
const { generateAccessToken } = require("../config/jwt.config")
const passport = require("passport")

router.post(
  "/register",
  [
    body("email").isEmail(),
    body(
      "password",
      "Password must consists of minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1"
    ).isStrongPassword(),
    body(
      "confirmPassword",
      "Password must consists of minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1"
    )
      .isStrongPassword()
      .custom((value, { req }) => value === req.body.password),
  ],
  (req, res, next) => {
    const errors = validationResult(req).formatWith(errorFormatter)
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.mapped() })

    const { email, password } = req.body
    User.findOne({ email }, (err, found) => {
      if (err) return next(err)
      if (found) return res.json({ message: "User already exists" })
      else {
        User.register({ email }, password, (err, user) => {
          if (err) return next(err)

          req.login(user, (err) => {
            if (err) return next(err)
            const { __v, _id, salt, hash, ...data } = user.toJSON()
            const token = generateAccessToken({
              id: _id,
              email: data.email,
              isAdmin: data.isAdmin,
            })
            res.cookie("actk", token, {
              signed: true,
              httpOnly: true,
            })
            return res.status(201).json({ user: data })
          })
        })
      }
    })
  }
)

module.exports = router
