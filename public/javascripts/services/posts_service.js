app.factory('PostsService', function ($http) {
  return {
    all: function() {
      return $http.get('/api/posts').then(function (response) {
        return response.data;
      })
    }
  }
})
