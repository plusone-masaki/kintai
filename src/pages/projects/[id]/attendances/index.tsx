import { Box, CircularProgress, Grid } from '@material-ui/core'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Formatter from '@/helpers/Formatter'
import RepositoryFactory from '@/resources/RepositoryFactory'

const generateYearMonth = () => {
  const now = new Date()
  return now.getFullYear() + Formatter.leftPad(now.getMonth() + 1, 2, '0')
}

const Attendances = () => {
  const router = useRouter()
  useEffect(() => {
    new Promise(async () => {
      const projectId = router.query.id as string
      const month = generateYearMonth()

      router.push(`/projects/${projectId}/attendances/${month}`)
    })
  })

  return (
    <Box p={8}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Grid>
    </Box>
  )
}

export default Attendances
