require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')
const PORT = process.env.PORT || 5050;
const expressSession = require('express-session');
const passport = require('passport');
const fileUpload = require('express-fileupload');

require("./auth/passportGoogleSSO");

app.use(express.json());
// Enable CORS (with additional config options required for cookies)
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Include express-session middleware (with additional config options required for Passport session)
app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(fileUpload());

const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const commentRoutes = require('./routes/commentRoutes');
const ingredientRoutes = require('./routes/ingredientRoutes');
const loginWithGoogleApi = require('./routes/auth')

app.get('/', (_req, res) => {res.send("Welcome to my API");});
app.use('/public', express.static('./public/images'));

app.use('/auth',loginWithGoogleApi);
app.use('/user', userRoutes);
app.use('/recipe', recipeRoutes);
app.use('/comment', commentRoutes);
app.use('/ingredient', ingredientRoutes)

app.listen(PORT || 5050, () => {
  console.log(`running at http://localhost:${PORT}`);
});
