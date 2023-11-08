import Tree from "./Tree.js";

const numArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const tree = new Tree();

console.log("Before insert:");

tree.prettyPrint();

tree.insert(6);
tree.insert(4);
tree.insert(2);
tree.insert(7);
tree.insert(5);

console.log("After insert:");

tree.prettyPrint();

console.log("After deletion:");

tree.delete(4);
tree.prettyPrint();
