export function formatCurrency (priceCents) {
    return (priceCents/100).toFixed(2)
}

export default formatCurrency //allows use to export the name without curly braces || each file can only have one default export