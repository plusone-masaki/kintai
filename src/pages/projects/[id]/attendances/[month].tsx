import dayjs from 'dayjs'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useReactToPrint } from 'react-to-print'
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core'
import AttendanceButtons from '@/components/namespace/attendances/AttendanceButtons'
import WorkingHoursSummary from '@/components/List/WorkingHoursSummary'
import RepositoryFactory from '@/api/RepositoryFactory'
import WorkingCalendar from '@/components/List/WorkingCalendar'
import MonthPicker from '@/components/Utilities/MonthPicker'
import { MonthlyReport, Project } from '@/interfaces'

const projectRepository = RepositoryFactory.get('project')
const monthlyReportRepository = RepositoryFactory.get('monthly_report')

const Attendances = () => {
  const { t } = useTranslation('attendances')
  const router = useRouter()
  const printTarget = useRef()
  const [month, setMonth] = useState(router.query.month as string || dayjs().format('YYYYMM'))
  const [project, setProject] = useState<Project|null>(null)
  const [monthlyReport, setMonthlyReport] = useState<MonthlyReport|null>(null)

  const fetchProject = async () => {
    const { projectId } = router.query
    const res = await projectRepository.show(projectId)
    setProject(res)
  }

  const fetchMonthlyReport = async () => {
    const res = await monthlyReportRepository.show(month)
    setMonthlyReport(res)
  }

  useEffect(() => {
    fetchProject()
    fetchMonthlyReport()
  }, [month])

  const handlePrint = useReactToPrint({
    content: () => printTarget.current,
  })

  const nextMonth = () => {
    setMonth(dayjs(month, 'YYYYMM').add(1, 'month').format('YYYYMM'))
  }
  const prevMonth = () => {
    setMonth(dayjs(month, 'YYYYMM').subtract(1, 'month').format('YYYYMM'))
  }

  return (
    <Container ref={printTarget} maxWidth="md">
      <Grid container spacing={4}>
        <Grid item xs={12} my={4}>
          <Box pb={4}>
            <Typography variant="h1">{ project?.name }</Typography>
            <Divider color="primary" />
          </Box>

          {/* 勤怠ボタン */}
          <div className="ignore-print">
            <AttendanceButtons />
          </div>

          <MonthPicker
            month={month}
            increment={nextMonth}
            decrement={prevMonth}
          />

          {/* 勤怠表 */}
          <Box py={2}>
            <Grid container justifyContent="space-between">
              <Grid item>
                <WorkingHoursSummary
                  project={project}
                  monthlyReport={monthlyReport}
                />
              </Grid>
              <Grid className="ignore-print" item alignSelf="flex-end">
                <Button
                  variant="contained"
                  color="success"
                  style={{ fontSize: '24px', width: '160px' }}
                  onClick={handlePrint}
                >
                  { t('print') }
                </Button>
              </Grid>
            </Grid>
          </Box>

          { monthlyReport && <WorkingCalendar monthlyReport={monthlyReport} /> }
        </Grid>
      </Grid>
    </Container>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'attendances']),
  },
})

export const getStaticPaths = async => ({
  paths: [],
  fallback: true,
})

export default Attendances
