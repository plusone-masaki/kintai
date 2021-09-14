import { Box, Grid, IconButton, Typography } from '@material-ui/core'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'
import dayjs from 'dayjs'

type Props = {
  month: string // yyyymm
  increment: () => void
  decrement: () => void
}

const MonthPicker = ({ month, increment, decrement }: Props) => {
  return (
    <Box mb={2}>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
      >
        <Grid item>
          <IconButton
            color="success"
            onClick={decrement}
          >
            <KeyboardArrowLeft fontSize="large" />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography variant="h3">
            { dayjs(month, 'YYYYMM').format('YYYY年MM月') }
          </Typography>
        </Grid>
        <Grid item>
          <IconButton
            color="success"
            onClick={increment}
          >
            <KeyboardArrowRight fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  )
}

export default MonthPicker
