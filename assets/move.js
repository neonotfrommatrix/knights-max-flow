var grid_space = 85;
var grid_N = 10;

//===Creates nodelist=====================================================================
var nodelist = [];
for (var y = 0; y < 800; y += grid_space) {
    for (var x = 0; x < 800; x += grid_space) {
        // flow_val ensure the flow_value number is generated to equal or less
        var flow_val = 2 * Math.floor((Math.random() * 15) + 1);
        nodelist.push({ x_pos: x, y_pos: y, max_value: flow_val, flow_value: Math.floor((Math.random() * flow_val) + 1) });
    }
}

//Source and sink
var source = nodelist[21];
var sink = nodelist[78];

// Directions [x,y]
var UP_LEFT = [-1, -2]; //0
var UP_RIGHT = [1, -2]; //1
var LEFT_UP = [-2, -1]; //2
var LEFT_DOWN = [-2, 1]; //3
var DOWN_LEFT = [-1, 2]; //4
var DOWN_RIGHT = [1, 2]; //5
var RIGHT_UP = [2, -1]; //6
var RIGHT_DOWN = [2, 1]; //7
var Directions = [UP_LEFT, UP_RIGHT, LEFT_UP, LEFT_DOWN, DOWN_LEFT, DOWN_RIGHT, RIGHT_UP, RIGHT_DOWN];

// vertices starting path
var vertices = [21, 42, 34, 55, 74, 86, 78];
var next;

var debug = false;

// walk through a list of preset vertices and find the best new path  
function Path() {
    console.log("source is " + source.flow_value);
    console.log("sink is " + sink.flow_value)
    console.log("unoptimized");
    flowIs();
        for (var lol = 0; lol < 100; ++lol) {
            for (var i = 0; i < vertices.length - 2; ++i) {
                if (debug) {
                    console.log(i);
                }
                runTwice(i, i + 2);
                vertices[i + 1] = next;
                if (debug) {
                    console.log("next is " + next);
                }
            }
            for (var i = 1; i < vertices.length - 2; ++i) {
                if (debug) {
                    console.log(i);
                }
                runTwice(i, i + 2);
                vertices[i + 1] = next;
                if (debug) {
                    console.log("next is " + next);
                }
            }
        }
    
}

// looks 2 steps ahead and finds the best next path
function runTwice(start, finish) {
    var choices = [];
    for (var i = 0; i < Directions.length; ++i) {
        for (var j = 0; j < Directions.length; ++j) {
            var add = (Directions[i][1] * 10) + (Directions[j][1] * 10) + Directions[i][0] + Directions[j][0];
            if ((vertices[start] + add) == vertices[finish]) {
                choices.push([i, j]);
            }
        }
    }
    if (choices.length > 1) {
        if (average(choices, vertices[start], vertices[finish])) {
            next = vertices[start] + Directions[choices[1][0]][0] + (Directions[choices[1][0]][1] * 10);
        }
        else {
            next = vertices[start] + Directions[choices[0][0]][0] + (Directions[choices[0][0]][1] * 10);
        }
    }
    else {
        next = vertices[start] + Directions[choices[0][0]][0] + (Directions[choices[0][0]][1] * 10);
    }
}

// gets the average flow of 2,2 edge paths and finds the best one
function average(choices, start, finish) {
    var a = nodelist[start].flow_value;
    var b = nodelist[finish].flow_value;
    var temp = start + Directions[choices[1][0]][0] + (Directions[choices[1][0]][1] * 10);;
    var c = nodelist[temp].flow_value;
    temp = start + Directions[choices[0][0]][0] + (Directions[choices[0][0]][1] * 10);
    var d = nodelist[temp].flow_value;
    if (((a + b + c) / 3) > ((a + b + d) / 3))
        return true;
    else
        return false;
}

function flowIs() {
    var lowestflow = 1000000;
    for (var i = 0; i < vertices.length; ++i) {
        if (nodelist[vertices[i]].flow_value < lowestflow)
            lowestflow = nodelist[vertices[i]].flow_value;
    }
    console.log("max flow is " + lowestflow);
}
