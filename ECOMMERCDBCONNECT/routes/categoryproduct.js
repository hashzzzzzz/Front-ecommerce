import express from 'express'
const categoryprodukti = express.Router()

categoryprodukti.get('/',(req,res)=>{
    res.send('faqja e kategorive te produkteve...')
})

categoryprodukti.get('/new',(req,res)=>{
    res.send('regjistro nje kategori te re...')
})

categoryprodukti.get(':/id',(req,res)=>{
  const  categoryproduktiId = req.params.body
    res.send(categoryproduktiId)
})

export{categoryprodukti}