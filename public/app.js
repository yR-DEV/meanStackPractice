var app = angular.module('posts-workshop', ['ngRoute']);

app.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: '/partials/posts.html',
    controller: 'PostsController'
  })
})

app.controller('PostsController', function ($scope, PostsService) {
  $scope.hello = "IN THE POSTS"
  // PostsService.all().then(function (posts) {
  //   $scope.posts = posts;
  // })
})


app.factory('PostsService', function ($http) {
  var posts;
  return {
    all: function() {
      $http.get('/api/posts').then(function (response) {
        posts = response.data;
        return posts;
      })
    }
  }
})
