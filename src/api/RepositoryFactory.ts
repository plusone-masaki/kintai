import ProjectRepository from '@/api/repositories/ProjectRepository'
import MonthlyReportRepository from '@/api/repositories/MonthlyReportRepository'

const repositories = {
  'project': ProjectRepository,
  'monthly_report': MonthlyReportRepository,
}

export default {
  get: (key: string) => repositories[key]
}
