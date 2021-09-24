import { Box, Grid } from '@material-ui/core'
import { LoadingButton } from '@material-ui/lab'
import Timer from '@/components/Utilities/Timer'
import { useTranslation } from 'next-i18next'
import { FormEvent } from 'react'

type Props = {
  loading: boolean
  onAttendance: (e: FormEvent, type: string) => void
}

const AttendanceButtons = ({ loading, onAttendance }: Props) => {
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
            {/* 業務開始 */}
            <LoadingButton
              variant="contained"
              fullWidth
              disableElevation
              loading={loading}
              style={{ fontSize: '36px' }}
              onClick={e => onAttendance(e, 'attendance')}
            >
              { t('attendance') }
            </LoadingButton>
          </Grid>
          <Grid item xs>
            {/* 業務終了 */}
            <LoadingButton
              variant="contained"
              color="error"
              fullWidth
              disableElevation
              loading={loading}
              style={{ fontSize: '36px' }}
            >
              { t('leave') }
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default AttendanceButtons
