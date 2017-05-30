myApp.factory('Category', [function () {
    var fac = {};

    var table = [];
    var array = [];

    //Table Menu
    function tableMultiLevel(input, level) {

        for (var h = 0; h < input.length; h++) {
            if (input[h].idCategory) {

                var output = {};
                var preName = '';
                for (var j = 0; j < level; j++) {
                    preName += '- ';
                }
                output.idCategory = input[h].idCategory;
                output.idCategoryParent = input[h].idCategoryParent;
                output.title = preName + input[h].title;
                output.alias = input[h].alias;
                if (input[h].published == 0) {
                    output.published = "Chưa xuất bản";
                } else {
                    output.published = "Đã xuất bản";
                }
                output.note = input[h].note;
                table.push(output);

                if (input[h].Category1.length > 0) {
                    tableMultiLevel(input[h].Category1, level + 1);
                }

            }
        }

    };
    fac.getTable = function (list) {

        tableMultiLevel(list, 0);

        var output = table;
        table = [];
        return output;
    };

    //Array
    function allCategory(input) {

        for (var h = 0; h < input.length; h++) {
            if (input[h].idCategory) {

                var output = {};
                output.idCategory = input[h].idCategory;
                output.idCategoryParent = input[h].idCategoryParent;
                output.title = input[h].title;
                output.alias = input[h].alias;
                output.note = input[h].note;
                array.push(output);

                if (input[h].Category1.length > 0) {
                    allCategory(input[h].Category1);
                }

            }
        }

    };
    fac.getallCategory = function (list) {

        allCategory(list);

        var output = array;
        array = [];
        return output;
    };

    return fac;
}]);