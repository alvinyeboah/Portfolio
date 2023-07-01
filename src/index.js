const express = require("express");
const nodemailer = require("nodemailer");

const app = express();
const port = 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("src"));
app.use(express.urlencoded({ extended: false }));

// Create a transporter using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "alvinyeboah5@gmail.com",
    pass: "ocvdtvcredakxejr",
  },
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", bodyParser.urlencoded({ extended: false }), (req, res) => {
  const { gname, gmail, cname, cage, message } = req.body;

  // Create a message object with form data
  const mailOptions = {
    from: gmail,
    to: "alvinyeboah5@gmail.com",
    subject: "Form Submission",
    text: `
      Guardian Name: ${gname}
      Guardian Email: ${gmail}
      Child Name: ${cname}
      Child Age: ${cage}
      
      Message: 
      ${message}
    `,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error:", error);
      res.send(__dirname + "/error.html");
    } else {
      console.log("Email sent:", info.response);
      res.sendFile(__dirname + "/formsubmit.html");
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
