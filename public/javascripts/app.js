var app = angular.module('Posts-Practice', ['ui.router']);


app.config(function($stateProvider, $urlRouterProvider) {

  // $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('/', {
      url: '/',
      templateUrl: '../partials/posts.html'
    });

});


app.controller('PostsController', ['$scope', '$http', function($scope, $http) {

  $scope.controllerTest  = "CTRL WERK.";

}]);

app.factory('PostsService', function ($http) {
  return {
    all: function() {
      return $http.get('/api/posts').then(function (response) {
        return response.data;
      })
    }
  }
})
