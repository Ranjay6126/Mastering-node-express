const express = require('express');
const fs = require('fs');

const mongoose = require("mongoose")

// const data = require('./MOCK_DATA.json');
const { CLIENT_RENEG_LIMIT } = require('tls');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = 3000;

//Connection with mongoDb
mongoose.connect("mongodb://127.0.0.1:27017/Piyush")
.then(()=> console.log("MongoDB is Connected"))
.catch(err => console.log("Mongodb error", err));

//Schema 
const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required : true,
    },
    last_name:{
        type: String,
        required: true,
    },
    email:{
        type : String,
        required: true,
        unique : true,
    },
    job_title:{
        type : String,
    },
    gender:{
        type:String,
    }
},{timestamps: true}
);


const User = mongoose.model('user', userSchema);


//Middleware


// app.use((req,res,next)=>{
//     console.log("Hello I am from middleware");
//     res.json({msg:"Hello From Middle ware 1"});
//     req.myUserName = "Ranjay.Dev";
//     next();
// })


// app.use((req,res,next)=>{
//     console.log("Hello I am from middleware", req.myUserName);

//     next();
// })


app.use((req, res, next) => {
    fs.appendFile(
        'log.txt',
        `${Date.now()}: ${req.ip}: ${req.method} : ${req.path}\n`,
        (err) => {
            if (err) {
                console.error("Error writing to log file:", err);
            }
            next(); // move to next middleware
        }
    );
});




// for phone users
app.get('/users', async (req, res) => {
    const allDbUsers = await User.find({});
    const html = `
    <ul>
    ${allDbUsers.map((user) => `<li>${user.first_name}- ${user.email}</li>`).join('')}
    </ul>
    `;
    res.send(html);
});


// for browser
app.get('/api/users', async(req, res) => {
    const allDbUsers = await User.find({});
    console.log(req.headers);
    res.setHeader("X-myName","Prajapati Ranjay"); // custom header
    res.status(200).json(allDbUsers);

});


//post on mongodb

app.post("/api/users", async (req, res) => {
  try {
    const body = req.body;

    // 🔍 Validation
    if (
      !body.first_name ||
      !body.last_name ||
      !body.email ||
      !body.gender ||
      !body.job_title
    ) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // 🟢 Save to MongoDB
    const result = await User.create({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      gender: body.gender,
      job_title: body.job_title,
    });

    console.log("User Created:", result);

    return res.status(201).json({
      msg: "User created successfully",
      data: result
    });

  } catch (error) {
    return res.status(500).json({
      msg: "Server error",
      error: error.message
    });
  }
});


// POST: create a new user
// app.post('/api/users', (req, res) => {
//     const body = req.body;

//     if(!body || !body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
//         return res.status(400).json({msg:"All the fields is required"});
//     }

//     const newUser = { ...body, id: data.length + 1 };
//     data.push(newUser);

//     fs.writeFile("./MOCK_DATA.json", JSON.stringify(data, null, 2), (err) => {
//         if (err) {
//             return res.status(201).json({ status: "error", message: "Failed to write file" });
//         }
//         return res.json({ status: "success", id: newUser.id });
//     });
// });




// GET, PATCH, DELETE using route chaining
app.route('/api/users/:id')
    .get(async(req, res) => {
        const user = await User.findById(req.params.id);
    
        if(!user) return res.status(404).json({error :"user not found"})
        return res.json(user);
    })

    .patch(async(req, res) => {
        await User.findByIdAndUpdate(req.params.id, {lastName: 'Changed'})
        return res.json({status:"success"})
    })


    //Delete the user based on the id:-)
.delete(async(req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({status:"success"});
})



app.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`);
});
