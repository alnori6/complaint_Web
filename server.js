//1. npm intiation (express , express-validator, mysql2)
//npm init --yes
//npm install
//npm start (this is to run it here in terminal)
//npm install express
//npm install express-validator
//npm install mysql2
//npm install -g nodemon
//npm install multer

//to run in brows (localhost:9900)


//2. create server
const express = require('express');
const mysql = require("mysql2")
var serveStatic = require('serve-static'); 
//help with the validation berore sending the form to the database
const {check, validationResult}=require('express-validator');


//5 read user inout
//FILE HANDLING
const multer=require("multer");
const path=require("path");

const app = express();
const db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	port: "3306",
	database: "complaint_info",
})

//3.roating server | the fathe file name website_noora

// locate the statics files
// app.use("/css", express.static("../css"))
// app.use("/assets", express.static("../assets"))
// app.use("/js", express.static("../js"))
// app.use("/", express.static("../html"))

app.use('/html', express.static('./html'));
app.use('/js', express.static('./js'));
app.use('/assets', express.static('./assets'));
app.use('/css', express.static('./css'));
app.use('/font', express.static('./font'));


// app.use(express.static("../html"));


//help to send to database to read it
app.use(express.urlencoded({extended:false}));


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({ storage: storage })


const formValidateComplain = formValidate();
app.post('/index', formValidateComplain, upload.array("file"), (request, response)=>{
    //what comes from html
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
      return response.send(
        `<h1>Sorry, there were errors in your request:</h1><br> ${printError(
          errors.array()
        )}`
      )
    }
    
    

    const email = request.body.email;
    const airline = request.body.air;
    const iata = request.body.iata;
    const key = request.body.key;
    const station = request.body.station;
      const flight_Zip = request.body.flight_Zip;
      const flight_Number = request.body.flight_Number;
    const ticket = (flight_Zip + flight_Number).toString();
    const datePickerId = request.body.datePickerId;
    const inlineRadioOptions = request.body.inlineRadioOptions;
    const category = request.body.category;
    const reason = request.body.reason;
    const description = request.body.description;
    
    //let incriment_Num = "CC23000001";

    //GETTING FILES
    let file_name=[];
    request.files.forEach((item)=>{
        file_name.push(item.filename);
    })

    //const result1 = create_ref();
    const result = addinfo( 
      email, 
      airline, 
      iata, 
      key, 
      station, 
      ticket, 
      datePickerId, 
      inlineRadioOptions, 
      category, 
      reason, 
      description, 
      file_name)

    //the feedback of prenting the values that the user input
    if (result){
        return response.send("<p>Your Name: </p>"+referenceNumber+"<br><p>Email: </p>"+email+"<br><p>airline: </p>"+airline+"<br><p>iata: </p>"+iata
        +"<br><p>key: </p>"+key+"<br><p>station: </p>"+station+"<br><p>ticket:  </p>"+ticket+"<br><p>Required Details: </p>"+datePickerId+"<h3>OK go <a href='/'>home</a></h3>")
    } 
    return response.send("error saving data")
    

})




// const productsFormValidator = productsValidator()
// app.post("/products", productsFormValidator, (request, response) => {
// 	const errors = validationResult(request)

// 	if (!errors.isEmpty()) {
// 		return response.send(
// 			`<h1>Sorry, there were errors in your request:</h1><br> ${printError(
// 				errors.array()
// 			)}`
// 		)
// 	}

// 	const { product_name, product_count, product_sold } = request.body;

// 	const result = addProduct(product_name, product_count, product_sold)

// 	//the feedback of prenting the values that the user input
// 	if (result) {
// 		return response.send("<p>The Product info:</p><br><p>Product Name: </p>"+product_name
// 		+"<br><p>Product Quantity: </p>"+product_count+"<br><p>Sold: </p>"+product_sold
// 		+"<br><h3>OK go <a href='/'>home</a></h3>")
// 	}
// 	return response.send("error saving data")
// })



//4.server listening
app.listen(9900 , ()=>{
    console.log("SGS Service is here to help !!!")
})

// to print error message all witj the app.post
function printError(errArray){
  let errors = [];

  for (let index = 0; index < errArray.length; index++) {

      let err = errArray[index]["msg"];

      let msg = "<p>-"+err+"</p>";

      errors.push(msg);
  }

  return errors.join("")
}

//CALLING NEXT MIDDLEWARE
// function formValidate(){
function formValidate(){
  return[

    check('flight_Number')
      .isLength({min:4,max:5})
      .withMessage('Mobile must be 4 to 5 digits')//length
      .isNumeric().withMessage('Must consist of numbers only')//type
      .trim().escape(),

    check('email')
      .isLength({min:2,max:100}).withMessage('Email must be between 2 and 100 chars in length')//length
      .trim()
      .escape()
  ]
}

// function productsValidator() {
// 	return [
// 		check("product_name")
// 			.isLength({ min: 1, max: 100 })
// 			.withMessage("Product name must be between 1 and 100 chars in length")
// 			.trim()
// 			.escape(),
//     ]
// }


const code = "CC";
let currentYear = new Date().getFullYear();
const year = currentYear.toString().slice(-2)
let refNum = ""

//7. connect to db
function addinfo(email, airline, iata, key, station, ticket, datePickerId, inlineRadioOptions, category, reason, description, file_name){
  db.connect(function(err){
    if(err) {throw err;}
    
    console.log("Database --- Connected --- Successfully");
    //change userform
    let sql = `INSERT INTO page1( email, airline, IATA, key, station, flight_num, flight_date, area, category, reason, description, document) VALUES ( '${email}','${airline}', '${iata}','${key}', '${station}','${ticket}', '${datePickerId}','${inlineRadioOptions}', '${category}','${inlineRadioOptions}', '${reason}','${description}', '${file_name}')`
    
    db.query(sql,function(err, result){
      if(err) {throw err;}
      console.log("Data --- Inserted --- Successfully");
    })

    
  })
  return true
}

function create_ref(){
  db.connect(function(err) {
    if(err) {throw err;}
    
    console.log("Database --- Connected to Ref Comlumn--- Successfully");

    let query = 'SELECT * FROM page1 WHERE ref_num IN ( SELECT MAX(ref_num) FROM page1 )';
    
    db.query(query, (err, result, fields) => {

      if (err) {
        console.error('Error executing query: ' + err.stack);
        return;
      }
    
      // Get the last 6 digits of the reference number from the query result
      const lastSixDigits = result[0].ref_num.slice(-6);
    
      let digits = lastSixDigits.toString().split("");
      // Loop through the digits from right to left
      for (let i = digits.length - 1; i >= 0; i--) { 
    
          // If the digit is 9, set it to 0 and continue to the next digit
          if (digits[i] === "9") { 
              digits[i] = "0";
          } else { 
              // Otherwise, increment the digit and exit the loop
              digits[i]++;
              break;
          }
      }
    
      // Update the reference number with the new last 6 digits
      let referenceNumber = code + year + digits.join("");

      let ref_insert = '';

    })
  })
  return true
}



