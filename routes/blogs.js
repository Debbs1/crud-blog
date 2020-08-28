//routes related to blogs
//innit express
const express = require('express');
const router = express.Router();
const Blog = require('./../models/blogs');
const { response } = require('express');
//new view
router.get('/new', (request, response) => {
    response.render('blogs/new', { blog: new Blog() });
})
//edit view
router.get('/edit/:id', async (request, response) => {
    let blog = await Blog.findById(request.params.id)
    response.render('blogs/edit', { blog: blog });
})

//view router
router.get('/:id', async (request, response) => {
    let blog = await Blog.findById(request.params.id)
    //check if there is something
    if (blog == null) {
        response.redirect('/');
    }
    response.render('blogs/show', { blog: blog });
});


//new post
router.post('/', async (request, response) => {
    let blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        description: request.body.description
    });
    console.log(blog);
    try {
        blog = await blog.save();
        response.redirect(`/blogs/${blog.id}`);
    } catch (error) {
        //TODO return errors
        console.log(error);
        response.render('blogs/new', { blog: blog })
    }

});

//update post
router.put('/:id', async (request, response) => {
    request.blog = await Blog.findById(request.params.id);
    let blog = request.blog;
    blog.title = request.body.title;
    blog.author = request.body.author;
    blog.description = request.body.description;

    console.log(blog);
    try {
        blog = await blog.save();
        response.redirect(`/blogs/${blog.id}`);
    } catch (error) {
        //TODO return errors
        console.log(error);
        response.render('blogs/edit', { blog: blog })
    }
})

//delete post

router.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id);
    response.redirect('/');
})
module.exports = router