import dayjs from '@/plugins/dayjs'
import { FormEvent, useEffect, useRef, useState } from 'react'
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
import RepositoryFactory from '@/resources/RepositoryFactory'
import WorkingCalendar from '@/components/List/WorkingCalendar'
import MonthPicker from '@/components/Utilities/MonthPicker'
import { Attendance, MonthlyReport, Project } from '@/interfaces'

type AttendanceEditData = {
  attendanceAt?: string // yyyy-mm-dd hh:mm:ss
  leavingAt?: string // yyyy-mm-dd hh:mm:ss
  rest?: number
  summary?: number
  comment?: string
}

const HOUR = 60

const projectRepository = RepositoryFactory.get('project')
const monthlyReportRepository = RepositoryFactory.get('monthly_report')

const Attendances = () => {
  const { t } = useTranslation('attendances')
  const router = useRouter()
  const printTarget = useRef()
  const [month, setMonth] = useState(router.query.month as string || dayjs().format('YYYYMM'))
  const [project, setProject] = useState<Project|null>(null)
  const [monthlyReport, setMonthlyReport] = useState<MonthlyReport|null>(null)
  const loading = {
    fetchProject: false,
    fetchMonthlyReport: false,
    attendance: false,
  }

  /**
   * 案件情報の取得
   */
  const fetchProject = async () => {
    try {
      loading.fetchProject = true

      const { id } = router.query
      if (id && typeof id === 'string') {
        const res = await projectRepository.show(id)
        setProject(res)
      }
    } finally {
      loading.fetchProject = false
    }
  }

  /**
   * 勤怠表データの取得
   */
  const fetchMonthlyReport = async () => {
    try {
      loading.fetchMonthlyReport = true

      const { id } = router.query
      if (id && typeof id === 'string') {
        const res = await monthlyReportRepository.show(id, month)
        if (!res && dayjs().isSame(dayjs(month, 'YYYYMM'), 'month')) {
          await monthlyReportRepository.create(id, month, {
            month,
            summary: 0,
            attendances: [],
          })
        }

        setMonthlyReport(res)
      }
    } finally {
      loading.fetchMonthlyReport = false
    }
  }

  useEffect(() => {
    fetchMonthlyReport()
    fetchProject()
  }, [router.query, month])

  /**
   * 勤怠情報の登録・編集
   */
  const handleAttendance = async (e: FormEvent, type: 'attendance' | 'edit', data?: AttendanceEditData) => {
    try {
      loading.attendance = true

      e.preventDefault()
      if (!project || !monthlyReport) return

      const now = dayjs()
      const attendance: Attendance = monthlyReport.attendances.find(a => now.isSame(a.date, 'date')) ||
        { date: now.format('YYYYMMDD') }

      switch (type) {
        case 'attendance':
          attendance.attendanceAt = now.format('YYYY-MM-DD HH:mm')
          break
        case 'edit':
          Object.assign(attendance, data)
          break
        default: return
      }

      const { attendanceAt, leavingAt, rest } = attendance
      if (attendanceAt && leavingAt) {
        const summary = dayjs(leavingAt).diff(attendanceAt, 'minutes') - rest
        attendance.summary = (Math.floor(summary / project.measurementTimeUnit) * project.measurementTimeUnit) / HOUR
      }

      await monthlyReportRepository.updateAttendance(project.id, month, attendance)
      await fetchMonthlyReport()
    } finally {
      loading.attendance = false
    }
  }

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
          {/* 案件名 */}
          <Box pb={4}>
            <Typography variant="h1">{ project?.name }</Typography>
            <Divider color="primary" />
          </Box>

          {/* 勤怠ボタン */}
          <div className="ignore-print">
            <AttendanceButtons
              loading={loading.attendance}
              onAttendance={handleAttendance}
            />
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

          <WorkingCalendar { ...monthlyReport } />
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
