import { Box } from '@chakra-ui/react'
import Navbar from 'src/components/Navbar/Navbar'

type BaseLayoutProps = {
  children: React.ReactNode
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <Box w="100%" h="100vh">
      <Navbar />
      <Box w={{ base: '100%', md: '80%', lg: '60%' }} mx="auto" mt={5}>
        {children}
      </Box>
    </Box>
  )
}

export default BaseLayout
