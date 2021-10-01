import ja from '@/assets/lang/ja.json'

export const t = (keyword: string, args?: typeof Object) => {
  let word = keyword.split('.').reduce((acc, key) => acc[key], ja)
  if (args) {
    Object.keys(args).forEach(key => (word = word.replace(`{${key}}`, args[key])))
  }
  return word
}
