import { AuthProvider } from '@redwoodjs/auth'
import netlifyIdentity from 'netlify-identity-widget'
import { isBrowser } from '@redwoodjs/prerender/browserUtils'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { FatalErrorBoundary } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

import './index.css'

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
  },
})

isBrowser && netlifyIdentity.init()

const App = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <AuthProvider client={netlifyIdentity} type="netlify">
      <RedwoodApolloProvider>
        <ChakraProvider theme={theme}>
          <Routes />
        </ChakraProvider>
      </RedwoodApolloProvider>
    </AuthProvider>
  </FatalErrorBoundary>
)

export default App
