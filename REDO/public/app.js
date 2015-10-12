var app = angular.module('posts-workshop', ['ngRoute']);

app.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: '/partials/posts.html',
    controller: 'PostsController'
  })
})
