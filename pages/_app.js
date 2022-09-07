import RouteGuard from '../components/RouteGuard'
import { storeWrapper } from '../store'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <RouteGuard>
        <Component {...pageProps} />
    </RouteGuard>
  )
}

export default storeWrapper.withRedux(MyApp)