import AuthRepository from '@/resources/repositories/AuthRepository'
import ProjectRepository from '@/resources/repositories/ProjectRepository'
import MonthlyReportRepository from '@/resources/repositories/MonthlyReportRepository'

interface RepositoryCollection {
  'auth': typeof AuthRepository,
  'project': typeof ProjectRepository,
  'monthly_report': typeof MonthlyReportRepository,
}
interface RepositoryFactory {
  get<T extends keyof RepositoryCollection>(repoName: T): RepositoryCollection[T]
}

const repositories = {
  'auth': AuthRepository,
  'project': ProjectRepository,
  'monthly_report': MonthlyReportRepository,
}

export default {
  get: (key: string) => repositories[key]
} as RepositoryFactory
