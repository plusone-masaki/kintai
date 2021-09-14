import dayjs from '@/plugins/dayjs'
import { useTranslation } from 'next-i18next'
import { MonthlyReport } from '@/interfaces'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  colors,
} from '@material-ui/core'

type Props = {
  monthlyReport: MonthlyReport
}

type Column = {
  field: string
  headerName: string
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify'
  width?: number | string
  getter?: (value: any) => string
}

const weeks = {
  SUNDAY: 0,
  MONDAY: 1,
  TUESDAY: 2,
  WEDNESDAY: 3,
  THURSDAY: 4,
  FRIDAY: 5,
  SATURDAY: 6,
}

const WorkingCalendar = ({ monthlyReport }: Props) => {
  const { t } = useTranslation('attendances')
  const date = dayjs(`${monthlyReport.month}-01`, 'YYYY-MM-DD')
  const rowStyle = targetDate => {
    switch (dayjs(targetDate).day()) {
      case weeks.SUNDAY: return { color: colors.red['500'] }
      case weeks.SATURDAY: return { color: colors.blue['500'] }
      default: {}
    }
  }

  const columns: Column[] = [
    {
      field: 'date',
      headerName: '日付',
      width: 112,
      getter: date => dayjs(date).format('D日（dd）'),
    },
    {
      field: 'attendanceAt',
      headerName: '開始時刻',
      width: 96,
      getter: date => date && dayjs(date).format('HH:mm'),
    },
    {
      field: 'leavingAt',
      headerName: '終了時刻',
      width: 96,
      getter: date => date && dayjs(date).format('HH:mm'),
    },
    {
      field: 'rest',
      headerName: '休憩',
      width: 80,
      getter: minutes => minutes && minutes + t('minutes'),
    },
    {
      field: 'summary',
      headerName: '作業時間',
      width: 96,
      getter: hours => hours && hours + t('working_summary'),
    },
    {
      field: 'comment',
      headerName: '作業内容',
      align: 'left',
    },
  ]

  const rows = [...Array(date.endOf('month').date())].map((_, index) => {
    const date = `${monthlyReport.month}-${(index + 1).toString().padStart(2, '0')}`
    return monthlyReport.attendances.find(a => a.date === date) ??
      {
        date,
        attendanceAt: '',
        leavingAt: '',
        comment: '',
      }
  })

  return (
    <TableContainer
      component={Paper}
      variant="outlined"
    >
      <Table>
        <TableHead>
          <TableRow>
            { columns.map(cell => (
              <TableCell
                key={cell.field}
                align="center"
                width={cell.width}
              >
                { cell.headerName }
              </TableCell>
            )) }
          </TableRow>
        </TableHead>
        <TableBody>
          { rows.map(row => (
              <TableRow key={row.date}>
                { columns.map(cell => (
                  <TableCell
                    key={cell.field}
                    align={cell.align ?? 'center'}
                    style={rowStyle(row.date)}
                  >
                    { cell.getter ? cell.getter(row[cell.field]) : row[cell.field] }
                  </TableCell>
                )) }
              </TableRow>
          )) }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default WorkingCalendar
