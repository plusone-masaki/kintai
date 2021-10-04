import React from 'react'
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
import dayjs from '@/plugins/dayjs'
import { t } from '@/helpers/WordManager'
import { generateColumns, rowStyle } from './composables'

type Props = MonthlyReport & {
  onEdit: (date: string) => void
}

const WorkingCalendar = ({ attendances = [], month = dayjs().format('YYYYMM'), onEdit }: Props) => {
  const date = dayjs(`${month}01`, 'YYYYMMDD')

  const columns = generateColumns(t)
  const rows = [...Array(date.endOf('month').date())].map((_, index) => {
    const date = `${month}${(index + 1).toString().padStart(2, '0')}`
    return attendances.find(a => a.date === date) ??
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
      elevation={0}
      square
    >
      <Table className="working-calendar">
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
              <TableRow
                key={row.date}
                style={row.attendanceAt ? {
                  backgroundColor: colors.grey['200'],
                  cursor: 'pointer',
                } : { cursor: 'pointer' }}
                onClick={() => onEdit(row.date)}
              >
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
