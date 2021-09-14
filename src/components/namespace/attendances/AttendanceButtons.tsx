import { Box, Button, Grid } from '@material-ui/core'
import Timer from '@/components/Utilities/Timer'
import { useTranslation } from 'next-i18next'

const AttendanceButtons = () => {
  const { t } = useTranslation('attendances')

  return (
    <>
      <Timer/>

      <Box pt={2} mb={6}>
        <Grid
          container
          justifyContent="space-between"
          spacing={4}
        >
          <Grid item xs>
            <Button
              variant="contained"
              fullWidth
              disableElevation
              style={{ fontSize: '36px' }}
            >
              { t('attendance') }
            </Button>
          </Grid>
          <Grid item xs>
            <Button
              variant="contained"
              color="error"
              fullWidth
              disableElevation
              style={{ fontSize: '36px' }}
            >
              { t('leave') }
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default AttendanceButtons
