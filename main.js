import Tree from './tree.js';

const coolArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const coolTree = new Tree(coolArray);
console.log('Here is the initial tree before insert: ');
coolTree.prettyPrint();
console.log('Here it is after insert:');
coolTree.insert(20);
coolTree.prettyPrint();