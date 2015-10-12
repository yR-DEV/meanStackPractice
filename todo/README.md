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
  - include the `angular.min.js` script in your `index.html` (from `bower_components`)
  - include `bootstrap.min.css` in your `index.html` (from `bower_components`)
  - from bootstrap grab a simple navbar and add it to your `index.html`
  - add `{{ 1 + 2 }}` somewhere in your `index.html`
  - Confirm that things are working
1. `git status` `git add -A` `git commit -m "initial commit"`

### Adding an Angular Module and Using Controllers
1. Name your angular app by adding to `ng-app` like this: `ng-app='posts-workshop'`
1. In `app.js` declare a variable named `app` set it equal to a new angular module with your app name
  - EXAMPLE: `var app = angular.module('posts-workshop', [])`
1. In `app.js` let's create a controller named `PostsController`
1. In `PostsController` declare a `$scope` variable and give it some value.
1. In `index.html` add that variable somewhere
1. In `index.html` opening `<body>` tag add your controller
  `ng-controller='PostsController'`
1. Confirm that things are still working

### Using Partials and Routing

#### Part I - Partials
1. In your public directory `mkdir partials/posts.html`
1. In `posts.html` add `<h1>All Posts</h1>`
1. Look up how to include partials in angular and add that code to your `index.html`
1. Why isn't it working? (stay calm and read on)

#### Part II - Routing in Angular
1. `bower install angular-route`
1. Include the `angular-route.min.js` script in your `index.html`
1. add `ngRoute` to your app module `var app = angular.module('posts-workshop', ['ngRoute'])`
1. Go to the angular docs and look for `config` instructions
  (Google "using Angular ngRoute" and see what you can find!)
1. Add a route for `'/'` that renders `posts.html` and uses our `PostsController`
1. Confirm that things are working
1. `git status` `git add -A` `git commit -m "wire up angular routes"`

### Seeding the Database

1. In your root directory `mkdir db` `touch db/seed.js`
1. Tie it up to mongo / monk - in `seed.js` add the following:
  - declare a variable `db` that connects to `posts-workshop` (just use localhost for now)
    - `var db = require('monk')('localhost/posts-workshop')`
  - declare a variable `Post` that connects to `posts`
    - `var Post = db.get('posts')`
1. Add the data below to `seed.js`:

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

Now, seed the database! (`node db/seed.js`)

### Let's Check In

By now, you should have a basic Angular app that uses one controller and renders
one partial using angular-route ($routeProvider).

```
// app.js

var app = angular.module('posts-workshop', ['ngRoute']);

app.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: '/partials/posts.html',
    controller: 'PostsController'
  })
})

```

__somewhere in `index.html` you should have `<div ng-view></div>` - this tells
Angular where to render your partials.__

### Displaying Posts in the View

__Excellent. Now we're onto to showing our posts.__

Here's a checklist of the things we'll need to do to make this happen:

1. Make a call to an Express route and get all of our posts
  * `$http` request to an Express route
  * Express route makes a call to our database and sends a `json` response
2. Assign the response to a `$scope` variable that we can use in our view
3. In our view, iterate through our array of posts and display the following:
  * image
  * title
  * author
  * description
  * created at
  * add some bootstrap along the way to make it look nice

Let's start from the top.

#### Step 1: Making a call to our Express route using an Angular Service

To keep things simple and just focus on the nuts and bolts here, we're going to
keep all of our code in `app.js`. Let's add a service that will make our database
call for us.

__NOTE__: Remember when you created functions outside of your Express routes
that made your database calls for you and just passed the response back to your
route? Using a service in Angular is similar, in that we do this to keep our code
neatly organized, practicing "single responsibility and separation of concerns".
There's also a concept in MVC of keeping your controllers "skinny". Do some Googling
later and read more about that.

__Adding a service to `app.js` - I'm going to give you this one for free__

```
app.factory('PostsService', function ($http) {
  return {
    all: function() {
      return $http.get('/api/posts').then(function (response) {
        return response.data;
      })
    }
  }
})

```

Ok, I gave you the code for free, but take a minute to look it over and really
see what's happening here. What does my `PostsService` do?

_No, seriously, what is it doing? I'll wait._

The truth is, our service isn't doing much, it's the function inside that's doing
all the heavy lifting. The service itself is simply returning an __object__. That
object has a __property__ on it whose __value__ is a __function__. That function is making
an __http request__ to our backend! And because this is a full stack app, we can just
make that call to `/api/posts` (or whatever your route is named). Isn't that nice
and clean? Our `all` function has one itty bitty responsibility - to go get all of our posts.

__Wait, what? We don't have an Express route called `/api/posts`__

You're right. Go make one. You've done this before. You're just back in your Express
routes making a call to your database and getting a response. But instead of rendering
a page, your going to send back `json`.

* Delete the `users.js` route, we're not going to use it.
* Rename `index.js` to `api.js`
* What changes do you need to make in your Express `app.js` to make this route a
working route. You've done this a million times by now.

__In `api.js`:__

* connect to your database (see `seed.js` if you need help)
* connect to our posts collection (see `seed.js` if you need help)
* add a get route for `/posts`
* make a call to your database and retrieve all of our posts (use a promise)
* then use `render.json(response)` to give the data to your front end.

__How do you know if you've done it right?__

Go to `http://localhost:3000/api/posts`. You should see a `json` object of your
posts.

#### Step 2: Assign the response to a `$scope` variable

Ok. We have a service that makes a call to our backend to get all of our posts
from the database. Now, let's use that service in our `PostsController` to serve
our posts to the view.

What we'll need to do:

* inject `PostsService` into our `PostsController` so we can use it
* call the `all` function in our controller to get the posts
* assign the result to a `$scope` variable so we can access our posts in the view

Right now, you're `PostsController` should look like this:

```
// app.js
app.controller('PostsController', function ($scope) {

})
```
Not much going on there, which is kind of nice. We can just focus on making this
one thing happen right now (getting the posts to our view!).

* Inject `PostsService` into our controller.
* Call the `all` function to retrieve our posts (use a promise here too)
  - __remember:__ Our service returns an _object_ that has a _property_ `all` that
  is a _function_. So, how do we call that function here?
* Declare a `$scope` variable called `posts` and set its value to the response
you get from calling the `all` function.

Ok, your controller should now look something like this:

```
// app.js

app.controller('PostsController', function ($scope, PostsService) {
  PostsService.all().then(function (posts) {
    $scope.posts = posts;
  })
})
```

__Confirm that your function is getting back the `json` response from your backend__

What's the simplest way to do this? `console.log` the response you're getting from
the invoked function and confirm that you've got your post objects.

#### Step 3: Iterate through our posts in the view

By now, you've done this many many times. The heavy lifting is done and all you
have to do is display the fruits of your labor.

__In our view, iterate through our array of posts and display the following:__
  * image
  * title
  * author
  * description
  * created at (remember, Angular has directives to help you format this)
  * add some bootstrap along the way to make it look nice


__NOTE:__ Notice how using a `seed.js` file helped us to get a lot of things up
and running in our app without having to have full CRUD functionality from the get go.

__How could you better organize this code now that you have an idea how things work and what you want to do?__

* in your `javascripts` directory `mkdir controllers`
* `touch controllers/posts_controller.js`
* in your `javascripts` directory `mkdir services`
* `touch services/posts_service.js`

__Now just move the chunks of code into their respective files and make sure everything still works. There's one detail left here that I haven't mentioned. I'll let you figure it out. If things aren't working, remember to go into your browser console and check for helpful errors.__

### Woo hoo! You've done it!

Ok, well sort of :D Let's keep going.

### Take what we've done so far and apply it. CRUD

We've already done READ. See if you can wire up the rest.

Here's your check list. All of this should be in your wheelhouse.

__1. Add a form so users can add new posts.__

__2. Send form data to your back end__
  * add another function to your PostsService that sends the data to an Express route.
    What's a good name for that function? How about `create`?
  * create an Express route. What `http` verb do we use to post data? What
    should the path be?

__Next, do delete or update. Stay calm and think things through. Have fun and explore.
Make mistakes and don't worry about them!__
