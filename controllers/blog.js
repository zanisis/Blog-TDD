
const Blog = require('../models/blog');

let controller = {}

controller.findAll = (req, res, next) => {
  Blog.find({},(err, users)=>{
    if(err) throw err
    res.send(users)
  })
}

controller.create = (req, res, next) => {
  var newBlog = new Blog({
    tittle: req.body.title,
    content: req.body.content,
    author_name: req.body.name,
    author_phone: req.body.phone,
    email: req.body.email
  })

  // console.log(newBlog);
  newBlog.save((err, blog)=>{
    // console.log('ini error', err);
    res.send(blog)
  })
}

controller.delete =  (req,res,next)=>{
  Blog.findByIdAndRemove(req.params.id, (err, result)=>{
    // console.log('controller', result);
    if(err) throw err
    if(result){
      res.send({message: 'has been delete'})
    }
  })
}

controller.update = (req,res,next)=>{
  Blog.findById(req.params.id, (err, blog)=>{
    blog.title= req.body.title || blog.title,
    blog.content= req.body.content || blog.content,
    blog.author_name= req.body.name || blog.author_name,
    blog.author_phone= req.body.phone || blog.author_phone,
    blog.email= req.body.email || blog.email
    
    blog.save((err, result)=>{
      res.send(result)
    })
  })
}

module.exports = controller;