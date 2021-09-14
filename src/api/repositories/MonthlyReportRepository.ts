import { MonthlyReport } from '@/interfaces'

const resource = '/monthly_reports'

export default {
  show: (month: string): MonthlyReport|null => {
    return {
      month: month.substr(0, 4) + '-' + month.substr(-2),
      summary: 100,
      attendances: [
        {
          date: '2021-09-11',
          attendanceAt: '2021-09-11 09:00',
          leavingAt: '2021-09-11 18:00',
          rest: 60,
          summary: 8,
          comment: '勤務しました',
        },
      ],
    }
  },
}
