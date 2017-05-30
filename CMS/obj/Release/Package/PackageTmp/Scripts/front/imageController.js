frontApp.controller("ImageController", ['$scope', '$http', '$window', function ($scope, $http, $window) {
    $scope.images = [];
    $scope.relatedImages = [];
    $scope.image = {};
    $scope.id = angular.element('#idImage').val();

    $http.get('/API/ImagesAPI')
        .success(function (data) {
            $scope.images = data;
        })

    $http.get('/API/ImagesAPI/' + $scope.id)
       .success(function (data) {
           $scope.image = data;
           //$scope.image.content = $sce.trustAsHtml(data.content);
       });

    //Bài viết cùng chuyên mục
    $http.get('/API/ImagesAPI?att=imageTuongTu&&value=' + $scope.id)
        .success(function (data) {
            $scope.relatedImages = data;
        });
}]);