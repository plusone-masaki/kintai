export type Attendance = {
  date: string // yyyy-mm-dd
  attendanceAt: string // yyyy-mm-dd hh:mm:ss
  leavingAt: string // yyyy-mm-dd hh:mm:ss
  rest?: number
  summary?: number
  comment: string
}

export type MonthlyReport = {
  month: string // yyyy-mm
  summary: number
  attendances: Attendance[]
}
