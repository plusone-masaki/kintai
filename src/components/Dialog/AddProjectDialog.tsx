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
  FormGroup,
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
            onChange={props.handleChange('basicRate', 'number')}
          />
          <FormGroup
            style={{
              marginLeft: '-8px',
              marginRight: '-8px',
            }}
            row
          >
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
              style={{
                marginLeft: '8px',
                marginRight: '8px',
              }}
              onChange={props.handleChange('minimumWorkingHours', 'number')}
            />
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
              style={{
                marginLeft: '8px',
                marginRight: '8px',
              }}
              onChange={props.handleChange('maximumWorkingHours', 'number')}
            />
          </FormGroup>

          <FormGroup
            style={{
              marginLeft: '-8px',
              marginRight: '-8px',
            }}
            row
          >
            <TextField
              id="measurement-time-unit"
              value={props.form.measurementTimeUnit}
              label={t('measurement_time_unit')}
              type="text"
              margin="normal"
              InputProps={{
                endAdornment: <InputAdornment position="end">{t('minutes')}</InputAdornment>,
                inputMode: 'numeric',
              }}
              inputProps={{ style: { textAlign: 'right' } }}
              style={{
                marginLeft: '8px',
                marginRight: '8px',
              }}
              onChange={props.handleChange('measurementTimeUnit', 'number')}
            />
          </FormGroup>
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
