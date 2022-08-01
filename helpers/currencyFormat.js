export const formatCurrency = (ammount) => {
    return ammount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });
}