import express from'express'
import passport from 'passport';
import { signup,login,logout,updatePassword } from '../controlller/auth.controller.js'
import { protectRoutes } from '../midleware/protectRoutes.js';
const router=express.Router()
// Express.js misalı
router.post('/signup',signup)
  router.post("/login",login)
router.patch('/update-password/:userId',protectRoutes, updatePassword);
router.post("/logout",logout)
router.post('/google-signin', async (req, res) => {
  const { idToken } = req.body;

  try {
    const userCredential = await admin.auth().verifyIdToken(idToken);
    const { uid, email, name } = userCredential;

    // Check if user exists in your DB or create a new user
    // ...

    res.status(200).send({
      userId: uid,
      userName: name
    });
  } catch (error) {
    console.error('Error verifying Google token:', error);
    res.status(401).send({ error: 'Unauthorized' });
  }
});

export default router
