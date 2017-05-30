frontApp.controller("bannerController", ['$scope', '$http', '$window', function ($scope, $http, $window) {
    $scope.banners = [];

    $http.get('/API/BannerAPI/')
        .success(function (data) {
            $scope.banners = data;
        })
}]);