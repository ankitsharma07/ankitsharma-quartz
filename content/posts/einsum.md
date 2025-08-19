---
title:  What is Einsum anyway?
date: 2025-07-09
tags:
  - ml
---

**Einstein summation** lets us write an algebric expression in index-notation and
have numpy/pytorch/jax generate the most effiecient set of tensor operations to
compute it.

The only cons is that it can be confusing and comes with a learning curve.
Einsum is backend agnostic tho, i.e. it has identical calls whether we are using
_torch.einsum_, _jax.einsum_ or _numpy.einsum_.

A walkthrough with common use cases:


## Matrix Multiplication 

```python
import numpy as np

A = np.random.rand(3, 5)
B = np.random.rand(5, 2)
M = np.empty((3, 2))

for i in range(3):
    for j in range(2):
        total = 0
        for k in range(5):
            total += A[i, k] * B[k, j]
        M[i, j] = total
```

Using einsum we can do the multiplication like this:

-   ik : dimensions of matrix A
-   kj : dimensions of matrix B
-   ij : dimensions of matrix M

<!--listend-->

```python
M = np.einsum('ik,kj->i,j', A, B)
```

Free Indices are the indices specified in the output. Summation indices are all
the other indices. Those that appear in the input argument but `NOT` in the output
specification. So, i, j are the free indices and k is the summation index.

Example:

```python
import numpy as np

a = np.random.rand(6)
b = np.random.rand(4)
outer = np.einsum('i,j->ij', a, b)
print(f"Using einsum: {outer}\n")


mat = np.empty((6,4))
for i in range(6):
    for j in range(4):
        total = 0
        total += a[i] * b[j]
        mat[i,j] = total
print(f"Using loops: {mat}\n")
```


## Rules 

-   Repeating letters in different inputs means those values will be multiplied
    and those products will be the output
    -   M = np.einsum('ik,kj-&gt;ij', A, B)
-   Omitting a letter means that axis will be summed
    -   x = np.ones(3)
    -   sum_x = np.einsum('i-&gt;', x)
-   We can return the unused axes in any order
    -   x = np.ones((5,4,3))
    -   np.einsum('ijk-&gt;kji', x)


## Operations 


### Permutation of Tensors 

Transpose of a matrix

```python
import torch

x = torch.rand((2, 3))
print(x)

out = torch.einsum('ij->ji', x)
print(f"Transpose: {out}")
```

```txt
tensor([[0.5600, 0.9810, 0.7717],
         [0.1076, 0.1166, 0.8147]])

Transpose: tensor([[0.5600, 0.1076],
         [0.9810, 0.1166],
         [0.7717, 0.8147]])
```


### Summation 

```python
import torch

x = torch.rand((2, 3))
print(x)

out = torch.einsum('ij->', x)
print(f"Summation: {out}")
```

```txt
tensor([[0.2053, 0.0860, 0.5769],
        [0.8407, 0.0610, 0.0562]])

Summation: tensor(1.8262)
```


### Column Sum 

```python
import torch

x = torch.rand((2, 3))
print(x)

out = torch.einsum('ij->j', x)
print(f"Column Sum: {out}")
```

```txt
tensor([[0.3466, 0.7609, 0.0815],
        [0.2268, 0.6954, 0.8935]])

Column Sum: tensor([0.5734, 1.4562, 0.9750])
```


### Row Sum 

```python
import torch
x = torch.rand((2, 3))
print(x)

out = torch.einsum('ij->i', x)
print(f"Row Sum: {out})
```

```txt
tensor([[0.8775, 0.3120, 0.6106],
        [0.5312, 0.6179, 0.5185]])

Row Sum: tensor([1.8001, 1.6676])
```


### Matrix Vector Multiplication 

```python
import torch

v = torch.rand((1, 3))
x = torch.rand((2, 3))
print(v)
print(x)

out = torch.einsum('ij, kj -> ik', x, v)
print(f"Matrix Vector Multiplication: {out}")
```

```txt
tensor([[0.7960, 0.9741, 0.1856]])

tensor([[0.4157, 0.2612, 0.9272],
        [0.8721, 0.3250, 0.4674]])

Matrix Vector Multiplication: tensor([[0.7573], [1.0974]])
```


### Matrix Matrix Multiplication 

```python
import torch

x = torch.rand((2, 3))
print(x)

out = torch.einsum('ij, kj -> ik', x, x) # 2x3 * 3x2 = 2x2
print(f"Matrix Multiplication: {out}")
```

```txt
tensor([[0.3680, 0.3761, 0.5536],
        [0.4293, 0.4596, 0.7517]])

Matrix Matrix Multiplication: tensor([[0.5834, 0.7470], [0.7470, 0.9605]])
```


### Dot product first row with first row of matrix 

```python
import torch

x = torch.rand((2, 3))
print(x)

out = torch.einsum('i, i -> ', x[0], x[0])
print(f"Dot product of first row: {out}")
```

```txt
tensor([[0.2510, 0.1493, 0.2530],
        [0.4679, 0.5010, 0.5318]])

Dot product of first row: tensor(0.1493)
```


### Dot product with a matrix 

```python
import torch

x = torch.rand((2, 3))
print(x)

out = torch.einsum('ij, ij -> ', x, x)
print(f"Dot product with a matrix: {out}")
```

```txt
tensor([[0.0405, 0.0519, 0.9728],
        [0.0479, 0.2052, 0.3783]])

Dot product with matrix: tensor(1.1382)
```


### Element wise multiplication 

```python
import torch

x = torch.rand((2, 3))
print(x)

out = torch.einsum('ij, ij -> ij', x, x)
print(f"Element wise multiplication: {out}")
```

```txt
tensor([[0.3876, 0.6711, 0.0713],
        [0.3814, 0.8174, 0.8426]])

Element wise multiplication: tensor([[0.1502, 0.4503, 0.0051], [0.1455, 0.6681, 0.7100]])
```


### Outer Product 

```python
import torch

a = torch.rand((3))
b = torch.rand((2))
print(a)
print(b)

out = torch.einsum('i, j -> ij', a, b)
print(f"Outer Product: {out}")
```

```txt
tensor([0.3336, 0.4734, 0.1117])
tensor([0.8645, 0.2134])

Outer Product:
tensor([[0.2884, 0.0712],
        [0.4092, 0.1010],
        [0.0966, 0.0238]])
```


### Batch Matrix Multiplication 

```python
a = torch.rand((3, 2, 5))
b = torch.rand((3, 5, 3))
print(a)
print(b)

out = torch.einsum('ijk, ikl -> ijl', a, b)
print(f"Batch Matrix: {out}")
```

```txt
tensor([[[0.5067, 0.8090, 0.0088, 0.9936, 0.1828],
         [0.2544, 0.7564, 0.8248, 0.5977, 0.0694]],

        [[0.8260, 0.4089, 0.7738, 0.5748, 0.1143],
         [0.6959, 0.9731, 0.6790, 0.4556, 0.2643]],

        [[0.7593, 0.6693, 0.3735, 0.0406, 0.1825],
         [0.2616, 0.2867, 0.4369, 0.0290, 0.1599]]])

tensor([[[0.9256, 0.7068, 0.1455],
         [0.6793, 0.4292, 0.7994],
         [0.9526, 0.5082, 0.0190],
         [0.0798, 0.7878, 0.5322],
         [0.5871, 0.2096, 0.5116]],

        [[0.4090, 0.6878, 0.2609],
         [0.4642, 0.5034, 0.4563],
         [0.8460, 0.1870, 0.3020],
         [0.1418, 0.9659, 0.9026],
         [0.9834, 0.2295, 0.5935]],

        [[0.5233, 0.2923, 0.2487],
         [0.9908, 0.5659, 0.6832],
         [0.5437, 0.0347, 0.1832],
         [0.9032, 0.3923, 0.4762],
         [0.0904, 0.2979, 0.2598]]])

Batch Matrix:
tensor([[[1.2136, 1.5310, 1.3428],
         [1.6234, 1.4091, 1.0109]],

        [[1.3762, 1.5001, 1.2225],
         [1.6354, 1.5962, 1.3988]],

        [[1.3168, 0.6839, 0.7814],
         [0.6992, 0.3129, 0.3964]]])
```


### Matrix Diagonal 

```python
import torch

x = torch.rand((3, 3))

print(x)

out = torch.einsum('ii -> i', x)
print(f"Diagonal: {out}")
```

```txt
tensor([[0.9194, 0.1331, 0.5036],
        [0.2516, 0.6575, 0.7909],
        [0.6403, 0.2983, 0.7398]])

Diagonal: tensor([0.9194, 0.6575, 0.7398])
```


### Matrix Trace 

```python
import torch

x = torch.rand((3, 3))
print(x)

out = torch.einsum('ii ->', x)
print(f"Trace: {out}")
```

```txt
tensor([[0.9849, 0.3388, 0.4579],
        [0.4265, 0.5766, 0.1355],
        [0.4080, 0.5419, 0.5608]])

Trace: tensor(2.1224)
```


