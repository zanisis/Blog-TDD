const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp)

const Blog = require('../models/blog');
const should = chai.should()
const server = require('../app');

describe('Blog', ()=>{
  var newBlog_id = ''
  //masukin data dummy
  beforeEach((done)=>{
    var newBlog = new Blog({
      title: 'asd',
      content: 'content in',
      author_name: 'zazaran',
      author_phone: '1234567',
      email: 'zazaran@gmail.com'
    })

    newBlog.save((err, blog)=>{
      // console.log('ini id nya', blog._id);
      newBlog_id = blog._id
      done()
    })
  })

  afterEach((done)=>{
    Blog.remove({}, (err)=>{
      done()
    })
  })

  describe('Get - all Blogs', ()=>{
    it('should get all data', (done)=>{
      chai.request(server)
      .get('/api/blog')
      .end((err, result)=>{
        result.should.have.status(200)
        result.body.should.be.a('array')
        result.body.length.should.equal(1)

        done()
      })
    })
  })

  //describe with method POST
  describe('Post - create Blog', ()=>{
    it('should add a blog', (done)=>{
      chai.request(server)
      .post('/blog')
      .end((err, result)=>{
        result.should.have.status(200)
        result.body.should.be.a('object')

        done()
      })
    })
  })


  //describe with method PUT
  describe('PUT - edit blog', () => {
    it('should update specific field in the blog document', (done) => {

      // console.log("newBlog_id", newBlog_id);

      chai.request(server)
      .put('/edit/'+newBlog_id)
      .send({
        title: "Throwback Sunday"
      })
      .end( (err, result) => {
        // console.log('apakah',result.body);
        result.should.have.status(200)
        result.body.should.be.an('object')
        result.body.title.should.equal("Throwback Sunday")

        done()
      })

    });
  });

  describe('DELETE - delete blog', () => {
    it('should delete a blog', (done) => {
      chai.request(server)
      .delete('/delete/' + newBlog_id)
      .end( (err, result) => {
        // console.log('delete***', result);
        result.should.have.status(200)
        result.body.should.be.an('object')
        result.body.message.should.equal("has been delete")
        done()

        // get all blogs, if the array length is zero then it is correct
        // chai.request(server)
        // .get('/api/blogs')
        // .end( (err, result) => {
        //   result.should.have.status(200)
        //   result.body.should.be.an('array')
        //   result.body.length.should.equal(0)
        //   done()
        // })

      })

    });
  });



})