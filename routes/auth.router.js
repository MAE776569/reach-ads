const router = require("express").Router()
const { body, validationResult } = require("express-validator")
const errorFormatter = require("../config/errorFormatter")
const User = require("../models/user.model")
const { generateAccessToken } = require("../config/jwt.config")
const passport = require("passport")
const { authenticateUser } = require("../middlewares/authentication")

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
            return res.status(201).json({ user: data, accessToken: token })
          })
        })
      }
    })
  }
)

router.post(
  "/login",
  [
    body("email").isEmail(),
    body(
      "password",
      "Password must consists of minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1"
    ).isStrongPassword(),
  ],
  (req, res, next) => {
    const errors = validationResult(req).formatWith(errorFormatter)
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.mapped() })

    passport.authenticate("local", (err, user) => {
      if (err) return next(err)
      if (!user) return res.json({ message: "Wrong email or password" })

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
        return res.json({ user: data, accessToken: token })
      })
    })(req, res, next)
  }
)

router.post(
  "/admin/register",
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
        User.register({ email, isAdmin: true }, password, (err, user) => {
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
            return res.status(201).json({ user: data, accessToken: token })
          })
        })
      }
    })
  }
)

router.post(
  "/admin/login",
  [
    body("email").isEmail(),
    body(
      "password",
      "Password must consists of minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1"
    ).isStrongPassword(),
  ],
  (req, res, next) => {
    const errors = validationResult(req).formatWith(errorFormatter)
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.mapped() })

    const { email } = req.body
    User.findOne({ email }, (err, data) => {
      if (err) return next(err)
      if (!data) return res.json({ message: "Wrong email or password" })
      if (!data.isAdmin)
        return res.status(401).json({ message: "Unauthorized" })

      passport.authenticate("local", (err, user) => {
        if (err) return next(err)
        if (!user) return res.json({ message: "Wrong email or password" })

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
          return res.json({ user: data, accessToken: token })
        })
      })(req, res, next)
    })
  }
)

router.post("/logout", authenticateUser, (req, res, next) => {
  res.clearCookie("actk", {
    signed: true,
    httpOnly: true,
  })
  return res.json({ success: true })
})

module.exports = router
