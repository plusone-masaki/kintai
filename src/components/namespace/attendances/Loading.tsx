import { Box, CircularProgress, Grid } from '@material-ui/core'

const Loading = () => (
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

export default Loading
