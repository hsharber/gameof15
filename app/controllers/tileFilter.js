(function () {

    angular.module('myApp')
    .filter('tileDisplay', function () {
        return function (input, display) {
            input = input || '';
            var display = " ";
            if (input != "0") {
                diplay = input
            }
            return diplay;
        };
    })
}());