myApp.controller("themBacSiController", ['$scope', '$http', '$window', '$location', '$filter', 'Url', function ($scope, $http, $window, $location, $filter, Url) {
    $scope.bacSi = {};

    $scope.chooseImage = function () {
        // You can use the "CKFinder" class to render CKFinder in a page:
        var finder = new CKFinder();
        finder.selectActionFunction = function (fileUrl) {
            $scope.bacSi.anh = fileUrl;
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


    //Lấy idBacSi từ Url
    $scope.currentIdBacSi = Url.getParameterByName('id');

    //Nếu sửa thì trả về giá trị của BacSi
    if ($scope.currentIdBacSi) {
        $http.get('/API/BacSiAPI/' + $scope.currentIdBacSi)
            .success(function (data) {
                $scope.bacSi = {
                    id: data.id,
                    hoTen: data.hoTen,
                    diaChi: data.diaChi,
                    sdt: data.sdt,
                    ngaySinh: data.ngaySinh,
                    gioiTinh: data.gioiTinh,
                    email: data.email,
                    fb: data.fb,
                    zalo: data.zalo,
                    anh: data.anh,
                    chucVu: data.chucVu,
                    congViec: data.congViec,
                    thongTinKhac: data.thongTinKhac,
                    featured: data.featured,
                };
            });
    }
        //Không thì thiết lập giá trị mặc định
    else {
        $scope.bacSi = {
            featured: 0,
            gioiTinh: 0,
        };
    }


    //Lưu bacSi
    $scope.saveBacSi = function () {
        if ($scope.currentIdBacSi) {
            $http.put('/API/BacSiAPI/' + $scope.bacSi.id, $scope.bacSi)
            .success(function () {
                toastr.success('Thành công', 'Lưu BacSi');
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm BacSi')
            });
        } else {
            $http.post('/API/BacSiAPI/', $scope.bacSi)
            .success(function () {
                toastr.success('Thành công', 'Thêm BacSi');
                $window.location.href = '/Admin/BacSis';
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm BacSi');
            });
        }
    };
    //Lưu bài viết và Thoát
    $scope.saveBacSiAndExit = function () {
        if ($scope.currentIdBacSi) {
            $http.put('/API/BacSiAPI/' + $scope.bacSi.id, $scope.bacSi)
            .success(function () {
                $window.location.href = '/Admin/BacSis';
            })
            .error(function () {
                toastr.error('Thất bại', 'Lưu BacSi');
            });
        } else {
            $http.post('/API/BacSiAPI/', $scope.bacSi)
            .success(function () {
                $window.location.href = '/Admin/BacSis';
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm BacSi');
            });
        }
    };
    //Lưu bài viết và Thêm mới
    $scope.saveBacSiAndNew = function () {
        if ($scope.currentIdBacSi) {
            $http.put('/API/BacSiAPI/' + $scope.bacSi.id, $scope.bacSi)
            .success(function () {
                $window.location.href = '/Admin/BacSis/Create';
            })
            .error(function () {
                toastr.error('Thất bại', 'Lưu Danh mục')
            });
        } else {
            $http.post('/API/BacSisAPI/', $scope.bacSi)
            .success(function () {
                $window.location.href = '/Admin/BacSis/Create';
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm BacSi')
            });
        }
    };
    //Hủy bỏ
    $scope.cancel = function () {
        $window.location.href = '/Admin/BacSis';
    };

    //Nhập Title
    $scope.changeTitle = function () {
        //Tự tạo Alias
        $scope.bacSi.alias = Alias.genAlias($scope.bacSi.hoTen);
    };
}]);