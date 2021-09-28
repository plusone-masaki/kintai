export interface Project {
  id?: string,
  userId: string,
  name: string,
  basicRate: number,
  minimumWorkingHours: number,
  maximumWorkingHours: number,
  dailyTimeUnit: number,
  monthlyTimeUnit: number,
  useExcessRate: boolean,
  deletedAt?: number,
}
