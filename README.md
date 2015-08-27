## Using Angular with Express and Mongo / Monk to Persist Data

### Set Up
1. New up an Express App named `posts-workshop`
1. Install Angular and Bootstrap using Bower
  - `bower install angular`
  - `bower install bootstrap`
  - `touch .gitignore` and add `bower_components`
1. In your public directory:
  - `touch index.html`
  - `touch app.js`
1. Get it all wired up:
  - add `ng-app` to `<html>`
  - include the `angular.min.js` script in your `index.html`
  - include `bootstrap.min.css` in your `index.html`
  - from bootstrap grab a simple navbar and add it to your `index.html`
  - add `{{ 1 + 2 }}` somewhere in your `index.html`
  - Confirm that things are working
1. `git status` `git add -A` `git commit -m "initial commit"`

### Naming Our App and Using Controllers
1. Name your angular app like this: `ng-app='posts-workshop'`
1. In `app.js` declare a variable named `app` set it equal to a new angular module with your app name
  - EXAMPLE: `var app = angular.module('posts-workshop', [])`
1. In `app.js` let's create a controller named `ApplicationController`
1. In `ApplicationController` declare a `$scope` variable and give it some value.
1. In `index.html` add that variable somewhere
1. In `index.html` opening `<body>` tag add your controller
1. Confirm that things are working

### Using Partials and Routing

#### Part I - Partials
1. In your public directory `mkdir partials/posts.html`
1. In `posts.html` add `<h1>All Posts</h1>`
1. Look up how to include partials in angular and add that code to your `index.html`
1. Why isn't it working?

#### Part II - Routing in Angular
1. `bower install angular-route`
1. Include the `angular-route.min.js` script in your `index.html`
1. add `ngRoute` to your app module `var app = angular.module('posts-workshop', ['ngRoute'])`
1. Go to the angular docs and look for `config` instructions
1. Add a route for `'/'` that renders `posts.html` and uses our `ApplicationController`
1. Confirm that things are working
1. `git status` `git add -A` `git commit -m "wire up angular routes"`

### Seeding the Database

1. In your root directory `mkdir db` `touch db/seeds.js`
1. Tie it up to mongo / monk
  - declare a variable `db` that connects to `posts-workshop` (just use localhost for now)
    - `var db = require('monk')('localhost/posts-workshop')`
  - declare a variable `Post` that connects to `posts`
    - `var Post = db.get('posts')`
1. Add this data to `seeds.js`:

```

Post.remove({})

.then(function() {

  return Promise.all([
    Post.insert({
      title: "My Big Adventure",
      author: "Jeff Dean",
      image: "http://www.planwallpaper.com/static/images/image5_170127819.jpg",
      description: "Ode to Magritte",
      create_at: new Date
    }),

    Post.insert({
      title: "My Other Big Adventure",
      author: "Jeff Dean",
      image: "http://www.planwallpaper.com/static/images/tree-247122.jpg",
      description: "Church",
      create_at: new Date
    }),

    Post.insert({
      title: "My Third Big Adventure",
      author: "Jeff Dean",
      image: "http://www.planwallpaper.com/static/images/nasas-images-of-most-remarkable-events-you-cant-miss.jpg",
      description: "The meaning of life",
      create_at: new Date
    }),
  ])

})

.then(function(){
  db.close();
})

```

Now, seed the database! 
