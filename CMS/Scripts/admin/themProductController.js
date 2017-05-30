myApp.controller("themProductController", ['$scope', '$http', '$window', '$location', '$filter', 'Alias', 'MenuMultiLevel', 'Url', function ($scope, $http, $window, $location, $filter, Alias, MenuMultiLevel, Url) {
    $scope.product = {};
    $scope.categories = [];
    $scope.category = {};

    $scope.chooseImage = function () {
        // You can use the "CKFinder" class to render CKFinder in a page:
        var finder = new CKFinder();
        finder.selectActionFunction = function (fileUrl) {
            $scope.product.image = fileUrl;
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


    //Lấy idProduct từ Url
    $scope.currentIdProduct = Url.getParameterByName('idProduct');

    //Nếu sửa thì trả về giá trị của Post
    if ($scope.currentIdProduct) {
        $http.get('/API/ProductsAPI/' + $scope.currentIdProduct)
            .success(function (data) {
                $scope.product = {
                    idProduct: data.idProduct,
                    idCategoryProduct: data.idCategoryProduct,
                    idUserCreated: data.idUserCreated,
                    idUserModified: data.idUserModified,
                    timeCreated: data.timeCreated,
                    timeModified: data.timeModified,
                    title: data.title,
                    alias: data.alias,
                    content: data.content,
                    note: data.note,
                    description: data.description,
                    price: data.price,
                    noiSX: data.noiSX,
                    trongLuong: data.trongLuong,
                    vatLieuDongGoi: data.vatLieuDongGoi,
                    tinhTrang: data.tinhTrang,
                    published: data.published,
                    image: data.image,
                    tags: data.tags,
                    version: data.version,
                    deleted: data.deleted,
                    feature: data.feature,
                    metadescription: data.metadescription,
                    metakewords: data.metakewords,
                    author: data.author,
                    robots: data.robots,
                };
                //Giá trị cho Danh mục
                $scope.category = { id: data.idCategoryProduct };
            });
        
    }
        //Không thì thiết lập giá trị mặc định
    else {
        $scope.product = {
            published: 1,
            feature: '0',
            robots: 'Index, Follow',
            idUserCreated: angular.element('#user').val(),
            timeCreated: new Date(),
            idUserModified: angular.element('#user').val(),
            timeModified: new Date()
        };
        $scope.category = { id: 1 };
    }

    //Lấy danh sách Category gán cho $scope.categories
    $http.get('/API/CategoryProductsAPI/').success(function (data) { $scope.categories = MenuMultiLevel.getDropdownMenuCategoryProduct(data); });

    //Lưu Sản phẩm
    $scope.saveProduct = function () {
        $scope.product.idCategoryProduct = $scope.category.id;
        if ($scope.currentIdProduct) {
            $scope.product.idUserModified = angular.element('#user').val(),
            $scope.product.timeModified = new Date()
            $http.put('/API/ProductsAPI/' + $scope.product.idProduct, $scope.product)
            .success(function () {
                toastr.success('Thành công', 'Lưu Sản phẩm');
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm Sản phẩm')
            });
        } else {
            $http.post('/API/ProductsAPI/', $scope.product)
            .success(function () {
                toastr.success('Thành công', 'Thêm Sản phẩm');
                $window.location.href = '/Admin/Products';
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm Sản phẩm');
            });
        }
    };
    //Lưu sản phẩm và Thoát
    $scope.saveProductAndExit = function () {
        $scope.product.idCategoryProduct = $scope.category.id;
        if ($scope.currentIdProduct) {
            $scope.product.idUserModified = angular.element('#user').val(),
            $scope.product.timeModified = new Date()
            $http.put('/API/ProductsAPI/' + $scope.product.idProduct, $scope.product)
            .success(function () {
                $window.location.href = '/Admin/Products';
            })
            .error(function () {
                toastr.error('Thất bại', 'Lưu Sản phẩm');
            });
        } else {
            $http.post('/API/ProductsAPI/', $scope.product)
            .success(function () {
                $window.location.href = '/Admin/Products';
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm Sản phẩm');
            });
        }
    };
    //Lưu bài viết và Thêm mới
    $scope.saveProductAndNew = function () {
        $scope.product.idCategoryProduct = $scope.category.id;
        if ($scope.currentIdProduct) {
            $scope.product.idUserModified = angular.element('#user').val(),
            $scope.product.timeModified = new Date()
            $http.put('/API/ProductsAPI/' + $scope.product.idProduct, $scope.product)
            .success(function () {
                $window.location.href = '/Admin/Products/Create';
            })
            .error(function () {
                toastr.error('Thất bại', 'Lưu Danh mục')
            });
        } else {
            $http.post('/API/ProductsAPI/', $scope.product)
            .success(function () {
                $window.location.href = '/Admin/Products/Create';
            })
            .error(function () {
                toastr.error('Thất bại', 'Thêm Sản phẩm')
            });
        }
    };
    //Hủy bỏ
    $scope.cancel = function () {
        $window.location.href = '/Admin/Products';
    };

    //Nhập Title
    $scope.changeTitle = function () {
        //Tự tạo Alias
        $scope.product.alias = Alias.genAlias($scope.product.title);
    };
}]);