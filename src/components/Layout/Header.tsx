import { useContext } from 'react'
import {
  AppBar, Button,
  Link,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { t } from '@/helpers/WordManager'
import { AuthContext } from '@/components/context/AuthContext'
import RepositoryFactory from '@/resources/RepositoryFactory'

const Header = () => {
  const { user } = useContext(AuthContext)
  const authRepository = RepositoryFactory.get('auth')

  const logout = () => authRepository.logout()

  return (
    <AppBar position="relative">
      <Toolbar>
        <Link href="/">
          <Typography
            variant="h4"
            color="white"
          >
            { t('common.app_name') }
          </Typography>
        </Link>
        <div style={{ flexGrow: 1 }} />
        { user &&
          <Button
            color="inherit"
            size="large"
            onClick={logout}
          >
            { t('auth.logout') }
          </Button>
        }
      </Toolbar>
    </AppBar>
  )
}

export default Header
