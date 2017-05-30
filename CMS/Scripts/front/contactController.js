frontApp.controller("ContactController", ['$scope', '$http', '$window', function ($scope, $http, $window) {
    $scope.Contact = {};

    //Lưu Contact
    $scope.SaveContact = function () {
        $http.post('/API/ContactAPI/', $scope.Contact)
        .success(function () {
            toastr.success('Thành công', 'Tạo thông tin liên hệ');
            $window.location.href = '/';
        })
        .error(function () {
            toastr.error('Thất bại', 'Tạo thông tin liên hệ');
        });
    };

    //Nhập lại
    $scope.Reset = function () {
        $scope.Contact = {
            hoten:'',
            diachi: '',
            sdt: '',
            email: '',
            title: '',
            content:'',
        };
    }
}]);