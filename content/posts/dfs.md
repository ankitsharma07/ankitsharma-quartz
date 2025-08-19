---
title: DFS?
date: 2024-05-14
tags:
  - algorithm
---

I have always struggled with Depth First Search, DFS. I now have started solving it using
first principles and it has started to make sense.

DFS can be solved using two methods:

1.  Recursive solution
2.  Iterative solution, using stacks

To solve recursively we must keep few things in our mind:

-   handle the base case, usually an empty tree (node == null)
-   do some logic for the current node
-   recursively call on the other node's children
-   return the answer

<!--listend-->

```cpp
// recursively
void dfs(TreeNode* node) {
    if (node == nullptr) {
        return;
    }

    dfs(node->left);
    dfs(node->right);
    return;
}

// Each call to dfs(node) is visiting that node. As you can see in the code,
//we visit the left child before visiting the right child.
```

Example: [104, Maximum Depth of a Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/description/)

-   base case: root is null, then the max depth will be 0
-   maxDepth(node.left) measures the maximum depth of the left subtree
-   maxDepth(node.right) measures the maximum depth of the right subtree
-   take the max of these and add 1 to it [as current node contributes 1 to the
    depth]

<!--listend-->

```cpp
class Solution {
public:
    int maxDepth(TreeNode* root) {
        if (root == nullptr) {
            return 0;
        }

        int leftSubtree = maxDepth(root->left);
        int rightSubtree = maxDepth(root->right);

        return max(leftSubtree, rightSubtree) + 1;
    }
};
```
