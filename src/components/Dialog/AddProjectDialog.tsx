import { ChangeEventHandler, FormEventHandler } from 'react'
import { useTranslation } from 'next-i18next'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core'

type Form = {
  name: string
}

type Props = {
  open: boolean
  form: Form
  handleChange: (input: string) => ChangeEventHandler
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
            margin="dense"
            autoFocus
            fullWidth
            onChange={props.handleChange('name')}
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
