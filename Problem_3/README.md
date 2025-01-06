1. Interface 'FormattedWalletBalance' can extend from interface 'WalletBalance'

2. Use 'balancePriority' instead of using 'lhsPriority' in the code block:
    if (lhsPriority > -99) {
               if (balance.amount <= 0) {
                 return true;
               }
            }

3. In the code block:
    return balances.filter((balance: WalletBalance) => {
            const balancePriority = getPriority(balance.blockchain);

    attribute 'blockchain' is not in the interface 'WalletBalance'

4. the dependency of useMemo hook should be [balances] (delete 'prices'). Because 'prices' does not used in the callback.
