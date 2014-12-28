(function () {
    var gameOfFifteenFactory = function ($timeout) {

        var blank_row = -1;
        var blank_col = -1;

        //default to 4
        var dimension = 4;

        var init_model = function () {
            model = [];
            var number_of_tiles = (dimension * dimension) - 1;
            var tile_number = number_of_tiles;
            for (var i = 0; i < dimension; i++) {
                var row = [];
                for (var j = 0; j < dimension; j++) {
                    var tile = {}
                    var temp_tile_number = tile_number;
                    if (tile_number == 1 || tile_number == 2) {
                        if (number_of_tiles % 2 != 0) {
                            //odd number of tiles; swap 1 and 2
                            if (tile_number == 1) {
                                temp_tile_number = 2;
                            }
                            else {
                                temp_tile_number = 1;
                            }
                        }
                    }
                    if (tile_number == 0) {
                        blank_row = i;
                        blank_col = j;
                    }
                    tile.row = i;
                    tile.column = j;
                    tile.tile_number = temp_tile_number;
                    row.push(tile);
                    tile_number--;
                }
                model.push(row);
            }
            return model
        }


        var factory = {};

        factory.model = init_model();

        factory.set_dimension = function (newDimension) {
            if (newDimension < 3 || newDimension > 9) {
                return false;
            }
            dimension = newDimension;
            factory.model = init_model();
            return true;
        };

        factory.autoComplete = function () {
            var self = this;

            var delayFunction = function (index) {
                console.log("delayFunction: " + index);
            };

            var timeout = function (values, index) {
                setTimeout(function () {
                    var row_column = getTilePosition(values[index]);
                    self.move(row_column.row, row_column.col);
                    index += 1;
                    if (index > values.length) {
                        return;
                    }
                    else {
                        timeout(values, index);
                    }
                }, 1000);
            }

            if (dimension == 3) {
                //for (var i = 0; i < autocomplete_3.length; i++) {

                    //var row_column = getTilePosition(autocomplete_3[i]);
                    //var moveFunction = function () {
                    //    this.move(row_column.row, row_column.col);
                    //};
                    //this.move(row_column.row, row_column.col);
                    //setTimeout(this.move(row_column.row, row_column.col), 10000) //wait 2 ms before continuing
                    //$timeout(this.move(row_column.row, row_column.col), 10000);
                    //setTimeout("this.move(row_column.row, row_column.col)", 2000);
                    //setTimeout(delayFunction, 2000, row_column.row, row_column.col);
                    //delayFunction(row_column.row, row_column.col);
                
                //}
                //timeout(autocomplete_3, 0);

                var i = 0;
                var self = this;
                function delayedLoop() {
                    console.log(i);
                    var row_column = getTilePosition(autocomplete_3[i]);
                    var result = self.move(row_column.row, row_column.col);
                    console.log("result: " + result);
                    if (result == true) {
                        i++;
                    }
                    if (i == autocomplete_3.length) {
                        return;
                    }
                    setTimeout(delayedLoop, 300)

                }
                delayedLoop();
                return true;
            }
            else if (dimension == 4) {
                for (var i = 0; i < autocomplete_4.length; i++) {
                    var row_column = getTilePosition(autocomplete_4[i]);
                    this.move(row_column.row, row_column.col);
                }
                return true;
            }
            else {
                return false;
            }
            
        };


        factory.move = function (row, column) {
            //console.log("move: " + row + ", " + column);
            if (this.won()) {
                return false;
            }
	        var cur_row = row;
            var cur_col = column;
            if (cur_row == blank_row || cur_col == blank_col)
            {
                if (Math.abs(cur_row - blank_row) == 1 || Math.abs(cur_col - blank_col) == 1)
                {
                    //this is adjacent, ok to move
                    var tile_number = model[row][column].tile_number;
                    model[blank_row][blank_col].tile_number = tile_number;
                    model[cur_row][cur_col].tile_number = 0;
                    blank_row = cur_row;
                    blank_col = cur_col;
                    return true;
                }
            }
            return false;
        }

        factory.won = function () {
            var number_of_tiles = (dimension * dimension) - 1;
            var curr_tile = 1;
            for (var r = 0; r < dimension; r++)
            {
                for (var c = 0; c < dimension; c++)
                {
                    if (model[r][c].tile_number != curr_tile)
                    {
                        return false;
                    }
                    curr_tile++;
                    if (curr_tile > number_of_tiles)
                    {
                        console.log(curr_tile + ", " + number_of_tiles);
                        return true;
                    }
                }
            }
            return false;
        };

        factory.getTilePosition = function (tileNumber) {
            for (var i = 0; i < dimension; i++) {
                for (var j = 0; j < dimension; j++) {
                    if (this.model[i][j].tile_number == tileNumber) {
                        return {
                            "row": i,
                            "col": j
                        }
                    }
                }
            }
        };

        return factory;
    };

    gameOfFifteenFactory.$inject = ['$timeout'];

    angular.module('myApp')
      .factory('gameOfFifteenFactory', gameOfFifteenFactory);
}());