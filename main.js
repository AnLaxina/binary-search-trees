import Tree from "./tree.js";

const coolArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const coolTree = new Tree(coolArray);
console.log("Here is the initial tree before insert: ");
coolTree.prettyPrint();

console.log(`Is the binary tree balanced? ${coolTree.isBalanced()}`);

console.log("Here's the tree after inserting 11: ");
coolTree.insert(11);
coolTree.prettyPrint();
console.log(`Is the binary tree still balanced? ${coolTree.isBalanced()}`);
