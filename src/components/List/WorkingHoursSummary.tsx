import { useTranslation } from 'next-i18next'
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

type Props = {
  project: Project
  monthlyReport: MonthlyReport
}

const WorkingHoursSummary = ({ project, monthlyReport }: Props) => {
  const { t } = useTranslation('attendances')

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
        variant="outlined"
        style={{
          display: 'inline-block',
          width: 'auto',
        }}
      >
        <Table size="small" style={{ width: 'auto' }}>
          <TableHead>
            <TableRow>
              <TableCell component="th" align="center">
                { t('summary') }
              </TableCell>
              <TableCell component="th" align="center">
                { t('working_hours') }
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {/* 今月の作業時間 */}
              <TableCell align="center">
                { monthlyReport && `${monthlyReport.summary} ${t('hours')}` }
              </TableCell>

              {/* 清算幅 */}
              <TableCell align="center">
                { `${project.minimumWorkingHours} ～ ${project.maximumWorkingHours} ${t('hours')}` }
              </TableCell>

            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer
        component={Paper}
        variant="outlined"
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell component="th" align="center">
                { t('basic_rate') }
              </TableCell>
              <TableCell component="th" align="center">
                { t('deduction') }
              </TableCell>
              <TableCell component="th" align="center">
                { t('excess') }
              </TableCell>
              <TableCell component="th" align="center">
                { t('total') }
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {/* 基本単価 */}
              <TableCell align="center">
                { `${Formatter.numberFormat(project.basicRate)} ${t('yen')}` }
              </TableCell>

              {/* 控除 */}
              <TableCell align="center" style={{ color: colors.red['500'] }}>
                { `${Formatter.numberFormat(deductionRate)} ${t('yen')}` }
              </TableCell>

              {/* 超過 */}
              <TableCell align="center" style={{ color: colors.blue['500'] }}>
                { `${Formatter.numberFormat(excessRate)} ${t('yen')}` }
              </TableCell>

              {/* 合計金額 */}
              <TableCell align="center" style={{ fontWeight: 'bold' }}>
                { `${Formatter.numberFormat(project.basicRate - deductionRate + excessRate)} ${t('yen')}` }
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default WorkingHoursSummary
