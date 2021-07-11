import React from 'react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
}

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
  },
})

const withChakra = (StoryFn) => {
  return (
    <ChakraProvider theme={theme}>
      <StoryFn />
    </ChakraProvider>
  )
}

export const decorators = [withChakra]
