import Node from './node.js';

export default class Tree {

    constructor(array) {
        this.root = this.#buildTree(array);
    }

    prettyPrint(node = this.root, prefix = '', isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }

    #buildTree(array) {
        return this.#buildTreeHelper(array, 0, array.length - 1);
    }

    #buildTreeHelper(array, startIndex, endIndex) {
        if (startIndex > endIndex) {
            return null;
        }

        // Use Math.floor to ensure that the index does not become a decimal value
        // By default, division in JS rounds it to 1 decimal point including decimals
        let middleIndex = Math.floor((startIndex + endIndex) / 2);
        const rootNode = new Node(array[middleIndex]);
        rootNode.left = this.#buildTreeHelper(array, startIndex, middleIndex - 1);
        rootNode.right = this.#buildTreeHelper(array, middleIndex + 1, endIndex);

        return rootNode;
    }
}