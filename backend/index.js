const express = require("express");
const cors = require("cors");  //By cors we can call this server from any other origin
const { default: axios } = require("axios");

const port = 3000;
const app = express();
app.use(express.json());
app.use(cors({origin : true}));

app.post("/authenticate", async (req,res)=>{
    const {username} = req.body;

    try{
        const response = await axios.put(
            "https://api.chatengine.io/users/",
            {
                username : username,
                secret : username,
                first_name : username
            },
            { headers : {"private-key" : "df0ead01-b36f-4fcf-8342-d1706b45b4b9" }} //AUTH: These are private API calls. You must authenticate as project admin by setting the PRIVATE-KEY header.
            )
            return res.status(response.status).json(response.data);
    }catch(err){
       return res.status(err.response.status).json(err.response.status) ;
    }
    /* 
    return res.json({
        username : username,
        secret : "sha256..."
    });*/
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})