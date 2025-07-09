import Node from './node.js';

export default class Tree {

    constructor(array) {
        this.root = this.#buildTree(array);
    }

    #buildTree(array) {
        return this.#buildTreeHelper(array, 0, array.length - 1);
    }

    #buildTreeHelper(array, startIndex, endIndex) {
        if(startIndex > endIndex) {
            return null;
        }

        let middleIndex = (startIndex + endIndex) / 2;
        const rootNode = new Node(array[middleIndex]);
        rootNode.left = this.#buildTreeHelper(array, 0, middleIndex - 1);
        rootNode.right = this.#buildTreeHelper(array, middleIndex + 1, endIndex);

        return rootNode;
    }
}