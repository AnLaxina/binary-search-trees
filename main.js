import Tree from "./tree.js";

const coolArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const coolTree = new Tree(coolArray);
console.log("Inserting 11 now:");
coolTree.insert(11);
console.log(`Is it balanced before the rebalance?: ${coolTree.isBalanced()}`);
coolTree.rebalance();
console.log(`Now is it balanced?: ${coolTree.isBalanced()}`);
