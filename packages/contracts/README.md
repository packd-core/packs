## Gas Estimations for Opening Packs

| Modules                                       | Gas Used |
| --------------------------------------------- | -------- |
| No Modules                                    | 107833   |
| 1 ERC20 Module                                | 147705   |
| 2 ERC20 Modules                               | 180299   |
| 1 ERC721 Module                               | 155736   |
| 2 ERC721 Modules (Same ERC721 contract)       | 172045   |
| 2 ERC721 Modules (Different ERC721 contracts) | 196421   |

Overhead for opening:

- 107833

ERC20 Per module:

- 1st: 39883
- 2nd: 32594

ERC721 Per module:

- 1st 47903
- 2nd 40685

## Psuedo Code for Opening Packs

```python
def calculate_gas(overhead, erc20_count, erc721_count):
    erc20_gas_costs = [39883, 32594]  # Gas costs for the first and second ERC20 modules
    erc721_gas_costs = [47903, 40685]  # Gas costs for the first and second ERC721 modules

    total_gas = overhead

    for i in range(erc20_count):
        total_gas += erc20_gas_costs[1] if i >= 1 else erc20_gas_costs[0]

    for i in range(erc721_count):
        total_gas += erc721_gas_costs[1] if i >= 1 else erc721_gas_costs[0]

    return total_gas
```
