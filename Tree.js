import Node from "./Node.js";

class Tree {
    #rootNode = null;
    #dataArray = null;

    constructor(array = []) {
        this.#dataArray = this.removeDuplicatesSort(array);
        this.#rootNode = this.buildTree();
    }

    removeDuplicatesSort(array) {
        return Object.values(array.reduce((accumulator, value) => {
            if (!accumulator[`${value}`]) accumulator[`${value}`] = value;

            return accumulator;
        }, {}));
    }

    buildTree(dataArray = this.#dataArray) {
        if (dataArray.length == 0) return null;

        let midIndex = Math.floor(dataArray.length / 2);

        let midElement = dataArray[midIndex];
        let leftNode = this.buildTree(dataArray.slice(0, midIndex));
        let rightNode = this.buildTree(dataArray.slice(midIndex + 1));

        let node = new Node(midElement, leftNode, rightNode);

        return node;
    }

    insert(value) {
        this.#rootNode = this.#recInsert(this.#rootNode, value);
    }

    #recInsert(node, value) {
        if (node == null) return new Node(value);

        if (value < node.value)
            node.nodeLeft = this.#recInsert(node.nodeLeft, value);
        else if (value > node.value)
            node.nodeRight = this.#recInsert(node.nodeRight, value);

        return node;
    }

    delete(value) {
        this.#rootNode = this.#recDelete(this.#rootNode, value);
    }

    #recDelete(node, value) {
        if (node.value === value && !node.nodeLeft && !node.nodeRight) {
            return null;
        }
        else if (node.value === value && node.nodeLeft && !node.nodeRight) {
            node = node.nodeLeft;
            return node;
        }
        else if (node.value === value && node.nodeRight && !node.nodeLeft) {
            node = node.nodeRight;
            return node;
        } else if (node.value === value && node.nodeRight && node.nodeLeft) {
            
        }

        if (value < node.value)
            node.nodeLeft = this.#recDelete(node.nodeLeft, value);
        else if (value > node.value)
            node.nodeRight = this.#recDelete(node.nodeRight, value);

        return node;
    }

    #recNextSmallest(nodeToDelete, parentNode) {
        
    }

    prettyPrint(node = this.#rootNode, prefix = "", isLeft = true) {
        if (node == null) {
            return;
        }

        if (node.nodeRight != null) {
            this.prettyPrint(node.nodeRight, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }

        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
        if (node.nodeLeft != null) {
            this.prettyPrint(node.nodeLeft, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }
}

export default Tree;

