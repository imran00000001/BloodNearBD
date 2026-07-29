const express = require("express");
const users = require("../../models/user");

const router = express.Router();

// frontend calls this to get the public key needed to subscribe
router.get("/push/vapidPublicKey", (req, res) => {
  res.send({ publicKey: process.env.VAPID_PUBLIC_KEY });
});

// save a donor's browser push subscription against their account
router.post("/push/subscribe", async (req, res) => {
  const { email, subscription } = req.body;
  if (!email || !subscription?.endpoint) {
    return res.status(400).send({ message: "email and subscription are required" });
  }

  const result = await users.updateOne(
    { email },
    { $addToSet: { pushSubscriptions: subscription } }
  );

  res.send(result);
});

// remove a subscription (e.g. user turned off notifications)
router.post("/push/unsubscribe", async (req, res) => {
  const { email, endpoint } = req.body;
  if (!email || !endpoint) {
    return res.status(400).send({ message: "email and endpoint are required" });
  }

  const result = await users.updateOne(
    { email },
    { $pull: { pushSubscriptions: { endpoint } } }
  );

  res.send(result);
});

module.exports = router;
