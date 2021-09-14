import axios from '@/api/axios'
import { Project } from '@/interfaces'

const resource = '/projects'

export default {
  list: async (): Promise<Project[]> => {
    return [
      {
        id: 'test',
        name: 'テスト案件',
        basicRate: 10000,
        minimumWorkingHours: 140,
        maximumWorkingHours: 180,
        useExcessRate: false,
      },
      {
        id: 'test2',
        name: 'テスト案件2',
        basicRate: 30000,
        minimumWorkingHours: 30,
        maximumWorkingHours: 60,
        useExcessRate: true,
      },
    ]
  },

  show: (projectId: string): Project|null => {
    return {
      id: 'test',
      name: 'テスト案件',
      basicRate: 10000,
      minimumWorkingHours: 140,
      maximumWorkingHours: 180,
      useExcessRate: false,
    }
  },
}
