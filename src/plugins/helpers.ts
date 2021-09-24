export const numberFormat = (value: string|number): string => new Intl.NumberFormat('ja-JP').format(Number(value))
