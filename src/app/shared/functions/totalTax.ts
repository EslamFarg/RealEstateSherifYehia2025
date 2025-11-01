export function totalTax(tax: number, net: number) {
    let totalTax = (tax * net) / 100; // tax
    let total=net+totalTax
    return {
        totalTax,
        total
    };
}