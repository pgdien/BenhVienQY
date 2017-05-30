myApp.controller("themVideoController", ['$scope', '$http', '$window', '$location', '$filter', '$sce', 'Url', function ($scope, $http, $window, $location, $filter, $sce, Url) {
    $scope.video = {};

    $scope.chooseImage = function () {
        // You can use the "CKFinder" class to render CKFinder in a page:
        var finder = new CKFinder();
        finder.selectActionFunction = function (fileUrl) {
            $scope.video.image = fileUrl;
            $scope.$apply();
        };
        finder.SelectFunction = 'ShowFileInfo';
        finder.popup();
    }


    function selectFileWithCKFinder(elementId) {
        var finder = new CKFinder();
        CKFinder.popup({
            chooseFiles: true,
            width: 800,
            height: 600,
            onInit: function (finder) {
                alert("Yes");
                finder.on('files:choose', function (evt) {
                    var file = evt.data.files.first();
                    elementId = file.getUrl();
                });

                finder.on('file:choose:resizedImage', function (evt) {
                    elementId = evt.data.resizedUrl;
                });
            }
        });
    }


    //Lấy idVideo từ Url
    $scope.currentIdVideo = Url.getParameterByName('id');

    //Nếu sửa thì trả về giá trị của Video
    if ($scope.currentIdVideo) {
        $http.get('/API/VideoAPI/' + $scope.currentIdVideo)
            .success(function (data) {
                $scope.video = {
                    id: data.id,
                    title: data.title,
                    note: data.note,
                    description: data.description,
                    link_video: data.link_video,
                    link_post: data.link_post
                };
                $scope.link_video = $sce.trustAsResourceUrl($scope.video.link_video);
            });
    }
        //Không thì thiết lập giá trị mặc định
    else {
    }


    //Lưu banner
    $scope.save = function () {
        if ($scope.currentIdVideo) {
            $http.put('/API/VideosAPI/' + $scope.video.id, $scope.video)
            .success(function () {
                toastr.success('Thành công', 'Lưu Video');
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm Video')
            });
        } else {
            $http.post('/API/VideosAPI/', $scope.video)
            .success(function () {
                toastr.success('Thành công', 'Thêm Video');
                $window.location.href = '/Admin/Videos';
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm Video');
            });
        }
    };
    //Lưu bài viết và Thoát
    $scope.saveAndExit = function () {
        if ($scope.currentIdVideo) {
            $http.put('/API/VideosAPI/' + $scope.video.id, $scope.video)
            .success(function () {
                $window.location.href = '/Admin/Videos';
            })
            .error(function () {
                toastr.error('Thất bại', 'Lưu Video');
            });
        } else {
            $http.post('/API/VideoAPI/', $scope.video)
            .success(function () {
                $window.location.href = '/Admin/Videos';
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm Video');
            });
        }
    };
    //Lưu bài viết và Thêm mới
    $scope.saveAndNew = function () {
        if ($scope.currentIdVideo) {
            $http.put('/API/VideoAPI/' + $scope.video.id, $scope.video)
            .success(function () {
                $window.location.href = '/Admin/Videos/Create';
            })
            .error(function () {
                toastr.error('Thất bại', 'Lưu Danh mục')
            });
        } else {
            $http.post('/API/VideoAPI/', $scope.video)
            .success(function () {
                $window.location.href = '/Admin/Videos/Create';
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm Video')
            });
        }
    };
    //Hủy bỏ
    $scope.cancel = function () {
        $window.location.href = '/Admin/Videos';
    };

    //Nhập Title
    $scope.changeTitle = function () {
        //Tự tạo Alias
        //$scope.video.alias = Alias.genAlias($scope.video.title);
    };

    $scope.changeVideo = function () {
        $scope.link_video = $sce.trustAsResourceUrl($scope.video.link_video);
    };
}]);