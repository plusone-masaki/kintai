import dayjs from 'dayjs'
import 'dayjs/locale/ja'
import duration from 'dayjs/plugin/duration'

dayjs.locale('ja')
dayjs.extend(duration)

export default dayjs
