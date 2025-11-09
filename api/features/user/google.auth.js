// routes/auth.js
const express = require("express");
const router = express.Router();
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");
const User = require("./user.model"); // আপনার ইউজার মডেল
const { generateUserToken } = require("../../utils/generateToken");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/google", async (req, res) => {
  try {
    const { id_token } = req.body;
    if (!id_token) return res.status(400).json({ message: "No token provided" });

    // Verify token
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    // payload: { sub, email, name, picture, ... }
    const { sub: googleId, email, name, picture } = payload;

    // Find or create user in DB
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        googleId,
        email,
        name,
        avatar: picture,
        // mark as emailVerified true since Google verified it
      });
    }

    // create our own JWT
    // const token = jwt.sign(
    //   { id: user._id, email: user.email },
    //   process.env.JWT_SECRET,
    //   { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
    // );
    const token = generateUserToken(user);

    return res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(401).json({ message: "Invalid Google token" });
  }
});

module.exports = router;
