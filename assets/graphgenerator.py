import random
import json

# Flag that determines if the grid and graphs should be generated. By default
#   true, so each time this code is ran, a new grid and graph are created.
generateGraph = True

# Set flag to true if debugging print statements are needed.
debug = False


#
# Grid and variables
#

# This grid just houses numbers 0 - 99 to better visualize the graph and its
#   indices. Useful when debugging.
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
# This grid will get overwritten with randon values from 0-30
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

# All 8 possible directions for a kt-move in the graph
UP_LEFT = (-1,-2)
UP_RIGHT = (1,-2)
LEFT_UP = (-2,-1)
LEFT_DOWN = (-2,1)
DOWN_LEFT = (-1,2)
DOWN_RIGHT = (1,2)
RIGHT_UP = (2,-1)
RIGHT_DOWN = (2,1)

# A list that holds all 8 directions to make it easy to iterate through
DIRECTIONS = [UP_LEFT, UP_RIGHT, LEFT_DOWN, LEFT_UP, DOWN_LEFT, DOWN_RIGHT, RIGHT_DOWN, RIGHT_UP]

#
# Randomly fill grid. Randomly pick pile of edges 
#
for row in range(0, 10):
    for column in range (0,10):
        grid[row][column] = random.randint(0,15) * 2

# Our pile of edges will be a random number between 15 to  30
edge_pile_start = random.randint(15,30)

# Since the beginning hardcoded path has 6 edges, we subtract them from the total
edge_pile = edge_pile_start - 6

#
# Hardcoded Path
#

# This path leads from the source to the sink
start_path = [(21,42),(42,34),(34,55),(55,74),(74,86),(86,78)]

#
# List of Edges and Vertices
#

vertices = [21,42,34,55,74,86,78]
edges = start_path

#
# Fill path with edges
#

# Since we will be adding edges in pairs, the loop executes up until
#   there are 1 or 0 edges left to place. The choice was made to just
#   ignore the last edge if the pile is an odd number.
while edge_pile > 1:
    current_highest = 0
    start = -1
    highest_target = -1
    highest_return = -1

    # Loop that iterates through each edge
    for left,right in edges:

        if debug:
            print(left, right)
        
        # Since a vertex is reprenseted as a single number (instead of a coordinate pair),
        #   we need to extract the x,y values from the number
        this_y = int(left / 10)
        this_x = left % 10
        # This is a list of valid targets for the right vertex of the first edge being added
        targets = []

        if debug:
            print(this_x, this_y)
            print("TARGETS: ")

        # This loop iteraes through each of the 8 possible kt-moves
        for dir_x, dir_y in DIRECTIONS:
            target_vertex_y = this_y + dir_y

            # These are checks to make sure the target destination is in-bounds
            if target_vertex_y > 9 or target_vertex_y < 0:
                continue
            target_vertex_x = this_x + dir_x
            if target_vertex_x > 9 or target_vertex_x < 0:
                continue

            # Recreating the int representation of the vertext using x,y    
            target_vertex = (target_vertex_y * 10) + target_vertex_x
            # We don't consider vertices already in the graph, since that means the edge exists
            if target_vertex in vertices:
                continue

            # If all the checks passed, that means the target is a valid candidate
            targets.append(target_vertex)

        # Loop that iterates through each valid target to attempt to find the second edge
        for target_vertex in targets:
            # Splitting the int into x,y format
            target_y = int(target_vertex / 10)
            target_x = target_vertex % 10

            # Loop that iterates through all 8 kt-moves to find a valid right vertext for the second edge
            for dir_x, dir_y in DIRECTIONS:

                # Checking that the resulting coordinate is in-bounds
                return_vertex_y = target_y + dir_y
                if return_vertex_y > 9 or return_vertex_y < 0:
                    continue
                return_vertex_x = target_x + dir_x
                if return_vertex_x > 9 or return_vertex_x < 0:
                    continue
                return_vertex = (return_vertex_y * 10) + return_vertex_x

                # This time, we want the vertex to exist to ensure the graph is connected. The second check
                #   ensures that the left vertex of the first edge is different from the right vertex of the
                #   second edge because that would cause a closed loop of 2 edges.
                if return_vertex not in vertices or return_vertex == left:
                    continue

                if debug:
                    print("Candidate Edge Pair : ", left, target_vertex, return_vertex)

                # The max flow is computed by determining the minimum flow of the two candidate edges
                max_flow = min(grid[target_x][target_y], grid[return_vertex_x][return_vertex_y])

                if debug:
                    print("Edge Flow : ", max_flow)

                # If the max flow is the highest we've seen, we store all the information related to it
                if max_flow > current_highest:
                    current_highest = max_flow
                    highest_target = target_vertex
                    highest_return = return_vertex
                    start = left

                    if debug:
                        print("Best Edge found : Flow {}, Start {}, Target {}, Return {}".format(current_highest, start, highest_target, highest_return))

    # This checks that we indeed found a pair of edges that can be added to the graph.                    
    if current_highest > 0:
        if debug:    
            print("ADDING EDGE PAIRS: ", [(start, highest_target), (highest_target,highest_return)])
        edges.extend([(start, highest_target), (highest_target,highest_return)])
        vertices.append(highest_target)

    # Since edges are added 2 at a time, we subtract our pile by 2 on each pass
    edge_pile -= 2

# Print Results
if debug:
    print("ORDERED\n")
    print(*ordered_grid, sep='\n')
    print("ACTUAL\n")
    print(*grid, sep='\n')
print("EDGES: {} pile of edges\n{} Total edges in graph\n{}".format(edge_pile_start, len(edges), edges))

if generateGraph:
    # The graph will be represented as a json object
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

    # The grid is represented as 100 integers in a file, each on a separate line for easier parsing
    with open('grid.txt', 'w') as out:
        for row in range(0, 10):
            for column in range (0,10):
                out.write("%s\n" % grid[row][column])
