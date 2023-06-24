let formatCurrency = (currency) =>
    new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "EUR"
    }).format(currency);

export { formatCurrency };
