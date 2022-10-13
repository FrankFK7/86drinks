// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");
const bodyParser = require('body-parser');

const path = require('path');

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");
const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);
require("./config/session.config")(app);
const globalUserObject = require("./config/global-user.config");
app.use(globalUserObject);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// ................................................................// 

app.get ("users/: user", (req, res) => {
    console.log("the URL params", req.params)
})
app.get("/", (req, res) => res.render("index.hbs"))
  
// ................................................................// 

app.use(bodyParser.urlencoded({ extended: true}));

// default value for title local
const capitalized = require("./utils/capitalized");
const projectName = "86Cocktails";

app.locals.appTitle = `${capitalized(projectName)} `;

// 👇 Start handling routes here
const index = require("./routes/index.routes");
app.use("/", index);

const authRoutes = require("./routes/auth.routes");
app.use("/", authRoutes);

const cocktailsRoutes = require("./routes/cocktails.routes");
app.use("/", cocktailsRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);
module.exports = app;