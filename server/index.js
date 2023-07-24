const express = require("express");
const mongoose = require("mongoose");
const noteModel = require('./models/users');
const cors =  require('cors')

 mongoose.connect(  "mongodb+srv://hrideshp2:ntrmhx0IEraGI8hT@newcluster.ecvuffk.mongodb.net/notesApp")

const app = express();
app.use(express.json());
app.use(cors());

app.get("/getpost", (req,res) =>{
    noteModel.find({}) .then( (err, result) =>{
        err? res.json(err) : res.json(result)
    
    })
})


app.post("/createpost", async(req,res)=>{ 
    const post = req.body;
    const newPost = new noteModel(post);
    await newPost.save();

    res.json(post);
})

app.delete("/delete/:id", async(req,res)=>{
  const id =req.params.id;
  
  await noteModel.findByIdAndRemove(id).exec();

 

})

app.put("/update",async(req,res)=>{
  const newTitle = req.body.title
  const newPost = req.body.post
  const id = req.body.id

  // try{
  //   await noteModel.findById(id).then((error, noteToUpdate)=>{
  //       noteToUpdate.title = newTitle
  //       noteToUpdate.post= newPost
  //       noteToUpdate.save();

  //   })
  // }catch(err){
  //   console.log(err);
  // }
  try {
    await noteModel.findByIdAndUpdate(id, { title: newTitle, post: newPost });
    res.json({ message: "Note updated successfully" });
  } catch (err) {
    console.log(err);
    res.json({ error: "An error occurred while updating the note" });
  }

})


app.listen(3001, ()=>{
    console.log("It is runnign in 3001");
})