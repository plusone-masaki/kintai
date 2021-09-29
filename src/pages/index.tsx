import { FormEvent, useContext, useEffect, useState } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core'
import { Project, User } from '@/interfaces'
import RepositoryFactory from '@/resources/RepositoryFactory'
import ProjectList from '@/components/List/ProjectList'
import AddProjectDialog from '@/components/Dialog/AddProjectDialog'
import { AuthContext } from '@/components/context/AuthContext'
import FormHelper from '@/helpers/FormHelper'

const projectRepository = RepositoryFactory.get('project')

const initialForm = (user?: User): Project => ({
  userId: user?.uid ?? '',
  name: '',
  basicRate: 0,
  minimumWorkingHours: 140,
  maximumWorkingHours: 180,
  dailyTimeUnit: 15,
  monthlyTimeUnit: 15,
  useExcessRate: true,
})

const IndexPage = () => {
  const { t } = useTranslation('common')
  const [projects, setProjects] = useState<Project[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [form, setForm] = useState<Project>(initialForm)
  const { user } = useContext(AuthContext)

  // 案件一覧を取得
  const fetchProjects = async () => setProjects(await projectRepository.list(user))

  const handleChange = FormHelper.setForm(form, setForm)

  const handleEdit = (project?: Project) => {
    if (project) setForm(project)
    setIsEdit(!!project)
    setOpen(true)
  }

  /**
   * 案件の登録
   *
   * @param {FormEvent} e
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setOpen(false)
    await projectRepository.add(form)
    setForm(initialForm(user))
    return fetchProjects()
  }

  /**
   * 案件の削除
   *
   * @param {FormEvent} e
   * @param {string} id
   */
  const handleDelete = async (e: FormEvent, id: string) => {
    e.preventDefault()
    if (window.confirm(t('projects.confirm_delete'))) {
      await projectRepository.delete(id)
      return fetchProjects()
    }
  }

  /**
   * 登録ダイアログを閉じる
   */
  const handleCancel = () => {
    setOpen(false)
    setForm(initialForm(user))
  }

  useEffect(() => {
    setForm(initialForm(user))
    fetchProjects()
  }, [user])

  return (
    <Container maxWidth="sm">
      <Box pt={8}>
        <Box mb={3}>
          <Typography variant="h4">
            <Grid container justifyContent="space-between">
              { t('projects.list') }

              {/* 案件を追加 */}
              <Box pb={1}>
                <Button
                  variant="contained"
                  onClick={() => handleEdit()}
                >
                  { t('projects.add') }
                </Button>
              </Box>
            </Grid>
          </Typography>
          <Divider color="primary" />
        </Box>

        {/* 案件一覧 */}
        <ProjectList
          items={projects}
          onEdit={(project) => handleEdit(project)}
          onClose={handleDelete}
        />

        {/* 案件の追加ダイアログ */}
        <AddProjectDialog
          form={form}
          open={open}
          isEdit={isEdit}
          handleChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </Box>
    </Container>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'projects']),
  },
})

export default IndexPage
