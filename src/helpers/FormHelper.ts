import { SetStateAction } from 'react'
import { InputTypes } from '@/interfaces/Form'

const FormHelper = {
  setForm: (getter: any, setter: SetStateAction<any>) => (input: string, type: InputTypes = 'text') => e => {
    let value
    let targetValue
    switch (type) {
      case 'number':
        targetValue = typeof e === 'object' ? e.target.value : e
        value = Number(targetValue)
        break
      case 'checkbox':
        targetValue = typeof e === 'object' ? e.target.checked : e
        value = targetValue
        break
      default:
        targetValue = typeof e === 'object' ? e.target.value : e
        value = targetValue
        break
    }
    setter({ ...getter, [input]: value })
  },
}

export default FormHelper
