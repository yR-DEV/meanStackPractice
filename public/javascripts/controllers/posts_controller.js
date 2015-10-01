app.controller('PostsController', function ($scope, PostsService) {
  $scope.show = false;

  $scope.showForm = function () {
    $scope.show = !$scope.show;
  }
  PostsService.all().then(function (posts) {
    $scope.posts = posts;
  })
})
