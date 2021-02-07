const express = require('express');
const Users = require('../model/user');

const router = express.Router();

router.get('/', async (req, res) => {
    const User = await Users.find().select('name age gender');

    res.render('index', {
        users: User
    })
})
router.get('/user', async (req, res) => {
    const User = await Users.find().select('name age gender');

    res.json({ users: User })
});

//Create User's
router.post('/user', async (req, res) => {
    const { name, age, gender } = req.body;

    try {
        const user = await Users.create({ name, age, gender })
        res.status(200).send({
            message: "Creating User's Successfuly",
            user
        });
    } catch (error) {
        res.status(400).send("Creating user failed.", error)
    }
});
//Delete User's
router.delete('/user', async (req, res) => {
    const { id } = req.body;

    // Get and find the id sent by the client
    const User = await Users.findByIdAndDelete(id);

    if (User) res.status(200).json({ message: "User's successfulyy deleted." })

})
module.exports = router