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