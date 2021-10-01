import {
  AppBar,
  Link,
  Toolbar,
  Typography,
} from '@material-ui/core'
import { t } from '@/helpers/WordManager'

const Header = () => (
  <AppBar position="relative">
    <Toolbar>
      <Link href="/">
        <Typography variant="h4" color="white">
          { t('common.app_name') }
        </Typography>
      </Link>
    </Toolbar>
  </AppBar>
)

export default Header
