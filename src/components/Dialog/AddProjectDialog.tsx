import { ChangeEventHandler, FormEventHandler } from 'react'
import { useTranslation } from 'next-i18next'
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup, Grid,
  InputAdornment,
  TextField,
} from '@material-ui/core'
import { Project } from '@/interfaces'

type Props = {
  open: boolean
  form: Project
  handleChange: (...any) => ChangeEventHandler
  onSubmit: FormEventHandler
  onCancel: () => void
}

const AddProjectDialog = (props: Props) => {
  const { t } = useTranslation('projects')

  return (
    <Dialog open={props.open} onClose={props.onCancel}>
      <form onSubmit={props.onSubmit}>
        <DialogTitle>{ t('project_add') }</DialogTitle>
        <DialogContent>
          <TextField
            id="project-name"
            value={props.form.name}
            label={t('project_name')}
            type="text"
            margin="normal"
            autoFocus
            fullWidth
            onChange={props.handleChange('name')}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                id="basic-rate"
                value={props.form.basicRate}
                label={t('basic_rate')}
                type="text"
                margin="normal"
                InputProps={{
                  endAdornment: <InputAdornment position="end">{ t('yen') }</InputAdornment>,
                  inputMode: 'numeric',
                }}
                inputProps={{ style: { textAlign: 'right' } }}
                fullWidth
                onChange={props.handleChange('basicRate', 'number')}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                id="minimum-working-hours"
                value={props.form.minimumWorkingHours}
                label={t('minimum_working_hours')}
                type="text"
                margin="normal"
                InputProps={{
                  endAdornment: <InputAdornment position="end">{ t('hours') }</InputAdornment>,
                  inputMode: 'numeric',
                }}
                inputProps={{ style: { textAlign: 'right' } }}
                fullWidth
                onChange={props.handleChange('minimumWorkingHours', 'number')}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="maximum-working-hours"
                value={props.form.maximumWorkingHours}
                label={t('maximum_working_hours')}
                type="text"
                margin="normal"
                InputProps={{
                  endAdornment: <InputAdornment position="end">{t('hours')}</InputAdornment>,
                  inputMode: 'numeric',
                }}
                inputProps={{ style: { textAlign: 'right' } }}
                fullWidth
                onChange={props.handleChange('maximumWorkingHours', 'number')}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                  id="daily-time-unit"
                  value={props.form.dailyTimeUnit}
                  label={t('daily_time_unit')}
                  type="text"
                  margin="normal"
                  InputProps={{
                    endAdornment: <InputAdornment position="end">{t('minutes')}</InputAdornment>,
                    inputMode: 'numeric',
                  }}
                  inputProps={{ style: { textAlign: 'right' } }}
                  fullWidth
                  onChange={props.handleChange('dailyTimeUnit', 'number')}
                />
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="monthly-time-unit"
                value={props.form.monthlyTimeUnit}
                label={t('monthly_time_unit')}
                type="text"
                margin="normal"
                InputProps={{
                  endAdornment: <InputAdornment position="end">{t('minutes')}</InputAdornment>,
                  inputMode: 'numeric',
                }}
                inputProps={{ style: { textAlign: 'right' } }}
                fullWidth
                onChange={props.handleChange('monthlyTimeUnit', 'number')}
              />
            </Grid>
          </Grid>
          <FormControlLabel
            label={t('use_excess')}
            control={<Checkbox
              id="use-excess"
              checked={props.form.useExcessRate}
              onChange={props.handleChange('useExcessRate', 'checkbox')}
            />}
          />
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            disabled={!props.form.name}
          >
            { t('add') }
          </Button>
          <Button
            color="error"
            onClick={props.onCancel}
          >
            { t('cancel') }
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default AddProjectDialog
