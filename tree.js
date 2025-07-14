import Node from './node.js';

export default class Tree {

    constructor(array) {
        this.root = this.#buildTree(array);
    }

    insert(newValue) {
        this.root = this.#insertRecursively(this.root, newValue);
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

    #insertRecursively(root, newValue) {
        if (root === null) {
            return new Node(newValue);
        }
        // Cannot insert duplicate values
        if (newValue === root.value) {
            return root;
        }

        if (newValue < root.value) {
            root.left = this.#insertRecursively(root.left, newValue);
        } else {
            root.right = this.#insertRecursively(root.right, newValue);
        }

        return root;
    }

    #deleteRecursively(root, valueToDelete) {
        if (root === null) {
            return root;
        }

        // Keep traversing either side of the tree until `valueToDelete` is found in the tree
        if(valueToDelete < root.value) {
            root.left = this.#deleteRecursively(root.left, valueToDelete);
        }
        else if(valueToDelete > root.value) {
            root.right = this.#deleteRecursively(root.right, valueToDelete);
        }
        else {
            // If there is a match, consider the edge cases

            // 1. Root has 0 children or only right child
            if(root.left === null) {
                return root.right;
            }

            // 2. Root only has a left child
            if(root.right === null) {
                return root.left;
            }

            // 3. If both children are present
            
        }
    }
}