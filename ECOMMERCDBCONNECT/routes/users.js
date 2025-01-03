import express from 'express'
import { User as Users } from '../models/usersModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const useri = express.Router()

//shfaqi te gjith userat e databazes
useri.get('/',async(req,res)=>{
    const users = await Users.find();
    res.json(users)
})

//shfaqe userin ne baze te id
useri.get('/:id', async(req,res)=>{
    const useriid = req.params.id;
    const founduseri = await Users.findById(useriid)
    res.json(founduseri); })

//regjistro nje strudent te ri
useri.post('/',async(req,res)=>{
        const newuser = new Users (req.body);
        await newuser.save()
        res.json(newuser)
    })

    

    useri.patch('/:id',async(req,res)=>{
        const userId =req.params.id;
        const updateuser = await Users.findByIdAndUpdate(userId,req.body,{new:true});
        res.json(updateuser)
    })

    useri.delete('/:id',async(req,res)=>{
        const deleetstudents = await Users.findByIdAndDelete(req.params.id);
        res.json(deleetstudents)
    })




// Register user
useri.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const userExists = await Users.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new Users({ name, email, password });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
});

// Login user
useri.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
});

export { useri };

