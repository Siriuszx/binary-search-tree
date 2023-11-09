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
        let nodeLeft = this.buildTree(dataArray.slice(0, midIndex));
        let nodeRight = this.buildTree(dataArray.slice(midIndex + 1));

        let node = new Node(midElement, nodeLeft, nodeRight);

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

    #recDelete(nodeToDelete, value) {
        if (value < nodeToDelete.value)
            nodeToDelete.nodeLeft = this.#recDelete(nodeToDelete.nodeLeft, value);
        else if (value > nodeToDelete.value)
            nodeToDelete.nodeRight = this.#recDelete(nodeToDelete.nodeRight, value);

        if (nodeToDelete.value === value && !nodeToDelete.nodeLeft && !nodeToDelete.nodeRight) {
            return null;
        }
        else if (nodeToDelete.value === value && nodeToDelete.nodeLeft && !nodeToDelete.nodeRight) {
            nodeToDelete = nodeToDelete.nodeLeft;
            return nodeToDelete;
        }
        else if (nodeToDelete.value === value && nodeToDelete.nodeRight && !nodeToDelete.nodeLeft) {
            nodeToDelete = nodeToDelete.nodeRight;
            return nodeToDelete;
        } else if (nodeToDelete.value === value && nodeToDelete.nodeRight && nodeToDelete.nodeLeft) {
            let parentNode = nodeToDelete;

            let childNode = nodeToDelete.nodeRight;

            while (childNode.nodeLeft != null) {
                parentNode = childNode;
                childNode = childNode.nodeLeft;
            }

            if (parentNode != nodeToDelete) {
                parentNode.nodeLeft = childNode.nodeRight;
            } else {
                if (!childNode.nodeRight)
                    parentNode.nodeRight = null;
                else
                    nodeToDelete.nodeRight = childNode.nodeRight;
            }

            nodeToDelete.value = childNode.value;

            return nodeToDelete;
        }

        return nodeToDelete;
    }

    find(value, node = this.#rootNode) {
        if (!node) return null;

        if (value < node.value)
            return this.find(value, node.nodeLeft);
        else if (value > node.value)
            return this.find(value, node.nodeRight);
        else
            return node;
    }

    levelOrder() {
        if (!this.#rootNode) return null;

        let queue = [this.#rootNode];

        while (queue.length > 0) {
            let curNode = queue[0];

            console.log(`Value: ${curNode.value}, NodeLeft: ${curNode.nodeLeft}, NodeRight: ${curNode.nodeRight}`);

            if (curNode.nodeLeft) queue.push(curNode.nodeLeft);
            if (curNode.nodeRight) queue.push(curNode.nodeRight);

            queue.shift();
        }
    }

    preOrder(node = this.#rootNode) {
        if (!node) return null;

        console.log(`Node value: ${node.value}`);

        this.preOrder(node.nodeLeft);
        this.preOrder(node.nodeRight);
    }

    inOrder(node = this.#rootNode) {
        if (!node) return null;

        this.inOrder(node.nodeLeft);
        console.log(`Node value: ${node.value}`);
        this.inOrder(node.nodeRight);
    }

    postOrder(node = this.#rootNode) {
        if (!node) return null;

        this.postOrder(node.nodeLeft);
        this.postOrder(node.nodeRight);
        console.log(`Node value: ${node.value}`);
    }

    depth(valueNode, curNode = this.#rootNode, depth = 0) {
        if (!valueNode || !curNode) return null;

        if (valueNode.value < curNode.value) {
            return this.depth(valueNode, curNode.nodeLeft, ++depth);
        }
        else if (valueNode.value > curNode.value) {
            return this.depth(valueNode, curNode.nodeRight, ++depth);
        }

        return depth;
    }

    height(node = this.#rootNode) {
        if (!node) return -1;

        let heightLeft = this.height(node.nodeLeft);
        let heightRight = this.height(node.nodeRight);

        return Math.max(heightLeft, heightRight) + 1;
    }

    isBalanced(node = this.#rootNode) {
        return Math.abs(this.height(node.nodeLeft) - this.height(node.nodeRight)) <= 1 ? true : false;
    }

    rebalance(node = this.#rootNode) {
        if (this.isBalanced()) return false;

        let dataArray = [];
        let queue = [node];

        while(queue != 0) {
            if(queue[0].nodeLeft) queue.push(queue[0].nodeLeft);
            if(queue[0].nodeRight) queue.push(queue[0].nodeRight);

            dataArray.push(queue[0].value);

            queue.shift();
        }

        this.#rootNode = this.buildTree(this.removeDuplicatesSort(dataArray));

        return true;
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

