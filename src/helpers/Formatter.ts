const Formatter = {
  leftPad: (str: string|number, maxLength: number, fillString: string) => str.toString().padStart(maxLength, fillString),
}

export default Formatter
