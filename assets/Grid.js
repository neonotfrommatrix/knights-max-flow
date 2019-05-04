//====================================================================================================
//  Grid stuff
//====================================================================================================
var grid_x_space = 85;
var grid_y_space = 85;
var grid_x = 10;
var grid_y = 10;

function draw_grid(rctx, rminor, rmajor, rstroke, rfill) {
    rctx.save();
    rctx.strokeStyle = rstroke;
    rctx.fillStyle = rfill;
    let width = grid_x_space * grid_x; //rctx.canvas.width - (rctx.canvas.width % grid_x);
    let height = grid_x_space * grid_y; //rctx.canvas.height - (rctx.canvas.height % grid_y);
    for (var ix = 0; ix <= width; ix += rminor) {
        rctx.beginPath();
        rctx.moveTo(ix, 0);
        rctx.lineTo(ix, height);
        rctx.lineWidth = .5; //( ix % rmajor == 0 ) ? 0.5 : 0.25;
        rctx.stroke();
        //if ( ix % rminor == 0 ) { rctx.fillText( ix, ix, 10 ); }
    }
    for (var iy = 0; iy <= height; iy += rmajor) {
        rctx.beginPath();
        rctx.moveTo(0, iy);
        rctx.lineTo(width, iy);
        rctx.lineWidth = .5; //( iy % rmajor == 0 ) ? 0.5 : 0.25;
        rctx.stroke();
        //if ( iy % rminor == 0 ) {rctx.fillText( iy, 0, iy + 10 );}
    }
    draw_box(rctx);
    rctx.restore();
}

//draws the values on the grid
function assign_value_to_grid(gctx, nodel) {
    for (var w = 0; w < nodel.length; w++) {
        var dis_text = "<" + String(nodel[w].max_value) + " , " + String(nodel[w].flow_value) + ">";
        gctx.fillText(dis_text, nodel[w].x_pos + 20, nodel[w].y_pos + 43);
    }
}

// draw numbers
function draw_numbers(gctx) {
    for (var y = 0; y < 10; ++y) {
        for (var x = 0; x < 10; ++x) {
            var num = x + (y * 10);
            gctx.fillText(num, (x * 85) + 38, (y * 85) + 63);
        }
    }
}

//draw source and sink
function draw_source_and_sink(gctx) {
    //console.log(source.x_pos)
    var string1 = ("Source");
    var string2 = ("Sink");
    gctx.fillText(string1, source.x_pos + 20, source.y_pos + 53);
    gctx.fillText(string2, sink.x_pos + 20, sink.y_pos + 53);
}

//====================================================== draw box
function draw_line(lctx, x_pos, y_pos) //, stroke, fill )
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
    lctx.restore();
}


//====================================================== draw box
function draw_box(ctx) //, stroke, fill )
{
    for (var i = 0; i < 850; i += 85) {
        var j = 0;
        if ((i / 85) % 2 == 0) {
            j = 85;
        }
        for (; j < 850; j += 170) {
            stroke = 'gray';
            fill = 'gray';
            ctx.save();
            ctx.strokeStyle = stroke;
            ctx.fillStyle = fill;
            ctx.lineWidth = 5;
            //ctx.rect(194, 54, 3, 3);
            ctx.rect(j + 3, i + 3, 79, 79)
            ctx.stroke();
            ctx.fill();
            ctx.restore();
        }
    }
}

//print the graph
function printGraph(pstx) {

    for (var i = 0; i < vertices.length - 1; ++i) {
        var nowX = Math.floor(vertices[i] % 10);
        var nowY = Math.floor(vertices[i] / 10);
        var nextX = Math.floor(vertices[i + 1] % 10);
        var nextY = Math.floor(vertices[i + 1] / 10);
        pstx.beginPath();
        pstx.moveTo(nowX * 85 + 43, nowY * 85 + 43);
        pstx.lineTo(nextX * 85 + 43, nextY * 85 + 43);
        pstx.stroke();
    }
}
