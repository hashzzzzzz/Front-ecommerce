import express from 'express'
const produkti = express.Router()

produkti.get('/',(req,res)=>{
    res.send('faqja e produkteve...')
})

produkti.get('/new',(req,res)=>{
    res.send('regjistro nje produkt te ri...')
})

produkti.get(':/id',(req,res)=>{
  const  produktiId = req.params.body
    res.send(produktiId)
})

export{produkti}