const Formatter = {
  leftPad: (str: string|number, maxLength: number, fillString: string) => str.toString().padStart(maxLength, fillString),
  numberFormat: (value: string|number): string => new Intl.NumberFormat('ja-JP').format(Number(value)),
}

export default Formatter
