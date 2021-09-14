export type Project = {
    id: string
    name: string
    deletedAt?: string
    basicRate: number
    minimumWorkingHours: number
    maximumWorkingHours: number
    useExcessRate: boolean
}
