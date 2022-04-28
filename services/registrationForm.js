const express = require('express')
const router = express.Router()
const ObjectID = require("mongoose").Types.ObjectId

const User = require('../models/user')

router.post('/userRegistration', async function (req, res) {
    try {
  
      var registerData = req.body;
      
      console.log(registerData)

      if (!registerData.email || !registerData.firstName || !registerData.lastName) {
        return res.status(400).json({ success: false, message: 'Params are missing' });
      } 
  
      const registerUser = await User.findOne({ email: registerData.email }).lean()
  
      if (registerUser) {
        return res.status(200).json({ success: false, message: 'Email already exists' })
      }
  
      const obj = {
        firstName: registerData.firstName,
        lastName: registerData.lastName,
        email: registerData.email,
        registeredDate: new Date()
      };
  
      User.create(obj, function (err) {
        if (err) throw err;
        res.json({ success: true, message: 'User created successfully.' });
      })
  
    } catch (error) {
      console.log(error)
      return res.status(500).json(error)
    }
  })

router.get('/userDetails', async (req,res) => {
  try {

    const userDetails = await User.aggregate([
      { $sort: {registeredDate: -1} },
      { 
        $project: {
          _id: 1,
          userCount: 1,
          firstName: 1,
          lastName: 1,
          email: 1,
          joiningDate: { $dateToString: { format: "%Y/%m/%d", date: "$registeredDate" } },
          joiningTime: { $dateToString: { format: "%H:%M", date: "$registeredDate" } },
        }
      }
    ])

    return res.status(200).json(userDetails)

  } catch (error) {
    console.log(error)
  }
})

router.delete('/delete-user-details', async (req,res) => {
  try {

    const { userId } = req.query;

    await User.findOneAndDelete({_id: ObjectID(userId)})

    return res.status(200).json({message: 'Deleted'})

  } catch (error) {
    console.log(error)
  }
})

  module.exports = router