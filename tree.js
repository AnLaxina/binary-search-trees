import Node from "./node.js";

export default class Tree {
  constructor(array) {
    this.root = this.#buildTree(array);
  }

  insert(newValue) {
    this.root = this.#insertRecursively(this.root, newValue);
  }

  deleteItem(valueToDelete) {
    this.root = this.#deleteRecursively(this.root, valueToDelete);
  }

  find(value) {
    return this.#findRecursively(this.root, value);
  }

  levelOrderForEach(callback) {
    if (this.root === null) return null;
    const queue = [this.root];

    while (queue.length > 0) {
      let currentNode = queue.shift();

      if (typeof callback === "function") {
        callback(currentNode);
      } else {
        throw new Error("No callback function given!");
      }

      if (currentNode.left !== null) {
        queue.push(currentNode.left);
      }
      if (currentNode.right !== null) {
        queue.push(currentNode.right);
      }
    }
  }

  inOrderForEach(callback) {
    if (this.root === null) return null;

    if (typeof callback !== "function") {
      throw new Error("No callback function given!");
    }

    function traverse(node) {
      if (node === null) return;
      traverse(node.left);
      callback(node);
      traverse(node.right);
    }

    traverse(this.root);
  }

  preOrderForEach(callback) {
    if (this.root === null) return null;

    if (typeof callback !== "function") {
      throw new Error("No callback function given!");
    }

    function traverse(node) {
      if (node === null) return;
      callback(node);
      traverse(node.left);
      traverse(node.right);
    }

    traverse(this.root);
  }

  postOrderForEach(callback) {
    if (this.root === null) return null;

    if (typeof callback !== "function") {
      throw new Error("No callback function given!");
    }

    function traverse(node) {
      if (node === null) return;
      traverse(node.left);
      traverse(node.right);
      callback(node);
    }

    traverse(this.root);
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
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
    if (valueToDelete < root.value) {
      root.left = this.#deleteRecursively(root.left, valueToDelete);
    } else if (valueToDelete > root.value) {
      root.right = this.#deleteRecursively(root.right, valueToDelete);
    } else {
      // If there is a match, consider the edge cases

      // Case 1 & 2: Node has at least 1 child
      if (root.left === null) {
        return root.right;
      } else if (root.right === null) {
        return root.left;
      }

      // Case 3: If both children are present find the "successor" or the min value in the right subtree
      let successor = this.#minValueNode(root.right);
      root.value = successor.value;

      // Then, delete the in-order successor
      root.right = this.#deleteRecursively(root.right, successor.value);
    }

    return root;
  }

  #minValueNode(node) {
    let current = node;
    while (current.left !== null) {
      current = current.left;
    }

    return current;
  }

  #findRecursively(root, value) {
    if (root === null) {
      return null;
    } else if (value < root.value) {
      return this.#findRecursively(root.left, value);
    } else if (value > root.value) {
      return this.#findRecursively(root.right, value);
    } else {
      return root;
    }
  }
}
