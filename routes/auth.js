const express = require('express');

const router = express.Router();

const USERS = [
  {
    username: 'esto',
    password: 'password',
    name: 'Esto Triramdani Nurlustiawan',
    email: 'estolagi@gmail.com',
  }
]

const token = [];

router.post('/signin', async function (req, res) {
  const username = req.body.username
  const password = req.body.password

  // check username dan password sudah sesuai.
  const user = USERS.find((u) => u.username === username);

  // check usernya ada atau tidak
  if (!user) {
    // jika user tidak ada
    return res.status(404).json({
      status: false,
      message: 'user tidak ada'
    })
  }

  // jika usernya ada, check passwordnya benar atau salah
  if (user.password !== password) {
    return res.status(401).json({
      status: false,
      message: 'password salah'
    })
  }

  // generate token
  const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  
  token.push(randomString);

  return res.json({
    status: true,
    message: 'Login success',
    data: {
      username: user.username,
      name: user.name,
      email: user.email,
      token: randomString
    }
  })
})

module.exports = router;