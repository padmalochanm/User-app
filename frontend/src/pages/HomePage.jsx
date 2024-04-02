import React from 'react'
import { Button } from '@chakra-ui/react'
const HomePage = () => {
  return (
    <div>
      <Button colorScheme='teal'><a href="/users">All Users</a></Button>
      <Button colorScheme='teal'><a href="/teams">All Teams</a></Button>
    </div>
  )
}

export default HomePage
