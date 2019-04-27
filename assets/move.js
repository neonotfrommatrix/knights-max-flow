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

//creates the grid sizes 
var grid_x_space = 85; 
var grid_y_space = 85; 
var grid_x = 10; 
var grid_y = 10; 
//console.log(grid_x_space, grid_y_space, grid_x, grid_y);

//creats a list of nodes which store the random value with their x and y position in the grid
var nodelist = [];
for(var x = 0; x < 800; x += grid_x_space){
    for(var y = 0; y < 800; y += grid_y_space){
        // flow_val ensure the flow_value number is generated to equal or less
        var flow_val = 2 * Math.floor((Math.random() * 15) + 1);
        nodelist.push({x_pos : x, y_pos : y, max_value: flow_val, flow_value : Math.floor((Math.random() * flow_val) + 1)});
    }
}

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

// =====================================================  draw_grid ====
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