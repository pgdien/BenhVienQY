myApp.controller("danhsachContactController", ['$scope', '$http', '$window', 'uiGridConstants', function ($scope, $http, $window, uiGridConstants) {
    $scope.Contacts = [];
    $scope.gridOptions = {};

    //Lấy danh sách Post
    $http.get('/api/ContactAPI/').success(function (data) {
        $scope.gridOptions.data = data;
    });

    //Tùy chỉnh Column
    $scope.gridOptions.rowHeight = 50;
    $scope.gridOptions.columnDefs =
    [
        {
            displayName: "STT",
            name: 'stt',
            enableCellEdit: false,
            enableSorting: false,
            enableFiltering: false,
            width: 55,
            cellTemplate: '<div class="ui-grid-cell-contents text-center">{{grid.renderContainers.body.visibleRowCache.indexOf(row)+1}}</div>'
        },
        {
            displayName: "ID",
            name: 'idContact',
            enableSorting: false,
            width: 60,
        },
        {
            displayName: "Họ tên",
            name: 'hoten',
            enableSorting: false
        },
        {
            displayName: "Địa chỉ",
            name: 'diachi',
            enableSorting: false
        },
        {
            displayName: "SĐT",
            name: 'sdt',
            enableSorting: false
        },
        {
            displayName: "Email",
            name: 'email',
            enableSorting: false
        },
        //{
        //    displayName: "Tiêu đề",
        //    name: 'title',
        //    enableSorting: false
        //},
        {
            displayName: "Nội dung",
            name: 'content',
            enableSorting: false
        },
        {
            displayName: "",
            name: 'delete',
            enableSorting: false,
            enableFiltering: false,
            width: 100,
            enableCellEdit: false,
            cellTemplate: '<div ><button style="margin-left: 10px; margin-top: 3px;" class="btn btn-xs btn-info" ng-click="grid.appScope.EditContact(row.entity.idContact)"><span class="fa fa-eye"></span></button><button style="margin-left: 10px; margin-top: 3px;" class="btn btn-xs btn-danger" ng-click="grid.appScope.DeleteContact(row.entity.idContact)"><span class="fa fa-bitbucket"></span></button></div>',
        }
    ];

    //Phan trang
    $scope.gridOptions.paginationPageSizes = [10, 25, 50, 75];
    $scope.gridOptions.paginationPageSize = 25;

    //Tim kiem
    $scope.gridOptions.enableFiltering = true;
    //Select
    $scope.gridOptions.enableRowSelection = true;
    $scope.gridOptions.enableRowHeaderSelection = false;
    $scope.gridOptions.multiSelect = false;

    //Grid API
    $scope.gridOptions.onRegisterApi = function (gridApi) {

    };

    //Edit
    $scope.EditContact = function (id) {
        $window.location.href = '/Admin/Contacts/Create?idContact=' + id;
    }

    //Delete
    $scope.DeleteContact = function (id) {
        var id = id;

        if (confirm("Bạn có chắc chắn muốn xóa?")) {
            //Xóa
            $http.delete('/API/ContactAPI/' + id)
            .success(function () {
                $http.get('/API/ContactAPI/').success(function (data) { $scope.gridOptions.data = data; });
                toastr.success('Thành công', 'Xóa');
            });
        }
    }
}]);