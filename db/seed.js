var db = require('monk')('localhost/posts-workshop')
var Post = db.get('posts')

Post.remove({})

.then(function() {

  return Promise.all([
    Post.insert({
      title: "My Big Adventure",
      author: "Jeff Dean",
      image: "http://www.planwallpaper.com/static/images/image5_170127819.jpg",
      description: "guy fising in tux",
      created_at: new Date
    }),

    Post.insert({
      title: "My Other Adventure",
      author: "Jeff Dean",
      image: "http://www.planwallpaper.com/static/images/image5_170127819.jpg",
      description: "guy fising in tux",
      created_at: new Date
    }),

    Post.insert({
      title: "My Third Adventure",
      author: "Jeff Dean",
      image: "http://www.planwallpaper.com/static/images/image5_170127819.jpg",
      description: "guy fising in tux",
      created_at: new Date
    }),
  ])

})

.then(function(){
  db.close();
})
