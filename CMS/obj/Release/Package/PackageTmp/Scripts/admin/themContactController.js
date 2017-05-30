myApp.controller("themContactController", ['$scope', '$http', '$window', '$location', '$filter', 'Url', function ($scope, $http, $window, $location, $filter, Url) {
    $scope.Contact = {};

    //Lấy idOrder từ Url
    $scope.currentIdContact = Url.getParameterByName('idContact');

    //Nếu sửa thì trả về giá trị của Order
    if ($scope.currentIdContact) {
        $http.get('/API/ContactAPI/' + $scope.currentIdContact)
            .success(function (data) {
                $scope.Contact = {
                    idContact: data.idContact,
                    hoten: data.hoten,
                    diachi: data.diachi,
                    sdt: data.sdt,
                    email: data.email,
                    title: data.title,
                    content: data.content,
                };
            });
    }
        //Không thì thiết lập giá trị mặc định
    else {
    }


    //Lưu Contact
    $scope.saveOrder = function () {
        if ($scope.currentIdOrder) {
            $http.put('/API/OrderAPI/' + $scope.Order.idOrder, $scope.Order)
            .success(function () {
                toastr.success('Thành công', 'Lưu Order');
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm Order')
            });
        } else {
            $http.post('/API/OrderAPI/', $scope.Order)
            .success(function () {
                toastr.success('Thành công', 'Thêm Order');
                $window.location.href = '/Admin/Orders';
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm Order');
            });
        }
    };
    ////Lưu bài viết và Thoát
    //$scope.saveOrderAndExit = function () {
    //    if ($scope.currentIdOrder) {
    //        $http.put('/API/OrderAPI/' + $scope.Order.idOrder, $scope.Order)
    //        .success(function () {
    //            $window.location.href = '/Admin/Orders';
    //        })
    //        .error(function () {
    //            toastr.error('Thất bại', 'Lưu Order');
    //        });
    //    } else {
    //        $http.post('/API/OrderAPI/', $scope.Order)
    //        .success(function () {
    //            $window.location.href = '/Admin/Orders';
    //        })
    //        .error(function () {
    //            toastr.error('Thất bại', 'Thêm Order');
    //        });
    //    }
    //};
    ////Lưu bài viết và Thêm mới
    //$scope.saveOrderAndNew = function () {
    //    if ($scope.currentIdOrder) {
    //        $http.put('/API/OrderAPI/' + $scope.Order.idOrder, $scope.Order)
    //        .success(function () {
    //            $window.location.href = '/Admin/Orders/Create';
    //        })
    //        .error(function () {
    //            toastr.error('Thất bại', 'Lưu Order')
    //        });
    //    } else {
    //        $http.post('/API/OrderAPI/', $scope.Order)
    //        .success(function () {
    //            $window.location.href = '/Admin/Orders/Create';
    //        })
    //        .error(function () {
    //            toastr.error('Thất bại', 'Thêm Order')
    //        });
    //    }
    //};

    //Hủy bỏ
    $scope.cancel = function () {
        $window.location.href = '/Admin/Contacts';
    };

    //Nhập Title
    $scope.changeTitle = function () {
        //Tự tạo Alias
        $scope.Contact.alias = Alias.genAlias($scope.Contact.title);
    };
}]);