import connectDB from "../lib/connectDB";


export default async function handler(req, res) {
    await connectDB()
    
    const {name , age } = req.body;
    const person = new user({
        name:name,
        age:age
    })
    await person.save()
    console.log("inside api",name , age)
    res.status(200).json({ done: true })
  }