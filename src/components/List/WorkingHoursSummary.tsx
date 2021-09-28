import { useTranslation } from 'next-i18next'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@material-ui/core'
import {
  MonthlyReport,
  Project,
} from '@/interfaces'

type Props = {
  project: Project
  monthlyReport: MonthlyReport
}

const WorkingHoursSummary = ({ project, monthlyReport }: Props) => {
  const { t } = useTranslation('attendances')

  return (
    <TableContainer
      component={Paper}
      variant="outlined"
    >
      <Table>
        <TableBody>
          {/* 今月の作業時間 */}
          <TableRow>
            <TableCell component="th" align="right">
              { t('summary') }
            </TableCell>
            <TableCell align="right">
              { monthlyReport && `${monthlyReport.summary} ${t('hours')}` }
            </TableCell>
          </TableRow>

          {/* 清算幅 */}
          <TableRow>
            <TableCell component="th" align="right">
              { t('working_hours') }
            </TableCell>
            <TableCell align="right">
              { project && `${project.minimumWorkingHours} ～ ${project.maximumWorkingHours} ${t('hours')}` }
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default WorkingHoursSummary
