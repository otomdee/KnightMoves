//Node class
class Node {
    constructor(row, col) {
        this.spot = [row,col];
        this.next = null;
    }
}
// create board
const board = [];
for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        board.push(new Node(i, j));
    }
}
//populate board
board.forEach((head) => {
    populate(head);
})

//bfs to find shortest path
function knightMoves(start, targetSpot) {
    let head = board[(start[0] * 8) + start[1]];
    let queue = [];
    let node = head;
    let visited = [];
    prev = [];
    //populate prev
    for (let i = 0; i < 64; i++) {
        prev.push(-1);
    }

    do {
            //check if we've found our required Node
            if ((targetSpot[0] === node.spot[0]) && (targetSpot[1] === node.spot[1])) {
                break;
            }
            //pop node from queue
            queue.splice(0,1);
            //add node to visited
            visited.push(node.spot);
            //add node children to queue
            let innerNode = node.next;
            while(innerNode) {
                if (visited.includes((board[(innerNode.spot[0] * 8) + innerNode.spot[1]]).spot)) {
                    innerNode = innerNode.next;
                    continue;
                }
                else {
                    queue.push(board[(innerNode.spot[0] * 8) + innerNode.spot[1]]);
                    //change prev[child] to current node when queueing children of said node;
                    prev[(innerNode.spot[0] * 8) + innerNode.spot[1]] = (node.spot[0] * 8) + node.spot[1];
                    //tests
                    innerNode = innerNode.next;
                }
            }
            //go to first item on queue
            node = queue[0];
    }
    while(queue[0]);

    //construct path;
    let prevRev = [];
    let pos = (node.spot[0] * 8) + node.spot[1];
    do {
        prevRev.push(board[pos].spot);
        pos = prev[pos];
    }
    while(!(pos === (head.spot[0] * 8) + head.spot[1]));
    prevRev.push(head.spot);
    prevRev.reverse();
    console.log(`You made it in ${prevRev.length - 1} moves! Here's your path: `);
    prevRev.forEach((item) => {
        console.log(`\n${item}`);
    })
    return (prevRev);
}

function listTail(head) {
    let node = head;
    while(!(node.next === null)) {
        node = node.next;
    }
    return node; 
}

function populate(head) {
    let row = head.spot[0];
    let col = head.spot[1];

    let length = 0;
    let leftOp = 1;
    let rightOp = 1;
    //row loop
    while (length < 4) {
        if ((row + (2 * leftOp) < 0 || row + (2 * leftOp) > 7) || (col + (1 * rightOp) < 0 || col + (1 * rightOp) > 7)) {
            if (length === 1) {
                leftOp *= -1;
            }
            rightOp *= -1;
            length++;
            continue;
        }
        else {
            const node = new Node(row + (2 * leftOp), col + (1 * rightOp));
            listTail(head).next = node;
            if (length === 1) {
                leftOp *= -1;
            }
            rightOp *= -1;
            length++;
        }
    }
    //reset length and sense variables
    leftOp = 1;
    rightOp = 1;
    length = 0;
    //column loop;
    while (length < 4) {
        if ((row + (1 * rightOp) < 0 || row + (1 * rightOp) > 7) || col + (2 * leftOp) < 0 || col + (2 * leftOp) > 7) {
            if (length === 1) {
                leftOp *= -1;
            }
            rightOp *= -1;
            length++;
            continue;
        }
        else {
            const node = new Node(row + (1 * rightOp), col + (2 * leftOp));
            listTail(head).next = node;
            if (length === 1) {
                leftOp *= -1;
            }
            rightOp *= -1;
            length++;
        }
    }
}