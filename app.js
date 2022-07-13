const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", (req, res) => {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);

    const url = "https://us14.api.mailchimp.com/3.0/lists/968fa31da7";

    const options = {
        method: "POST",
        auth: "ankit:45adb67162741e698da816c97bb53941-us14"
    }

    const request = https.request(url, options, (response) =>{
        if (response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }   else {              
            res.sendFile(__dirname + "/failure.html");  
        }
        response.on("data", (data) => {
            console.log(JSON.parse(data));
        });
    });

    app.post("/failure", (req, res) => {
        res.redirect("/");
    });

    // request.write(jsonData);
    request.end();


});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running on port 3000");
})


// API KEY
// 45adb67162741e698da816c97bb53941-us14

// list ID
// 968fa31da7  