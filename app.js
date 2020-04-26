const express = require("express");
const bodyparser = require("body-parser");
const app = express();
const https = require("https")
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static("public"));
app.listen( process.env.PORT , ()=>{

  console.log("server is running on posrt number 3000");

})
app.get("/", function(req,res){

  res.sendFile(__dirname + "/signup.html");

})
app.post("/", function(req,res){

  const fname = req.body.firstname;
  const lname = req.body.lastname;
  const email = req.body.email;
  console.log(fname);
  console.log(lname);
  console.log(email);
  var data ={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:
        {
          FNAME: fname,
          LNAME: lname
        }

      }
    ]
  };
  var jsonData = JSON.stringify(data);
  const url = "https://us8.api.mailchimp.com/3.0/lists/c6a8162e25";
  const options = {
    method: "POST",
    auth: "hardeep1:3f74401ef91bea61288d39a35413c96d-us8"
  }

  const req1 = https.request(url, options , (response) => {


      if(response.statusCode == "200")
      {


          res.sendFile(__dirname + "/success.html");


      }
      else
      {


          res.sendFile(__dirname + "/failure.html");


      }

    })

  // })
  req1.write(jsonData);
  req1.end();

});

app.post("/failure", function(req,res){

    res.redirect("/");


})





// url
// https://<dc>.api.mailchimp.com/3.0/lists
//apiKeys
//3f74401ef91bea61288d39a35413c96d-us8
//listid
//c6a8162e25
