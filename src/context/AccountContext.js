import React from 'react'

const AccountContext = React.createContext({
  name: '',
  password: '',
  getName: () => {},
  getPassword: () => {},
})

export default AccountContext
