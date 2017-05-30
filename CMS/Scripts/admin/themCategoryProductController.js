
myApp.controller("themCategoryProductController", ['$scope', '$http', '$window', '$location', '$filter', 'Alias', 'MenuMultiLevel', 'Url', function ($scope, $http, $window, $location, $filter, Alias, MenuMultiLevel, Url) {
    $scope.category = {};
    $scope.categoryParents = [];
    $scope.categoryParent = {};


    //Lấy idCategory từ Url
    $scope.currentIdCategory = Url.getParameterByName('idCategory');

    //Chọn hình ảnh
    $scope.chooseImage = function () {
        var finder = new CKFinder();
        finder.selectActionFunction = function (fileUrl) {
            $scope.category.image = fileUrl;
            $scope.$apply();
        };
        finder.SelectFunction = 'ShowFileInfo';
        finder.popup();
    }
    //Chọn hình ảnh Banner
    $scope.chooseImageBanner = function () {
        var finder = new CKFinder();
        finder.selectActionFunction = function (fileUrl) {
            $scope.category.image_banner = fileUrl;
            $scope.$apply();
        };
        finder.SelectFunction = 'ShowFileInfo';
        finder.popup();
    }

    //Nếu sửa thì trả về giá trị của Category
    if ($scope.currentIdCategory) {
        $http.get('/API/CategoryProductsAPI/' + $scope.currentIdCategory)
            .success(function (data) {
                $scope.category = {
                    idCategory: data.idCategory,
                    idCategoryParent: data.idCategoryParent,
                    idUserCreated: data.idUserCreated,
                    idUserModified: data.idUserModified,
                    timeCreated: data.timeCreated,
                    timeModified: data.timeModified,
                    title: data.title,
                    alias: data.alias,
                    note: data.note,
                    description: data.description,
                    published: data.published,
                    image: data.image,
                    image_banner: data.image_banner,
                    color_background_banner: data.color_background_banner,
                    color_title_banner: data.color_title_banner,
                    color_text_banner: data.color_text_banner,
                    tags: data.tags,
                    version: data.version,
                    deleted: data.deleted,
                    metadescription: data.metadescription,
                    metakewords: data.metakewords,
                    author: data.author,
                    robots: data.robots
                };
                //Giá trị cho Danh mục cha
                $scope.categoryParent = { id: data.idCategoryParent };
            });
    }
        //Không thì thiết lập giá trị mặc định
    else {
        $scope.category = {
            published: 1,
            robots: 'Index, Follow',
            idUserCreated: angular.element('#user').val(),
            timeCreated: new Date(),
            idUserModified: angular.element('#user').val(),
            timeModified: new Date()
        };
        $scope.categoryParent = { id: 1 };
    }

    //Lấy danh sách Category gán cho $scope.categoryParents
    $http.get('/API/CategoryProductsAPI/').success(function (data) { $scope.categoryParents = MenuMultiLevel.getDropdownMenuCategoryProduct(data); });


    //Lưu bài viết
    $scope.saveCategory = function () {
        $scope.category.idCategoryParent = $scope.categoryParent.id;
        if ($scope.currentIdCategory) {
            $scope.category.idUserModified = angular.element('#user').val(),
            $scope.category.timeModified = new Date()
            $http.put('/API/CategoryProductsAPI/' + $scope.category.idCategory, $scope.category)
            .success(function () {
                toastr.success('Thành công', 'Lưu Danh mục');
                $http.get('/API/CategoryProductsAPI/').success(function (data) { $scope.categoryParents = MenuMultiLevel.getDropdownMenu(data); $scope.$apply; });
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm Danh mục')
            });
        } else {
            $http.post('/API/CategoryProductsAPI/', $scope.category)
            .success(function () {
                toastr.success('Thành công', 'Thêm Danh mục');
                $window.location.href = '/Admin/CategoryProducts';
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm Danh mục');
            });
        }

    };
    //Lưu bài viết và Thoát
    $scope.saveCategoryAndExit = function () {
        $scope.category.idCategoryParent = $scope.categoryParent.id;
        if ($scope.currentIdCategory) {
            $scope.category.idUserModified = angular.element('#user').val(),
            $scope.category.timeModified = new Date()
            $http.put('/API/CategoryProductsAPI/' + $scope.category.idCategory, $scope.category)
            .success(function () {
                $window.location.href = '/Admin/CategoryProducts';
            })
            .error(function () {
                toastr.error('Thất bại', 'Lưu Danh mục');
            });
        } else {
            $http.post('/API/CategoryProductsAPI', $scope.category)
            .success(function () {
                $window.location.href = '/Admin/CategoryProducts';
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm Danh mục');
            });
        }


    };
    //Lưu bài viết và Thêm mới
    $scope.saveCategoryAndNew = function () {
        $scope.category.idCategoryParent = $scope.categoryParent.id;
        if ($scope.currentIdCategory) {
            $scope.category.idUserModified = angular.element('#user').val(),
            $scope.category.timeModified = new Date()
            $http.put('/API/CategoryProductsAPI/' + $scope.category.idCategory, $scope.category)
            .success(function () {
                $window.location.href = '/Admin/CategoryProducts/Create';
            })
            .error(function () {
                toastr.error('Thất bại', 'Lưu Danh mục')
            });
        } else {
            $http.post('/API/CategoryProductsAPI/', $scope.category)
            .success(function () {
                $window.location.href = '/Admin/CategoryProducts/Create';
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm Danh mục')
            });
        }

    };
    //Hủy bỏ
    $scope.cancel = function () {
        $window.location.href = '/Admin/CategoryProducts';
    };

    //Nhập Title
    $scope.changeTitle = function () {
        //Tự tạo Alias
        $scope.category.alias = Alias.genAlias($scope.category.title);
    };


}]);