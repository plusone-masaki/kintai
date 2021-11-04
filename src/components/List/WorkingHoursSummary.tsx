import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer, TableHead,
  TableRow,
  colors,
} from '@material-ui/core'
import {
  MonthlyReport,
  Project,
} from '@/interfaces'
import Formatter from '@/helpers/Formatter'
import { t } from '@/helpers/WordManager'

type Props = {
  project: Project
  monthlyReport: MonthlyReport
}

const WorkingHoursSummary = ({ project, monthlyReport }: Props) => {
  // 基準稼働時間
  const baseWorkingHours = (project.minimumWorkingHours + project.maximumWorkingHours) / 2

  // 控除額
  let deductionRate = 0
  if (monthlyReport.summary && monthlyReport.summary < project.minimumWorkingHours) {
    const rate = Math.floor((project.useExcessRate ?
      project.basicRate / project.minimumWorkingHours :
      project.basicRate / baseWorkingHours) / 10) * 10
    deductionRate = Math.floor((project.minimumWorkingHours - monthlyReport.summary) * rate)
  }

  // 超過額
  let excessRate = 0
  if (monthlyReport.summary && monthlyReport.summary > project.maximumWorkingHours) {
    const rate = Math.floor((project.useExcessRate ?
      project.basicRate / project.maximumWorkingHours :
      project.basicRate / baseWorkingHours) / 10) * 10
    excessRate = Math.floor((monthlyReport.summary - project.maximumWorkingHours) * rate)
  }

  return (
    <>
      <TableContainer
        component={Paper}
        elevation={0}
        style={{
          display: 'inline-block',
          width: 'auto',
        }}
        square
      >
        <Table size="small" style={{ width: 'auto' }}>
          <TableHead>
            <TableRow>
              <TableCell component="th" align="center">
                { t('attendances.summary') }
              </TableCell>
              <TableCell component="th" align="center">
                { t('attendances.working_hours') }
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {/* 今月の作業時間 */}
              <TableCell align="center">
                { monthlyReport && `${monthlyReport.summary || '-'} ${t('attendances.hours')}` }
              </TableCell>

              {/* 清算幅 */}
              <TableCell align="center" className="ignore-print">
                { `${project.minimumWorkingHours} ～ ${project.maximumWorkingHours} ${t('attendances.hours')}` }
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer
        component={Paper}
        elevation={0}
        square
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell component="th" align="center">
                { t('attendances.basic_rate') }
              </TableCell>
              <TableCell component="th" align="center">
                { t('attendances.deduction') }
              </TableCell>
              <TableCell component="th" align="center">
                { t('attendances.excess') }
              </TableCell>
              <TableCell component="th" align="center">
                { t('attendances.total') }
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {/* 基本単価 */}
              <TableCell align="center">
                { `${Formatter.numberFormat(project.basicRate)} ${t('attendances.yen')}` }
              </TableCell>

              {/* 控除 */}
              <TableCell align="center" style={{ color: colors.red['500'] }}>
                { `${Formatter.numberFormat(deductionRate)} ${t('attendances.yen')}` }
              </TableCell>

              {/* 超過 */}
              <TableCell align="center" style={{ color: colors.blue['500'] }}>
                { `${Formatter.numberFormat(excessRate)} ${t('attendances.yen')}` }
              </TableCell>

              {/* 合計金額 */}
              <TableCell align="center" style={{ fontWeight: 'bold' }}>
                { `${Formatter.numberFormat(project.basicRate - deductionRate + excessRate)} ${t('attendances.yen')}` }
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default WorkingHoursSummary
