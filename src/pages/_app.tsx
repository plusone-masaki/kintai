import { appWithTranslation } from 'next-i18next'
import { withTheme } from '@material-ui/styles'
import nextI18nextConfig from '../../next-i18next.config'
import Layout from '@/components/Layout/Layout'
import '@/assets/css/reset.css'
import '@/assets/css/global.css'

const App = ({ Component, pageProps }) => (
  <Layout {...pageProps}>
    <Component {...pageProps} />
  </Layout>
)

export default withTheme(appWithTranslation(App, nextI18nextConfig))
