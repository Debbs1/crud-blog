const express = require('express');
const mongoose = require('mongoose');
const blogRouter = require('./routes/blogs');
const Blog = require('./models/blogs');
const methodOverride = require('method-override')
const app = express();


//connect to db
mongoose.connect('mongodb://localhost/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
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
app.listen(5000) 