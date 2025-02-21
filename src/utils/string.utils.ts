
export function capitalizeFirstLetter(val: string) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}

export function pluralize(val: string, amount: number) {
    return amount > 1 ? val + "s" : val
}