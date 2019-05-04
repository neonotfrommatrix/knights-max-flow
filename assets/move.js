var insertcanvas = document.getElementById( "Knightsgrid" );
var insertcontext = insertcanvas.getContext( "2d" );
var grid_x_space = 85; 
var grid_y_space = 85; 
var grid_x = 10; 
var grid_y = 10; 
var nodelist = [];
var knightsBoard = [
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

function add_edge_pair(){
    if(edge_pile > 1)
    {
        var current_highest = 0;
        var start = [-1,-1];
        var highest_target = [-1,-1];
        var highest_return = [-1,-1];
        var first_edge_flow = 0;
        var second_edge_flow = 0;
        var vertex_count = vertices.length;
        for(var vertex = 0; vertex < vertex_count; vertex++)
        {
            var this_x = vertices[vertex][X_CORD];
            var this_y = vertices[vertex][Y_CORD];
            
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
                    for(var v = 0; v < vertices.length; v++)
                    {
                        if(return_vertex_x == vertices[v][X_CORD] && return_vertex_y == vertices[v][Y_CORD])
                        {
                            found = true;
                            break;
                        }
                    }
                    if(found == true)
                    {
                        var heuristic = 1;
                        var target_flow = ((knightsBoard[this_x][this_y] + knightsBoard[target_x][target_y]) / 2);
                        var return_flow = ((knightsBoard[target_x][target_y] + knightsBoard[return_vertex_x][return_vertex_y]) / 2);
                        var max_flow = Math.min(target_flow, return_flow);
                        var left_edge =  [   [start[X_CORD],start[Y_CORD]],    [highest_target[X_CORD],highest_target[Y_CORD]],  first_edge_flow, 0 ];
                        var right_edge = [   [highest_target[X_CORD],highest_target[Y_CORD]], [highest_return[X_CORD],highest_return[Y_CORD]], second_edge_flow, 0 ];
                        edges.push(left_edge);
                        edges.push(right_edge);
                        vertices.push([highest_target[X_CORD],highest_target[Y_CORD]]);
                        var increased_flow = Ford_Fulkerson(0,6);
                        edges.pop();
                        edges.pop();
                        vertices.pop();
                        if(highest_return[X_CORD] == 8 && highest_return[Y_CORD] == 7)
                            heuristic++;
                        if(start[X_CORD] == 1 && start[Y_CORD] == 2)
                            heuristic++;
                        
                        var total_score = (max_flow * heuristic) + (increased_flow * 10);
                        if( total_score > current_highest)
                        {
                            current_highest = total_score;
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
        //Reset flows back to 0
        for(var edge = 0; edge < edges.length; edge++)
        {
            edges[edge][CURR_FLOW] = 0;
        }
    }
}

// ================ Breadth First Search ===============================

//parents will be a list of vertex indexes that hold the coordinates of the parent node
var parents = new Array(30);
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
           {
               continue;
           }
           var origin_vertex = vertices[front];
           var this_vertex = vertices[vertex];
           //Find all edges that have this_vertex as its origin vertex
            for(var edge = 0; edge < edges.length; edge++)
            {                
                //This if checks if a path exists from the front element of the queue to the current vertex in question
                if(edges[edge][OG_VER][X_CORD] == origin_vertex[X_CORD] 
                && edges[edge][OG_VER][Y_CORD] == origin_vertex[Y_CORD]
                && edges[edge][DT_VER][X_CORD] == this_vertex[X_CORD] 
                && edges[edge][DT_VER][Y_CORD] == this_vertex[Y_CORD] 
                && edges[edge][MAX_FLOW] - edges[edge][CURR_FLOW] > 0)
                {
                    queue.push(vertex);
                    parents[vertex] = front;
                    visited[vertex] = true;
                }
            }
        }
    }
    if(visited[sinkVertex] == true)
    {
        return true;
    }
    return false;
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
            var origin = vertices[u];
            var destination = vertices[v];
            //find the edge that corresponds to the current edge
            for(var edge = 0; edge < edges.length; edge++)
            {
                if(edges[edge][OG_VER][X_CORD] == origin[X_CORD] &&
                    edges[edge][OG_VER][Y_CORD] == origin[Y_CORD] &&
                    edges[edge][DT_VER][X_CORD] == destination[X_CORD] &&
                    edges[edge][DT_VER][Y_CORD] == destination[Y_CORD])
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
                    edges[edge][DT_VER][Y_CORD] == vertices[v][Y_CORD])
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
