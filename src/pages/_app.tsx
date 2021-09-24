import React from 'react'
import { withTheme } from '@material-ui/styles'
import { appWithTranslation } from 'next-i18next'
import nextI18nextConfig from '@/../next-i18next.config'
import { AuthProvider } from '@/components/context/AuthContext'
import Layout from '@/components/Layout/Layout'
import '@/assets/css/reset.css'
import '@/assets/css/global.css'

const App = ({ Component, pageProps }) => (
  <AuthProvider>
    <Layout {...pageProps}>
      <Component {...pageProps} />
    </Layout>
  </AuthProvider>
)

export default withTheme(appWithTranslation(App, nextI18nextConfig))
