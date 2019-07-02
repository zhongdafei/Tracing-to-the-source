const express =require("express");
const app=express();

app.get("/",(req,res)=>{
    res.send("Hello world!");
});

const port = process.env.POST||5000;
app.listen(port,()=>{
    console.log(`serve running on port ${port}`);
})