frontApp.controller("homeController", ['$scope', '$http', '$window', function ($scope, $http, $window) {
    $scope.dichVus = [];
    $scope.tinTucs = [];
    $scope.bacSis = [];
    $scope.images = [];

    $http.get('/API/PostsAPI?att=postHome&&value=' + 2)
        .success(function (data) {
            $scope.dichVus = data;
        })

    $http.get('/API/PostsAPI?att=postHome&&value=' + 3)
        .success(function (data) {
            $scope.tinTucs = data;
        })

    $http.get('/API/BacSiAPI?att=bacSiHome&&value=' + 3)
        .success(function (data) {
            $scope.bacSis = data;
        })

    $http.get('API/ImagesAPI?att=imageHome&&value=' + 6)
       .success(function (data) {
           $scope.images = data;
       })
}]);