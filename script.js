import Tree from "./Tree.js";

const numArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const tree = new Tree();

console.log("\nBefore insert:");

tree.prettyPrint();

tree.insert(6);
tree.insert(4);
tree.insert(2);
tree.insert(7);
tree.insert(5);
// tree.insert(10);
// tree.insert(15);
// tree.insert(1);
// tree.insert(3);

console.log("\nAfter insert:");

tree.prettyPrint();

console.log("\nAfter deletion of 4:");

tree.delete(4);
tree.prettyPrint();

console.log(`Find 2: ${tree.find(2).value}`);
console.log(`Find 10: ${tree.find(10)}`);

console.log("\nLevel Order Traversal: ");
tree.levelOrder();

console.log("\nPre-order Traversal: ");
tree.preOrder();

console.log("\nInOrder Traversal: ");
tree.inOrder();

console.log("\nPostOrder Traversal: ");
tree.postOrder();

console.log(`\nDepth of 3: `);
console.log(tree.depth(tree.find(3)));

console.log(`\nHeight of 3: `);
console.log(tree.height(tree.find(5)));

console.log(`\nIs balanced: `);
console.log(tree.isBalanced());

console.log(`\nUnbalanced tree: `);
tree.delete(7)
tree.prettyPrint();
tree.rebalance()
console.log(`\nRebalanced tree: `);
tree.prettyPrint();


