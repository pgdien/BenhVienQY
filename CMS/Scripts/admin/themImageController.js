myApp.controller("themImageController", ['$scope', '$http', '$window', '$location', '$filter', 'Alias', 'MenuMultiLevel', 'Url', function ($scope, $http, $window, $location, $filter, Alias, MenuMultiLevel, Url) {
    $scope.image = {};

    $scope.chooseImage = function () {
        // You can use the "CKFinder" class to render CKFinder in a page:
        var finder = new CKFinder();
        finder.selectActionFunction = function (fileUrl) {
            $scope.image.anh = fileUrl;
            $scope.$apply();
        };
        finder.SelectFunction = 'ShowFileInfo';
        finder.popup();
    }


    function selectFileWithCKFinder(elementId) {
        var finder = new CKFinder();
        config.selectMultiple = true;
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


    //Lấy id từ Url
    $scope.currentIdImage = Url.getParameterByName('id');

    //Nếu sửa thì trả về giá trị của Image
    if ($scope.currentIdImage) {
        $http.get('/API/ImagesAPI/' + $scope.currentIdImage)
            .success(function (data) {
                $scope.image = {
                    id: data.id,
                    timeCreated: data.timeCreated,
                    timeModified: data.timeModified,
                    title: data.title,
                    alias: data.alias,
                    content: data.content,
                    note: data.note,
                    description: data.description,
                    published: data.published,
                    anh: data.anh,
                    tags: data.tags,
                    deleted: data.deleted,
                    featured: data.featured,
                    metadescription: data.metadescription,
                    metakewords: data.metakewords,
                    author: data.author,
                    robots: data.robots,
                };
            });
    }
        //Không thì thiết lập giá trị mặc định
    else {
        $scope.image = {
            published: 1,
            featured: 0,
            robots: 'Index, Follow',
            timeCreated: new Date(),
            timeModified: new Date()
        };
    }

    //Lấy danh sách Category gán cho $scope.categories
    $http.get('/API/CategoriesAPI/').success(function (data) { $scope.categories = MenuMultiLevel.getDropdownMenu(data); });

    //Lưu bài viết
    $scope.saveImage = function () {
        //if ($scope.currentIdImage) {
        //    $scope.image.timeModified = new Date()
        //    $http.put('/API/ImagesAPI/' + $scope.image.id, $scope.image)
        //    .success(function () {
        //        toastr.success('Thành công', 'Lưu thư viện ảnh');
        //    })
        //    .error(function () {
        //        toastr.error('Thất bại', 'Thêm thư viện ảnh')
        //    });
        //} else {
        //    $http.post('/API/ImagesAPI/', $scope.image)
        //    .success(function () {
        //        toastr.success('Thành công', 'Thêm thư viện ảnh');
        //        $window.location.href = '/Admin/Images';
        //    })
        //    .error(function () {
        //        toastr.error('Thất bại', 'Thêm thư viện ảnh');
        //    });
        //}



        console.log($scope.image.anh);
    };
    //Lưu bài viết và Thoát
    $scope.saveImageAndExit = function () {
        if ($scope.currentIdImage) {
            $scope.image.timeModified = new Date()
            $http.put('/API/ImagesAPI/' + $scope.image.id, $scope.image)
            .success(function () {
                $window.location.href = '/Admin/Images';
            })
            .error(function () {
                toastr.error('Thất bại', 'Lưu thư viện ảnh');
            });
        } else {
            $http.post('/API/ImagesAPI/', $scope.image)
            .success(function () {
                $window.location.href = '/Admin/Images';
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm thư viện ảnh');
            });
        }
    };
    //Lưu bài viết và Thêm mới
    $scope.saveImageAndNew = function () {
        if ($scope.currentIdImage) {
            $scope.image.timeModified = new Date()
            $http.put('/API/ImagesAPI/' + $scope.image.id, $scope.image)
            .success(function () {
                $window.location.href = '/Admin/Images/Create';
            })
            .error(function () {
                toastr.error('Thất bại', 'Lưu Danh mục')
            });
        } else {
            $http.post('/API/ImagesAPI/', $scope.image)
            .success(function () {
                $window.location.href = '/Admin/Images/Create';
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm thư viện ảnh')
            });
        }
    };
    //Hủy bỏ
    $scope.cancel = function () {
        $window.location.href = '/Admin/Images';
    };

    //Nhập Title
    $scope.changeTitle = function () {
        //Tự tạo Alias
        $scope.image.alias = Alias.genAlias($scope.image.title);
    };
}]);