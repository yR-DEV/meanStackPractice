var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/posts-workshop');

var Post = mongoose.model('Post', new Schema({
  title: String,
  author: String,
  image: String,
  description: String
}));

var post1 = new Post({
  title: "My Big Adventure",
  author: "Jeff Dean",
  image: "http://www.planwallpaper.com/static/images/image5_170127819.jpg",
  description: "guy fising in tux",
});

var post2 = new Post({
  title: "My Other Adventure",
  author: "Jeff Dean",
  image: "http://www.planwallpaper.com/static/images/image5_170127819.jpg",
  description: "guy fising in tux",
});

var post3 = new Post({
  title: "My Third Adventure",
  author: "Jeff Dean",
  image: "http://www.planwallpaper.com/static/images/image5_170127819.jpg",
  description: "guy fising in tux",
});

post1.save(function(err) {
  if(err) {
    return err;
  }
});

post2.save(function(err) {
  if(err) {
    return err;
  }
});

post3.save(function(err) {
  if(err) {
    return err;
  }
});

// Post.remove({})
//
// .then(function() {
//
//   return Promise.all([
//     Post.insert({
//       title: "My Big Adventure",
//       author: "Jeff Dean",
//       image: "http://www.planwallpaper.com/static/images/image5_170127819.jpg",
//       description: "guy fising in tux",
//     }),
//
//     Post.insert({
//       title: "My Other Adventure",
//       author: "Jeff Dean",
//       image: "http://www.planwallpaper.com/static/images/image5_170127819.jpg",
//       description: "guy fising in tux",
//     }),
//
//     Post.insert({
//       title: "My Third Adventure",
//       author: "Jeff Dean",
//       image: "http://www.planwallpaper.com/static/images/image5_170127819.jpg",
//       description: "guy fising in tux",
//     }),
//   ])
//
// })
//
// .then(function(){
//   db.close();
// })
