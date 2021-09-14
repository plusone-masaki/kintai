import Link from 'next/link'
import { Project } from '@/interfaces'
import { useTranslation } from 'next-i18next'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@material-ui/core'

type Props = {
  items: Project[]
}

const ProjectList = ({ items }: Props) => {
  const { t } = useTranslation('projects')

  return (
    <>
      {items.map(project => (
        <Box mb={3} key={project.id}>
          <Card>
            <CardContent>
              {/* 案件名 */}
              <Typography variant="h5" paragraph>{ project.name }</Typography>

              {/* 案件詳細 */}
              <Box mb={2}>
                <TableContainer component={Paper}>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell component="th">{ t('basic_rate') }</TableCell>
                        <TableCell>{ project.basicRate } { t('yen/month') }</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th">{ t('contracted_working_time') }</TableCell>
                        <TableCell>{ project.minimumWorkingHours } ～ { project.maximumWorkingHours } { t('hours/month') }</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>

              {/* 勤怠表 */}
              <Grid container justifyContent="center">
                <Button
                  href={`/projects/${project.id}/attendances`}
                  variant="contained"
                  size="large"
                >
                  { t('attendances') }
                </Button>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      ))}
    </>
  )
}

export default ProjectList
