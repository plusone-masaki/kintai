import { Box, Grid } from '@material-ui/core'
import { LoadingButton } from '@material-ui/lab'
import Timer from '@/components/Utilities/Timer'
import { FormEvent } from 'react'
import { t } from '@/helpers/WordManager'

type Props = {
  onAttendance: (e: FormEvent, type: string) => void
  onLeaving: () => void
}

const AttendanceButtons = ({ onAttendance, onLeaving }: Props) => (
  <>
    <Timer/>

    <Box pt={2} mb={6}>
      <Grid
        container
        justifyContent="space-between"
        spacing={4}
      >
        <Grid item xs>
          {/* 業務開始 */}
          <LoadingButton
            variant="contained"
            fullWidth
            disableElevation
            style={{ fontSize: '36px' }}
            onClick={e => onAttendance(e, 'attendance')}
          >
            { t('attendances.attendance') }
          </LoadingButton>
        </Grid>
        <Grid item xs>
          {/* 業務終了 */}
          <LoadingButton
            variant="contained"
            color="error"
            fullWidth
            disableElevation
            style={{ fontSize: '36px' }}
            onClick={onLeaving}
          >
            { t('attendances.leave') }
          </LoadingButton>
        </Grid>
      </Grid>
    </Box>
  </>
)

export default AttendanceButtons
