const express = require('express');
const mongoose = require('mongoose');
const blogRouter = require('./routes/blogs');
const Blog = require('./models/blogs');
const methodOverride = require('method-override')
const app = express();


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/debbs-blog');
//set view engine
app.set('view engine', 'ejs')


app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

//static files
app.use(express.static("public"))
//main route
app.get('/', async (request, response) => {
    let blogs = await Blog.find().sort({ createdAt: 'desc' })
    response.render('index', { blogs: blogs })
})
//use blog router
app.use('/blogs', blogRouter);
// start the server listening for requests
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));
