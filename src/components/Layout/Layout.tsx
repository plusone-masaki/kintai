import { ReactNode } from 'react'
import Head from 'next/head'
import Header from './Header'
import { t } from '@/helpers/WordManager'

type Props = {
    children?: ReactNode
}

const Layout = ({ children }: Props) => (
  <>
    <Head>
      <title>{ t('common.app_name') }</title>
    </Head>

    <Header />

    <main>
      { children }
    </main>
  </>
)

export default Layout
