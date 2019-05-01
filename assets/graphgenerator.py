import random
import json
generateGraph = True
debug = False
#
# Grid and variables
#
ordered_grid = [
    [0,1,2,3,4,5,6,7,8,9],
    [10,11,12,13,14,15,16,17,18,19],
    [20,21,22,23,24,25,26,27,28,29],
    [30,31,32,33,34,35,36,37,38,39],
    [40,41,42,43,44,45,46,47,48,49],
    [50,51,52,53,54,55,56,57,58,59],
    [60,61,62,63,64,65,66,67,68,69],
    [70,71,72,73,74,75,76,77,78,79],
    [80,81,82,83,84,85,86,87,88,89],
    [90,91,92,93,94,95,96,97,98,99],
]
grid = [
    [0,1,2,3,4,5,6,7,8,9],
    [10,11,12,13,14,15,16,17,18,19],
    [20,21,22,23,24,25,26,27,28,29],
    [30,31,32,33,34,35,36,37,38,39],
    [40,41,42,43,44,45,46,47,48,49],
    [50,51,52,53,54,55,56,57,58,59],
    [60,61,62,63,64,65,66,67,68,69],
    [70,71,72,73,74,75,76,77,78,79],
    [80,81,82,83,84,85,86,87,88,89],
    [90,91,92,93,94,95,96,97,98,99],
]
UP_LEFT = (-1,-2)
UP_RIGHT = (1,-2)
LEFT_UP = (-2,-1)
LEFT_DOWN = (-2,1)
DOWN_LEFT = (-1,2)
DOWN_RIGHT = (1,2)
RIGHT_UP = (2,-1)
RIGHT_DOWN = (2,1)

DIRECTIONS = [UP_LEFT, UP_RIGHT, LEFT_DOWN, LEFT_UP, DOWN_LEFT, DOWN_RIGHT, RIGHT_DOWN, RIGHT_UP]
#
# Randomly fill grid. Randomly pick pile of edges 
#
for row in range(0, 10):
    for column in range (0,10):
        grid[row][column] = random.randint(0,15) * 2

edge_pile_start = random.randint(15,30) 
edge_pile = edge_pile_start - 6

#
# Hardcoded Path
#
start_path = [(21,42),(42,34),(34,55),(55,74),(74,86),(86,78)]

#
# List of Edges and Vertices
#
vertices = [21,42,34,55,74,86,78]
edges = start_path
#
# Fill path with edges
#
while edge_pile > 1:
    current_highest = 0
    start = -1
    highest_target = -1
    highest_return = -1
    for left,right in edges:
        if debug:
            print(left, right)
        this_y = int(left / 10)
        this_x = left % 10
        targets = []
        if debug:
            print(this_x, this_y)
            print("TARGETS: ")
        for dir_x, dir_y in DIRECTIONS:
            target_vertex_y = this_y + dir_y
            if target_vertex_y > 9 or target_vertex_y < 0:
                continue
            target_vertex_x = this_x + dir_x
            if target_vertex_x > 9 or target_vertex_x < 0:
                continue
            target_vertex = (target_vertex_y * 10) + target_vertex_x
            if target_vertex in vertices:
                continue
            targets.append(target_vertex)

        for target_vertex in targets:   
            target_y = int(target_vertex / 10)
            target_x = target_vertex % 10
            for dir_x, dir_y in DIRECTIONS:
                return_vertex_y = target_y + dir_y
                if return_vertex_y > 9 or return_vertex_y < 0:
                    continue
                return_vertex_x = target_x + dir_x
                if return_vertex_x > 9 or return_vertex_x < 0:
                    continue
                return_vertex = (return_vertex_y * 10) + return_vertex_x
                if return_vertex not in vertices or return_vertex == left:
                    continue

                if debug:
                    print("Candidate Edge Pair : ", left, target_vertex, return_vertex)
                max_flow = min(grid[target_x][target_y], grid[return_vertex_x][return_vertex_y])
                if debug:
                    print("Edge Flow : ", max_flow)
                if max_flow > current_highest:
                    current_highest = max_flow
                    highest_target = target_vertex
                    highest_return = return_vertex
                    start = left
                    if debug:
                        print("Best Edge found : Flow {}, Start {}, Target {}, Return {}".format(current_highest, start, highest_target, highest_return))
    if current_highest > 0:
        if debug:    
            print("ADDING EDGE PAIRS: ", [(start, highest_target), (highest_target,highest_return)])
        edges.extend([(start, highest_target), (highest_target,highest_return)])
        vertices.append(highest_target)
    edge_pile -= 2

# Print Results
if debug:
    print("ORDERED\n")
    print(*ordered_grid, sep='\n')
    print("ACTUAL\n")
    print(*grid, sep='\n')
print("EDGES: {} pile of edges\n{} Total edges in graph\n{}".format(edge_pile_start, len(edges), edges))

if generateGraph:
    graph = {
        "edges": [],
        "vertices": vertices
    }
    for left, right in edges:
        edge = {
            "left": left,
            "right": right
        }
        graph['edges'].append(edge)

    with open('graph.json', 'w') as out:
        json.dump(graph, out)
