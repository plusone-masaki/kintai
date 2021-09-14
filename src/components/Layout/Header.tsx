import {
  AppBar,
  Link,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { useTranslation } from 'next-i18next'

const Header = () => {
  const { t } = useTranslation('common')

  return (
    <AppBar position="relative">
      <Toolbar>
        <Link href="/">
          <Typography variant="h4" color="white">
            {t('app_name')}
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  )
}

export default Header
