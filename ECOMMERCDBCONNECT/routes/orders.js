import express from 'express'
const orderi = express.Router()

orderi.get('/',(req,res)=>{
    res.send('faqja e orderave...')
})

orderi.get('/new',(req,res)=>{
    res.send('regjistro nje order te ri...')
})

orderi.get(':/id',(req,res)=>{
  const  orderId = req.params.body
    res.send(orderId)
})

export{orderi}