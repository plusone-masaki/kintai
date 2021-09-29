import { FormEvent } from 'react'
import { useTranslation } from 'next-i18next'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@material-ui/core'
import { Close, Edit } from '@material-ui/icons'
import { Project } from '@/interfaces'
import Formatter from '@/helpers/Formatter'

type Props = {
  items: Project[]
  onEdit: (project: Project) => any
  onClose: (e: FormEvent, id: string) => any
}

const ProjectList = ({ items, onEdit, onClose }: Props) => {
  const { t } = useTranslation('projects')

  return (
    <>
      {items.map(project => (
        <Box mb={3} key={project.id}>
          <Card>
            <CardHeader
              title={
                <Typography variant="h5" paragraph>
                  { project.name }
                  <IconButton onClick={() => onEdit(project)}>
                    <Edit />
                  </IconButton>
                </Typography>
              }
              action={
                <IconButton onClick={e => onClose(e, project.id!)}>
                  <Close />
                </IconButton>
              }
              style={{ paddingBottom: 0 }}
            />
            <CardContent>
              {/* 案件詳細 */}
              <Box mb={2}>
                <TableContainer component={Paper}>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell component="th">{ t('basic_rate') }</TableCell>
                        <TableCell>{ Formatter.numberFormat(project.basicRate) } { t('yen/month') }</TableCell>
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
