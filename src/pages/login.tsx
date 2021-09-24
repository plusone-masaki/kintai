import React, { useContext } from 'react'
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import RepositoryFactory from '@/resources/RepositoryFactory'

const authRepository = RepositoryFactory.get('auth')

const Copyright = (props: any) => (
  <Typography variant="body2" color="text.secondary" align="center" {...props}>
    {'Copyright © '}
    <Link color="inherit" href="https://plus-one.tech/">
      Plus one
    </Link>{' '}
    2018
    {'.'}
  </Typography>
)

const LogIn = () => {
  const router = useRouter()
  const { t } = useTranslation('auth')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()
      const data = new FormData(event.currentTarget)
      // eslint-disable-next-line no-console
      const form = {
        email: data.get('email') as string,
        password: data.get('password') as string,
      }

      await authRepository.login(form)

      return router.push('/')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          { t('signin') }
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
          <TextField
            margin="normal"
            id="email"
            name="email"
            label={t('email')}
            autoComplete="email"
            autoFocus
            required
            fullWidth
          />
          <TextField
            id="password"
            type="password"
            name="password"
            label={t('password')}
            autoComplete="current-password"
            margin="normal"
            required
            fullWidth
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
          >
            { t('signin') }
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                {t('forgot_password')}
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{mt: 8, mb: 4}}/>
    </Container>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'auth']),
  },
})

export default LogIn
