import { FormEvent, useEffect, useState } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import {
  Box, Button, Container,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core'
import { Project } from '@/interfaces'
import RepositoryFactory from '@/api/RepositoryFactory'
import ProjectList from '@/components/List/ProjectList'
import AddProjectDialog from '@/components/Dialog/AddProjectDialog'

type Form = {
  name: string
}

const projectRepository = RepositoryFactory.get('project')

const initialForm = (): Form => ({ name: '' })

const IndexPage = () => {
  const { t } = useTranslation('common')
  const [projects, setProjects] = useState<Project[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const [form, setForm] = useState<Form>(initialForm())

  const handleChange = (input) => e => {
    setForm({...form, [input] : e.target.value})
  }
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    console.log('submit', form)
    setOpen(false)
  }
  const handleCancel = () => {
    setOpen(false)
    setForm(initialForm())
  }

  useEffect(() => {
    // 案件一覧を取得
    const fetchProjects = async () => setProjects(await projectRepository.list())

    fetchProjects()
  }, [])

  return (
    <Container maxWidth="sm">
      <Box pt={8}>
        <Box mb={3}>
          <Typography variant="h4">
            <Grid container justifyContent="space-between">
              { t('projects.list') }
              <Box pb={1}>
                <Button
                  variant="contained"
                  onClick={() => setOpen(true)}
                >
                  { t('projects.add') }
                </Button>
              </Box>
            </Grid>
          </Typography>
          <Divider color="primary" />
        </Box>
        <ProjectList items={projects} />

        {/* 案件の追加ダイアログ */}
        <AddProjectDialog
          form={form}
          open={open}
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
