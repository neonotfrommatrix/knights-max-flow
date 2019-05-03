/* Old way
let knightsBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
  ];

var moveList = [[1,2],[-1,2],[1,-2],[-1,-2],[2,1],[-2,1],[2,-1],[-2,-1]];
var moves = [];



//creates random start and stop positions for the knight
var start_pos = [{x_pos: Math.floor((Math.random() * grid_x)), y_pos: Math.floor((Math.random() * grid_y))}];
var sink = [{x_pos: Math.floor((Math.random() * grid_x)), y_pos: Math.floor((Math.random() * grid_y))}];
//console.log(start_pos, sink);

moves.push([start_pos[0].x_pos, start_pos[0].y_pos]);
moves.push([sink[0].x_pos, sink[0].y_pos]);
moves.push([start_pos[0].x_pos, start_pos[0].y_pos]);

function knightsMove(moves){
    
    for(var m = 0; m < moveList.length; m++){
        moves.push([moveList[m][0], moveList[m][1]])
        moves[2][0] += moveList[m][0];
        moves[2][1] += moveList[m][1];
        //console.log(moves[2]);
        if(moves[moves.length - 1][0] == sink.x_pos && moves[moves.length - 1][1] == sink.y_pos){
            break;
            //return;
        }
        
        if(moves[2][0] < 0 || moves[2][0] > 10 || moves[2][1] < 0 || moves[2][1] > 10){
            console.log("end");
            //console.log(start_pos);
            console.log(moves[2]);
            var temp = moves.pop();
            moves[2][0] -= temp.x_pos;
            moves[2][1] -= temp.y_pos;
            console.log(moves[2]);
            break;
            //return;
        }
        
        knightsMove(moves);
    }
    console.log(moves);
}
*/
// ========== PYTHON SCRIPT TRANSLATION ================================
/*
let knightsBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
*/
/*
const DIRECTIONS = [
    [-1,-2], // UP_LEFT
    [ 1,-2], // UP_RIGHT
    [-2,-1], // LEFT_UP
    [-2, 1], // LEFT_DOWN
    [-1, 2], // DOWN_LEFT
    [ 1, 2], // DOWN_RIGHT
    [ 2,-1], // RIGHT_UP
    [ 2, 1]  // RIGHT_DOWN
];
// enum variables used to index arrays

const OG_VER = 0;
const DT_VER = 1;
const MAX_FLOW = 2;
const CURR_FLOW = 3;
const X_CORD = 0;
const Y_CORD = 1;
*/
//creates the grid sizes 
/*
var grid_x_space = 85; 
var grid_y_space = 85; 
var grid_x = 10; 
var grid_y = 10; 
*/
//console.log(grid_x_space, grid_y_space, grid_x, grid_y);

//creats a list of nodes which store the random value with their x and y position in the grid
//var nodelist = [];
/*  Old way of doing it
for(var x = 0; x < 800; x += grid_x_space){
    for(var y = 0; y < 800; y += grid_y_space){
        // flow_val ensure the flow_value number is generated to equal or less
        var flow_val = 2 * Math.floor((Math.random() * 15) + 1);
        nodelist.push({x_pos : x, y_pos : y, max_value: flow_val, flow_value : Math.floor((Math.random() * flow_val) + 1)});
    }
}
*/
/*
for(var x = 0; x < grid_x; x++){
    for(var y = 0; y < grid_y; y++){
        // flow_val ensure the flow_value number is generated to equal or less
        var flow_val = 2 * Math.floor(Math.random() * 15.99);
        knightsBoard[x][y] = flow_val;
        nodelist.push(
            {x_pos : (x*grid_x_space), 
             y_pos : (y*grid_y_space), 
             max_value: flow_val, 
             flow_value : 0
            });
    }
}
*/
/*
var total_edge_pile = Math.floor(Math.random() * 15.99) + 15;
var edge_pile = total_edge_pile - 6;

// Lines of code 124-132 is the Data Structure of the graph!
var start_path = [
    //origin vertex, destination vertex,                    max flow,                      current flow
    [       [1,2],          [2,4],          ((knightsBoard[1][2] + knightsBoard[2][4]) / 2),    0   ],
    [       [2,4],          [4,3],          ((knightsBoard[2][4] + knightsBoard[4][3]) / 2),    0   ],
    [       [4,3],          [5,5],          ((knightsBoard[4][3] + knightsBoard[5][5]) / 2),    0   ],
    [       [5,5],          [4,7],          ((knightsBoard[5][5] + knightsBoard[4][7]) / 2),    0   ],
    [       [4,7],          [6,8],          ((knightsBoard[4][7] + knightsBoard[6][8]) / 2),    0   ],
    [       [6,8],          [8,7],          ((knightsBoard[6][8] + knightsBoard[8][7]) / 2),    0   ],
];
var vertices = [ [1,2], [2,4], [4,3], [5,5], [4,7], [6,8], [8,7] ];
var edges = start_path;
*/
/*
while(edge_pile > 1)
{
    var current_highest = 0;
    var start = [-1,-1];
    var highest_target = [-1,-1];
    var highest_return = [-1,-1];
    var first_edge_flow = 0;
    var second_edge_flow = 0;
    
    var edge_count = edges.length;
    for(var edge = 0; edge < edge_count; edge++)
    {
        var this_x = edges[edge][OG_VER][X_CORD];
        var this_y = edges[edge][OG_VER][Y_CORD];
        
        var targets = [];
        
        //From the current vertex, check all 8 directions to find target vertices
        for(var direction = 0; direction < DIRECTIONS.length; direction++)
        {
            var target_vertex_x = this_x + DIRECTIONS[direction][X_CORD];
            var target_vertex_y = this_y + DIRECTIONS[direction][Y_CORD];
            
            //check the bounds
            if(target_vertex_x > 9 || target_vertex_y > 9 || target_vertex_x < 0 || target_vertex_y < 0)
                continue;
            
            //check if target_vertex is already in the vertices list
            var found = false;
            for(var vertix = 0; vertix < vertices.length; vertix++)
            {
                if(target_vertex_x == vertices[vertix][X_CORD] && target_vertex_y == vertices[vertix][Y_CORD])
                {
                    found = true;
                    break;
                }
            }
            if(found == false)
            {
                targets.push([target_vertex_x, target_vertex_y]);   
            }
        }
        //Once all targets have been found, iterate through them to find candidate edge pairs
        for(var target = 0; target < targets.length; target++)
        {
            var target_x = targets[target][X_CORD];
            var target_y = targets[target][Y_CORD];
            
            //Once again, we iterate through all 8 directions to find return vertex candidates
            for(var direction = 0; direction < DIRECTIONS.length; direction++)
            {
                var return_vertex_x = target_x + DIRECTIONS[direction][X_CORD];
                var return_vertex_y = target_y + DIRECTIONS[direction][Y_CORD];
                
                //check the bounds
                if(return_vertex_x > 9 || return_vertex_y > 9 || return_vertex_x < 0 || return_vertex_y < 0)
                    continue;
                
                //Prevent a closed loop by not allowing the return vertex to equal the source vertex
                if(return_vertex_x == this_x && return_vertex_y == this_y)
                    continue;
                
                //The return vertex must be in the list of vertices, so continue if not
                var found = false;
                for(var vertix = 0; vertix < vertices.length; vertix++)
                {
                    if(target_x == vertices[vertix][X_CORD] && target_y == vertices[vertix][Y_CORD])
                    {
                        found = true;
                        break;
                    }
                }
                if(found == true)
                {
                    var target_flow = ((knightsBoard[this_x][this_y] + knightsBoard[target_x][target_y]) / 2);
                    var return_flow = ((knightsBoard[target_x][target_y] + knightsBoard[return_vertex_x][return_vertex_y]) / 2);
                    var max_flow = Math.min(target_flow, return_flow);
                    
                    if(max_flow > current_highest)
                    {
                        current_highest = max_flow;
                        highest_target[X_CORD] = target_x;
                        highest_target[Y_CORD] = target_y;
                        highest_return[X_CORD] = return_vertex_x;
                        highest_return[Y_CORD] = return_vertex_y;
                        start[X_CORD] = this_x;
                        start[Y_CORD] = this_y;
                        first_edge_flow = target_flow;
                        second_edge_flow = return_flow;
                    }
                }
            }
        }
    }
    if(current_highest > 0)
    {
        var left_edge =  [   [start[X_CORD],start[Y_CORD]],    [highest_target[X_CORD],highest_target[Y_CORD]],  first_edge_flow, 0 ];
        var right_edge = [   [highest_target[X_CORD],highest_target[Y_CORD]], [highest_return[X_CORD],highest_return[Y_CORD]], second_edge_flow, 0 ];
        edges.push(left_edge);
        edges.push(right_edge);
        vertices.push([highest_target[X_CORD],highest_target[Y_CORD]]);
    }
    
    edge_pile -= 2;
}
*/

var insertcanvas = document.getElementById( "Knightsgrid" );
var insertcontext = insertcanvas.getContext( "2d" );
let knightsBoard = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];
// Lines of code 124-132 is the Data Structure of the graph!
var start_path = [
    //origin vertex, destination vertex,                    max flow,                      current flow
    [       [1,2],          [2,4],          ((knightsBoard[1][2] + knightsBoard[2][4]) / 2),    0   ],
    [       [2,4],          [4,3],          ((knightsBoard[2][4] + knightsBoard[4][3]) / 2),    0   ],
    [       [4,3],          [5,5],          ((knightsBoard[4][3] + knightsBoard[5][5]) / 2),    0   ],
    [       [5,5],          [4,7],          ((knightsBoard[5][5] + knightsBoard[4][7]) / 2),    0   ],
    [       [4,7],          [6,8],          ((knightsBoard[4][7] + knightsBoard[6][8]) / 2),    0   ],
    [       [6,8],          [8,7],          ((knightsBoard[6][8] + knightsBoard[8][7]) / 2),    0   ],
];

var first_path = [[1,2],[1,2], [2,-1],[1,2], [-1,2],[2,1], [2,-1]];
var vertices = [ [1,2], [2,4], [4,3], [5,5], [4,7], [6,8], [8,7] ];
var edges = start_path;
var grid_x_space = 85; 
var grid_y_space = 85; 
var grid_x = 10; 
var grid_y = 10; 
var nodelist = [];


const DIRECTIONS = [
    [-1,-2], // UP_LEFT
    [ 1,-2], // UP_RIGHT
    [-2,-1], // LEFT_UP
    [-2, 1], // LEFT_DOWN
    [-1, 2], // DOWN_LEFT
    [ 1, 2], // DOWN_RIGHT
    [ 2,-1], // RIGHT_UP
    [ 2, 1]  // RIGHT_DOWN
];
// enum variables used to index arrays

const OG_VER = 0;
const DT_VER = 1;
const MAX_FLOW = 2;
const CURR_FLOW = 3;
const X_CORD = 0;
const Y_CORD = 1;

var total_edge_pile = Math.floor(Math.random() * 15.99) + 15;
var edge_pile = total_edge_pile - 6;

for(var x = 0; x < grid_x; x++){
    for(var y = 0; y < grid_y; y++){
        // flow_val ensure the flow_value number is generated to equal or less
        var flow_val = 2 * Math.floor(Math.random() * 15.99);
        knightsBoard[x][y] = flow_val;
        nodelist.push(
            {x_pos : (x*grid_x_space), 
            y_pos : (y*grid_y_space), 
            max_value: flow_val, 
            flow_value : 0
            });
    }
}

while(edge_pile > 1)
{
    var current_highest = 0;
    var start = [-1,-1];
    var highest_target = [-1,-1];
    var highest_return = [-1,-1];
    var first_edge_flow = 0;
    var second_edge_flow = 0;
    
    var edge_count = edges.length;
    for(var edge = 0; edge < edge_count; edge++)
    {
        var this_x = edges[edge][OG_VER][X_CORD];
        var this_y = edges[edge][OG_VER][Y_CORD];
        
        var targets = [];
        
        //From the current vertex, check all 8 directions to find target vertices
        for(var direction = 0; direction < DIRECTIONS.length; direction++)
        {
            var target_vertex_x = this_x + DIRECTIONS[direction][X_CORD];
            var target_vertex_y = this_y + DIRECTIONS[direction][Y_CORD];
            
            //check the bounds
            if(target_vertex_x > 9 || target_vertex_y > 9 || target_vertex_x < 0 || target_vertex_y < 0)
                continue;
            
            //check if target_vertex is already in the vertices list
            var found = false;
            for(var vertix = 0; vertix < vertices.length; vertix++)
            {
                if(target_vertex_x == vertices[vertix][X_CORD] && target_vertex_y == vertices[vertix][Y_CORD])
                {
                    found = true;
                    break;
                }
            }
            if(found == false)
            {
                targets.push([target_vertex_x, target_vertex_y]);   
            }
        }
        //Once all targets have been found, iterate through them to find candidate edge pairs
        for(var target = 0; target < targets.length; target++)
        {
            var target_x = targets[target][X_CORD];
            var target_y = targets[target][Y_CORD];
            
            //Once again, we iterate through all 8 directions to find return vertex candidates
            for(var direction = 0; direction < DIRECTIONS.length; direction++)
            {
                var return_vertex_x = target_x + DIRECTIONS[direction][X_CORD];
                var return_vertex_y = target_y + DIRECTIONS[direction][Y_CORD];
                
                //check the bounds
                if(return_vertex_x > 9 || return_vertex_y > 9 || return_vertex_x < 0 || return_vertex_y < 0)
                    continue;
                
                //Prevent a closed loop by not allowing the return vertex to equal the source vertex
                if(return_vertex_x == this_x && return_vertex_y == this_y)
                    continue;
                
                //The return vertex must be in the list of vertices, so continue if not
                var found = false;
                for(var vertix = 0; vertix < vertices.length; vertix++)
                {
                    if(target_x == vertices[vertix][X_CORD] && target_y == vertices[vertix][Y_CORD])
                    {
                        found = true;
                        break;
                    }
                }
                if(found == true)
                {
                    var target_flow = ((knightsBoard[this_x][this_y] + knightsBoard[target_x][target_y]) / 2);
                    var return_flow = ((knightsBoard[target_x][target_y] + knightsBoard[return_vertex_x][return_vertex_y]) / 2);
                    var max_flow = Math.min(target_flow, return_flow);
                    
                    if(max_flow > current_highest)
                    {
                        current_highest = max_flow;
                        highest_target[X_CORD] = target_x;
                        highest_target[Y_CORD] = target_y;
                        highest_return[X_CORD] = return_vertex_x;
                        highest_return[Y_CORD] = return_vertex_y;
                        start[X_CORD] = this_x;
                        start[Y_CORD] = this_y;
                        first_edge_flow = target_flow;
                        second_edge_flow = return_flow;
                    }
                }
            }
        }
    }
    if(current_highest > 0)
    {
        var left_edge =  [   [start[X_CORD],start[Y_CORD]],    [highest_target[X_CORD],highest_target[Y_CORD]],  first_edge_flow, 0 ];
        var right_edge = [   [highest_target[X_CORD],highest_target[Y_CORD]], [highest_return[X_CORD],highest_return[Y_CORD]], second_edge_flow, 0 ];
        edges.push(left_edge);
        edges.push(right_edge);
    }
    
    edge_pile -= 2;
}

// ================ Breadth First Search ===============================

//parents will be a list of vertex indexes that hold the coordinates of the parent node
var parents = new Array(vertices.length);
function BFS(sourceVertex, sinkVertex)
{
    //queue consists of ints that represent the vertex index of the vertices array
    var queue = [];
    //visited consists of a boolean array that keeps track if the vertex index has been visited
    var visited = new Array(vertices.length);
    //initialize all visited to false and reset the parents array
    for(var i = 0; i < vertices.length; i++)
    {
        visited[i] = false;
        parents[i] = -1;
    }
    
    //Add first element to queue
    queue.push(sourceVertex);
    visited[sourceVertex] = true;
    
    //BFS Loop
    while(queue.length > 0)
    {
        var front = queue[0];
        queue.shift();
        
        for(var vertex = 0; vertex < vertices.length; vertex++)
        {
           //Only consider vertices that have not been visited
           if(visited[vertex] == true)
               continue;
           var this_vertex = vertices[vertex];
           //Find all edges that have this_vertex as its origin vertex
            for(var edge = 0; edge < edges.length; edge++)
            {
                //This if checks if a path exists from the front element of the queue to the current vertex in question
                if(edges[edge][OG_VER][X_CORD] == front[X_CORD] &&
                   edges[edge][OG_VER][Y_CORD] == front[Y_CORD] &&
                   edges[edge][DT_VERT][X_CORD] == this_vertex[X_CORD] &&
                   edges[edge][DT_VERT][Y_CORD] == this_vertex[Y_CORD] &&
                   edges[edge][MAX_FLOW] - edges[edge][CURR_FLOW] > 0)
                {
                    queue.push(vertex);
                    parents[vertex] = front;
                    visited[vertex] = true;
                }
            }
        }
    }
    return (visited[sinkVertex] == true);
}

// ==================== FORD_FULKERSON Algorithm ==========================
function Ford_Fulkerson(sourceVertex, sinkVertex)
{
    var u; //Origin vertex
    var v; //Destination vertex
    var max_flow = 0;

    //Increasing the flow while a path exists from source to sink
    while(BFS(sourceVertex, sinkVertex))
    {
        //settting flow of the path to arbitrarily high number
        var path_flow = 9999;
        //this loop traverses the path backwards
        for(v = sinkVertex; v != sourceVertex; v = parents[v])
        {
            //Origin of the edge in question
            u = parents[v];
            //find the edge that corresponds to the current edge
            for(var edge = 0; edge < edges.length; edge++)
            {
                if(edges[edge][OG_VER][X_CORD] == vertices[u][X_CORD] &&
                    edges[edge][OG_VER][Y_CORD] == vertices[u][Y_CORD] &&
                    edges[edge][DT_VER][X_CORD] == vertices[v][X_CORD] &&
                    edges[edge][DT_VER][Y_CORD] == vertices[v][X_CORD])
                {
                    //Keep track of the lowest possible flow through the path
                    path_flow = Math.min(path_flow, edges[edge][MAX_FLOW] - edges[edge][CURR_FLOW]);
                    break;
                }
            }
        }
        //Once more, iterate through the path and increase the flow of each edge
        for(v = sinkVertex; v != sourceVertex; v = parents[v])
        {
            u = parents[v];
            //We find the edge that corresponds to the origin/destination pair
            for(var edge = 0; edge < edges.length; edge++)
            {
                if(edges[edge][OG_VER][X_CORD] == vertices[u][X_CORD] &&
                    edges[edge][OG_VER][Y_CORD] == vertices[u][Y_CORD] &&
                    edges[edge][DT_VER][X_CORD] == vertices[v][X_CORD] &&
                    edges[edge][DT_VER][Y_CORD] == vertices[v][X_CORD])
                {
                    //Once we've found it, we increase its flow
                    edges[edge][CURR_FLOW] += path_flow;
                    // Since there will only be exactly 1, we do not need to continue searching
                    break;
                }
            }                 
        }
        max_flow += path_flow;
    }
    return max_flow;
}
               
               
// ======================= THE ONE CALL THAT MAKES THE ENTIRE ALGORITHM WORK =================
var TOTAL_MAX_FLOW = Ford_Fulkerson(0,6);
// =====================================================  draw_grid ====
/*
function draw_grid( rctx, rminor, rmajor, rstroke, rfill  )
{
    rctx.save( );
    rctx.strokeStyle = rstroke;
    rctx.fillStyle = rfill;
    let width = grid_x_space * grid_x; //rctx.canvas.width - (rctx.canvas.width % grid_x);
    let height = grid_y_space * grid_y; //rctx.canvas.height - (rctx.canvas.height % grid_y);
    for ( var ix = 0; ix <= width; ix += rminor)
    {
        rctx.beginPath( );
        rctx.moveTo( ix, 0 );
        rctx.lineTo( ix, height );
        rctx.lineWidth = .5; //( ix % rmajor == 0 ) ? 0.5 : 0.25;
        rctx.stroke( );
        //if ( ix % rminor == 0 ) { rctx.fillText( ix, ix, 10 ); }
    }
    for ( var iy = 0; iy <= height; iy += rmajor )
    {
        rctx.beginPath( );
        rctx.moveTo( 0, iy );
        rctx.lineTo( width, iy );
        rctx.lineWidth = .5; //( iy % rmajor == 0 ) ? 0.5 : 0.25;
        rctx.stroke( );
        //if ( iy % rminor == 0 ) {rctx.fillText( iy, 0, iy + 10 );}
    }
    draw_box(rctx);
    rctx.restore( );
}

//draws the values on the grid
function assign_value_to_grid(gctx, nodel){
    for(var w = 0; w < nodel.length; w++){
        var dis_text = "<" + String(nodel[w].max_value) + " , " + String(nodel[w].flow_value) + ">"; 
        gctx.fillText(dis_text, nodel[w].x_pos + 20 , nodel[w].y_pos + 43);
    }
}

//====================================================== draw box
function draw_line( lctx, x_pos, y_pos ) //, stroke, fill )
{
    stroke = 'black';
    fill = 'black';
    lctx.save();
    lctx.strokeStyle = stroke;
    lctx.fillStyle = fill;
    lctx.lineWidth = 2;
    lctx.beginPath();
    lctx.moveTo(0, 0);
    lctx.lineTo(x_pos, y_pos);
    lctx.stroke();
    lctx.fill();
    lctx.restore( );
}

//====================================================== draw box
function draw_box( ctx ) //, stroke, fill )
{
    for(var i = 0;  i < 850; i+=85){
        var j = 0;
        if ((i / 85) % 2 == 0){
            j = 85;
        }
        for( ; j < 850; j+=170){
            stroke = 'gray';
            fill = 'gray';
            ctx.save( );
            ctx.strokeStyle = stroke;
            ctx.fillStyle = fill;
            ctx.lineWidth = 5;
            //ctx.rect(194, 54, 3, 3);
            ctx.rect(j+3, i+3, 79, 79 )
            ctx.stroke();
            ctx.fill();
            ctx.restore( );
        }
    }
}
*/