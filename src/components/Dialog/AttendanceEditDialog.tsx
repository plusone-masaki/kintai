import { FormEventHandler } from 'react'
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid, IconButton,
  InputAdornment,
  TextField,
} from '@material-ui/core'
import { Close } from '@material-ui/icons'
import dayjs from '@/plugins/dayjs'
import { t } from '@/helpers/WordManager'
import { Attendance } from '@/interfaces'

type Props = {
  open: boolean
  form?: Attendance
  handleChange: (...any) => any
  onSubmit: FormEventHandler
  onDelete: FormEventHandler
  onCancel: () => void
}

const AttendanceEditDialog = (props: Props) => {
  const date = dayjs(props.form.date, 'YYYYMMDD').format('YYYY-MM-DD')

  return (
    <Dialog
      open={props.open}
      onClose={props.onCancel}
      fullWidth
    >
      <form onSubmit={props.onSubmit}>
        <DialogTitle>
          { t('attendances.form.title') }
          <small style={{ marginLeft: '8px' }}>（{ dayjs(props.form.date, 'YYYYMMDD').format('YYYY年MM月DD日') }）</small>
          <IconButton
            aria-label="close"
            onClick={props.onCancel}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent style={{ paddingBottom: '16px' }}>
          <Grid
            container
            justifyContent="space-between"
            spacing={2}
          >
            <Grid item xs={6}>
              <TextField
                id="attendance-at"
                value={props.form.attendanceAt ? dayjs(props.form.attendanceAt).format('HH:mm') : ''}
                label={t('attendances.form.attendance_at')}
                type="time"
                margin="normal"
                InputProps={{
                  startAdornment: <InputAdornment position="start">{ date }</InputAdornment>,
                }}
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={e => props.handleChange('attendanceAt')(`${date}T${e.target.value}`)}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="leaving-at"
                value={props.form.leavingAt ? dayjs(props.form.leavingAt).format('YYYY-MM-DDTHH:mm') : ''}
                label={t('attendances.form.leaving_at')}
                type="datetime-local"
                margin="normal"
                InputLabelProps={{ shrink: true }}
                fullWidth
                onChange={props.handleChange('leavingAt')}
              />
            </Grid>
          </Grid>

          <Grid
            container
            justifyContent="flex-end"
            spacing={2}
          >
            <Grid item xs={6}>
              <TextField
                id="rest"
                value={props.form.rest}
                label={t('attendances.form.rest')}
                type="number"
                margin="normal"
                InputProps={{
                  endAdornment: <InputAdornment position="end">{ t('attendances.minutes') }</InputAdornment>,
                  inputMode: 'numeric',
                }}
                inputProps={{ style: { textAlign: 'right' } }}
                fullWidth
                onChange={props.handleChange('rest')}
              />
            </Grid>
          </Grid>

          <TextField
            id="comment"
            value={props.form.comment}
            label={t('attendances.form.comment')}
            rows={4}
            margin="normal"
            InputLabelProps={{ shrink: true }}
            fullWidth
            multiline
            onChange={props.handleChange('comment')}
          />

          {/* 削除・更新ボタン */}
          <Grid
            container
            spacing={2}
            style={{ marginTop: '0' }}
          >
            <Grid item xs={6}>
              <Button
                color="error"
                variant="outlined"
                size="large"
                fullWidth
                onClick={props.onDelete}
              >
                { t('attendances.form.delete') }
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                size="large"
                fullWidth
              >
                { t('attendances.form.update') }
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </form>
    </Dialog>
  )
}

export default AttendanceEditDialog
