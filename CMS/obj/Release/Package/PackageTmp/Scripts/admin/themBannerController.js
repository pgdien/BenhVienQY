myApp.controller("themBannerController", ['$scope', '$http', '$window', '$location', '$filter', 'Url', function ($scope, $http, $window, $location, $filter, Url) {
    $scope.banner = {};

    $scope.chooseImage = function () {
        // You can use the "CKFinder" class to render CKFinder in a page:
        var finder = new CKFinder();
        finder.selectActionFunction = function (fileUrl) {
            $scope.banner.image = fileUrl;
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


    //Lấy idBanner từ Url
    $scope.currentIdBanner = Url.getParameterByName('id');

    //Nếu sửa thì trả về giá trị của Banner
    if ($scope.currentIdBanner) {
        $http.get('/API/BannerAPI/' + $scope.currentIdBanner)
            .success(function (data) {
                $scope.banner = {
                    id: data.id,
                    title: data.title,
                    ghichu: data.ghichu,
                    description: data.description,
                    image: data.image,
                    link: data.link,
                    text_link: data.text_link
                };
            });
    }
        //Không thì thiết lập giá trị mặc định
    else {
    }


    //Lưu banner
    $scope.saveBanner = function () {
        if ($scope.currentIdBanner) {
            $http.put('/API/BannerAPI/' + $scope.banner.id, $scope.banner)
            .success(function () {
                toastr.success('Thành công', 'Lưu Banner');
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm Banner')
            });
        } else {
            $http.post('/API/BannerAPI/', $scope.banner)
            .success(function () {
                toastr.success('Thành công', 'Thêm Banner');
                $window.location.href = '/Admin/Banners';
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm Banner');
            });
        }
    };
    //Lưu bài viết và Thoát
    $scope.saveBannerAndExit = function () {
        if ($scope.currentIdBanner) {
            $http.put('/API/BannerAPI/' + $scope.banner.id, $scope.banner)
            .success(function () {
                $window.location.href = '/Admin/Banners';
            })
            .error(function () {
                toastr.error('Thất bại', 'Lưu Banner');
            });
        } else {
            $http.post('/API/BannerAPI/', $scope.banner)
            .success(function () {
                $window.location.href = '/Admin/Banners';
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm Banner');
            });
        }
    };
    //Lưu bài viết và Thêm mới
    $scope.saveBannerAndNew = function () {
        if ($scope.currentIdBanner) {
            $http.put('/API/BannerAPI/' + $scope.banner.id, $scope.banner)
            .success(function () {
                $window.location.href = '/Admin/Banners/Create';
            })
            .error(function () {
                toastr.error('Thất bại', 'Lưu Danh mục')
            });
        } else {
            $http.post('/API/BannersAPI/', $scope.banner)
            .success(function () {
                $window.location.href = '/Admin/Banners/Create';
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm Banner')
            });
        }
    };
    //Hủy bỏ
    $scope.cancel = function () {
        $window.location.href = '/Admin/Banners';
    };

    //Nhập Title
    $scope.changeTitle = function () {
        //Tự tạo Alias
        $scope.banner.alias = Alias.genAlias($scope.banner.title);
    };
}]);