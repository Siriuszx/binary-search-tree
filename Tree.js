import Node from "./Node.js";

class Tree {
    rootNode = null;

    constructor(array) {
        this.rootNode = this.arrayToBST(array);
    }

    arrayToBST(dataArray) {
        if (dataArray.length == 0) return null;

        let midIndex = Math.floor(dataArray.length / 2);

        let midElement = dataArray[midIndex];
        let leftNode = this.arrayToBST(dataArray.slice(0, midIndex));
        let rightNode = this.arrayToBST(dataArray.slice(midIndex + 1));

        let node = new Node(midElement, leftNode, rightNode);

        return node;
    }

    prettyPrint(node = this.rootNode, prefix = "", isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.nodeRight !== null) {
            this.prettyPrint(node.nodeRight, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
        if (node.nodeLeft !== null) {
            this.prettyPrint(node.nodeLeft, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }
}

export default Tree;

