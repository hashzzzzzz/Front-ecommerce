import mongoose from "mongoose"

const cardModelSchema = new mongoose.Schema({
    img:{
        type:[String],
        required: true
    },
    name:{
        type:String,
        required: true
    },
    price:{ 
        type: Number,
         required: true 
    },

    description:{
        type:String,
        required: true
    }

})

const Card = mongoose.model("Card", cardModelSchema);

export { Card };
