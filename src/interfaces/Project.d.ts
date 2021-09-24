export interface Project {
  id?: string,
  userId: string,
  name: string,
  basicRate: number,
  minimumWorkingHours: number,
  maximumWorkingHours: number,
  measurementTimeUnit: number,
  useExcessRate: boolean,
  deletedAt?: number,
}
