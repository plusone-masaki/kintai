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
  Link,
  Typography,
} from '@material-ui/core'
import AttendanceButtons from '@/components/namespace/attendances/AttendanceButtons'
import WorkingHoursSummary from '@/components/List/WorkingHoursSummary'
import RepositoryFactory from '@/resources/RepositoryFactory'
import WorkingCalendar from '@/components/List/WorkingCalendar/WorkingCalendar'
import MonthPicker from '@/components/Utilities/MonthPicker'
import AttendanceEditDialog from '@/components/Dialog/AttendanceEditDialog'
import { Attendance, MonthlyReport, Project } from '@/interfaces'
import FormHelper from '@/helpers/FormHelper'

const HOUR = 60

const projectRepository = RepositoryFactory.get('project')
const monthlyReportRepository = RepositoryFactory.get('monthly_report')

const initialAttendance = (date = ''): Attendance => ({
  date,
  attendanceAt: '',
  leavingAt: '',
  rest: 60,
  summary: 0,
  comment: '',
})

const Attendances = () => {
  const { t } = useTranslation('attendances')
  const router = useRouter()
  const printTarget = useRef()
  const [open, setOpen] = useState(false)
  const [month, setMonth] = useState(router.query.month as string || dayjs().format('YYYYMM'))
  const [project, setProject] = useState<Project|null>(null)
  const [monthlyReport, setMonthlyReport] = useState<MonthlyReport|null>(null)
  const [attendance, setAttendance] = useState<Attendance>(initialAttendance())

  /**
   * 案件情報の取得
   */
  const fetchProject = async () => {
    const { id } = router.query
    if (id && typeof id === 'string') {
      const res = await projectRepository.show(id)
      setProject(res)
    }
  }

  /**
   * 勤怠表データの取得
   */
  const fetchMonthlyReport = async () => {
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
  }

  useEffect(() => {
    fetchMonthlyReport()
    fetchProject()
  }, [router.query, month])

  const handleFormChange = FormHelper.setForm(attendance, setAttendance)

  /**
   * 勤怠情報の登録・編集
   */
  const registerAttendance = async (e: FormEvent, type: 'attendance' | 'edit', data?: Attendance) => {
    e.preventDefault()
    if (!project || !monthlyReport) return

    const now = dayjs()
    const attendance: Attendance =
      data ||
      monthlyReport.attendances.find(a => now.isSame(a.date, 'date')) ||
      { date: now.format('YYYYMMDD') }

    if (type === 'attendance') attendance.attendanceAt = now.format('YYYY-MM-DDTHH:mm')

    const { attendanceAt, leavingAt, rest } = attendance
    if (attendanceAt && leavingAt) {
      const summary = dayjs(leavingAt).diff(attendanceAt, 'minutes') - rest
      attendance.summary = (Math.floor(summary / project.dailyTimeUnit) * project.dailyTimeUnit) / HOUR
    }

    const report = await monthlyReportRepository.updateAttendance(project.id, month, attendance)
    report.summary = report.attendances.reduce((a, b) => a + b.summary, 0)
    await monthlyReportRepository.create(project.id, month, report)

    setMonthlyReport(report)
    setOpen(false)
  }

  const deleteAttendance = async (date: string) => {
    if (confirm('confirm_delete')) {
      const report = await monthlyReportRepository.deleteAttendance(project.id, month, date)
      report.summary = report.attendances.reduce((a, b) => a + b.summary, 0)
      await monthlyReportRepository.create(project.id, month, report)

      setMonthlyReport(report)
      setOpen(false)
    }
  }

  const handleEdit = (date: string, type?: 'leaving') => {
    if (!monthlyReport) return

    const attendance = JSON.parse(JSON.stringify(monthlyReport.attendances.find(a => a.date === date) || initialAttendance(date)))
    attendance.rest = attendance.rest ?? 60

    if (type === 'leaving') attendance.leavingAt = attendance.leavingAt ?? dayjs().format('YYYY-MM-DDTHH:mm')

    setAttendance(attendance)
    setOpen(true)
  }

  /**
   * 印刷の実行
   */
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
          {/* 作業報告書 */}
          <Box pb={4}>
            <Typography variant="h1" style={{ textAlign: 'center' }}>{ t('report') }</Typography>
            <Divider color="primary" />
          </Box>

          {/* 勤怠ボタン */}
          <div className="ignore-print">
            <AttendanceButtons
              onAttendance={registerAttendance}
              onLeaving={() => handleEdit(dayjs().format('YYYYMMDD'), 'leaving')}
            />
          </div>

          {/* 案件名 */}
          <Box className="ignore-print" pb={4}>
            <Typography variant="h2" style={{ textAlign: 'center' }}>
              <Link href={`/`} style={{ color: 'black' }}>
                { project?.name }
              </Link>
            </Typography>
          </Box>

          <MonthPicker
            month={month}
            increment={nextMonth}
            decrement={prevMonth}
          />

          <Grid container justifyContent="space-between" my={2}>
            {/* 勤怠表 */}
            <Grid item xs={8}>
              { project && monthlyReport &&
                <WorkingHoursSummary
                  project={project}
                  monthlyReport={monthlyReport}
                />
              }
            </Grid>

            {/* 印刷ボタン */}
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

          <WorkingCalendar
            { ...monthlyReport }
            onEdit={handleEdit}
          />
        </Grid>
      </Grid>

      {/* 勤怠情報登録ダイアログ */}
      { monthlyReport &&
        <AttendanceEditDialog
          open={open}
          form={attendance}
          handleChange={handleFormChange}
          onSubmit={e => registerAttendance(e, 'edit', attendance)}
          onDelete={() => deleteAttendance(attendance.date)}
          onCancel={() => setOpen(false)}
        />
      }
    </Container>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'attendances']),
  },
})

export const getStaticPaths = () => ({
  paths: [],
  fallback: true,
})

export default Attendances
