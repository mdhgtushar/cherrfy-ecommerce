// Rewritten for CommonJS (remove import/export) and fix module.exports error. 
// Also structure is kept as close to the original logic as possible.

const express = require("express");
const router = express.Router();

const session = require("express-session");
const passport = require("passport");
const { Strategy: FacebookStrategy } = require("passport-facebook");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// === Session Setup ===
router.use(
  session({
    secret: "session_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);
router.use(passport.initialize());
router.use(passport.session());

// === Passport Config ===
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ["id", "displayName", "emails", "photos"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = {
          id: profile.id,
          name: profile.displayName,
          email: profile.emails?.[0]?.value,
          photo: profile.photos?.[0]?.value,
        };
        // 🔹 এখানে চাইলে আপনি MongoDB বা MySQL এ ইউজার সংরক্ষণ করতে পারেন (add user db save logic if needed)
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// === ROUTES ===

// 🔹 Step 1: Redirect user to Facebook for login
router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

// 🔹 Step 2: Handle Facebook callback
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/auth/failure",
    session: false,
  }),
  (req, res) => {
    const token = jwt.sign(req.user, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.redirect(
      `${process.env.FRONTEND_URL}/auth/success?token=${token}`
    );
  }
);

// 🔹 Step 3: Auth failure route
router.get("/failure", (req, res) => {
  res.status(401).json({ message: "Facebook Login Failed" });
});

// 🔹 Step 4: Verify JWT route
router.get("/verify", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ user: decoded });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

module.exports = router;
