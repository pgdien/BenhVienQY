myApp.factory('MenuMultiLevel',[ function () {
    var fac = {};
    var dropdown = [];

    //Dropdownlis Menu
    function dropdownMenu(input, level) {

        for (var h = 0; h < input.length; h++) {
            if (input[h].idCategory) {
                
                var output = {};
                var preName = '';
                for (var j = 0; j < level; j++) {
                    preName += '- ';
                }
                output.id = input[h].idCategory;
                output.name = preName + input[h].title;
                dropdown.push(output);



                if (input[h].Category1.length > 0) {
                    dropdownMenu(input[h].Category1, level+1);
                }
                
            }
        }
        
    };
    fac.getDropdownMenu = function (list) {
        dropdownMenu(list, 0);

        var output = dropdown;
        dropdown = [];

        return output;
    };

    //Dropdownlis Menu Category Product
    function dropdownMenuProduct(input, level) {

        for (var h = 0; h < input.length; h++) {
            if (input[h].idCategory) {

                var output = {};
                var preName = '';
                for (var j = 0; j < level; j++) {
                    preName += '- ';
                }
                output.id = input[h].idCategory;
                output.name = preName + input[h].title;
                dropdown.push(output);

                if (input[h].CategoryProduct1.length > 0) {
                    dropdownMenuProduct(input[h].CategoryProduct1, level + 1);
                }

            }
        }

    };
    fac.getDropdownMenuCategoryProduct = function (list) {
        dropdownMenuProduct(list, 0);

        var output = dropdown;
        dropdown = [];

        return output;
    };

    return fac;

}]);