frontApp.controller("videoController", ['$scope', '$http', '$window', '$sce', function ($scope, $http, $window, $sce) {
    $scope.videos = [];
    $scope.video = {};

    $http.get('/API/VideoAPI/')
        .success(function (data) {
            angular.forEach(data, function (value, key) {
                data[key].link_video = $sce.trustAsResourceUrl(value.link_video)
                if (key == 0) {
                    $scope.video = value;
                }
            });
            $scope.videos = data;
        })
}]);