class Node {
    value;
    nodeLeft;
    nodeRight;

    constructor(value, nodeLeft = null, nodeRight = null) {
        this.value = value;
        this.nodeLeft = nodeLeft;
        this.nodeRight = nodeRight;
    }
}

export default Node;