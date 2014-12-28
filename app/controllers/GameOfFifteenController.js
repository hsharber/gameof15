/// <reference path="C:\Users\Henry\Dropbox\dev\AngularTest\AngularTest\Scripts/angular.js" />

(function () {
    var GameOfFifteenController = function ($scope, $timeout, gameOfFifteenFactory) {
        dimensionRange = [
            { "val": 3 },
            { "val": 4 },
            { "val": 5 },
            { "val": 6 },
            { "val": 7 },
            { "val": 8 },
            { "val": 9 }
        ];
        $scope.title = "Game Of Fifteen";
        $scope.model = gameOfFifteenFactory.model;
        $scope.clickTile = function (row, column) {
            gameOfFifteenFactory.move(row, column);
            if (gameOfFifteenFactory.won()) {
                $scope.message = "You are a winner!";
            }
            else {
                $scope.message = "Select the Tile to move";
            }
        };
        $scope.message = "Select the Tile to move";
        $scope.dimensionRange = dimensionRange;
        $scope.dimension = dimensionRange[1];
        $scope.updateDimension = function () {
            $scope.message = "Select the Tile to move";
            gameOfFifteenFactory.set_dimension($scope.dimension.val);
            $scope.model = gameOfFifteenFactory.model;
        };
        $scope.restart = function () {
            gameOfFifteenFactory.set_dimension($scope.dimension.val);
            $scope.message = "Select the Tile to move";
            $scope.model = gameOfFifteenFactory.model;

        }
        $scope.autoComplete = function () {
            //initialize board
            
            if (!($scope.dimension.val == 3 || $scope.dimension.val == 4)) {
                $scope.message = "Auto Complete works only with dimension 3 or 4.";
                return;
            }

            gameOfFifteenFactory.set_dimension($scope.dimension.val);
            $scope.model = gameOfFifteenFactory.model;
            
            var i = 0;
            var self = this;
            function delayedLoop() {
                //console.log(i);
                var row_column = null;
                if ($scope.dimension.val == 4) {
                    row_column = gameOfFifteenFactory.getTilePosition(autocomplete_4[i]);
                } else if ($scope.dimension.val == 3) {
                    row_column = gameOfFifteenFactory.getTilePosition(autocomplete_3[i]);
                }
                if (row_column == null) {
                    return;
                }
                //var row_column = gameOfFifteenFactory.getTilePosition(autocomplete_3[i]);
                //var result = gameOfFifteenFactory.move(row_column.row, row_column.col);
                $scope.clickTile(row_column.row, row_column.col);
                $scope.$apply();
                //$scope.model = gameOfFifteenFactory.model;
                //console.log("result: " + result);
                //if (result == true) {
                    i++;
                //}
                if ($scope.dimension.val == 3 && i == autocomplete_3.length) {
                    return;
                } else if ($scope.dimension.val == 4 && i == autocomplete_4.length) {
                    return;
                }
                setTimeout(delayedLoop, 300)
            }
            delayedLoop();
            if (gameOfFifteenFactory.won()) {
                $scope.message = "You are a winner!";
            }
        }
    };

    GameOfFifteenController.$inject = ['$scope', '$timeout', 'gameOfFifteenFactory'];

    angular.module('myApp')
        .controller('GameOfFifteenController', GameOfFifteenController);

}());