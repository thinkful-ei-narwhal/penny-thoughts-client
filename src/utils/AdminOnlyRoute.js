import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import TokenService from '../services/token-service'
import jwtDecode from 'jwt-decode'

export default function AdminOnlyRoute({ component, ...props }) {
  const Component = component
  return (
    <Route
      {...props}
      render={componentProps => (
        TokenService.hasAuthToken()
          ? jwtDecode(TokenService.getAuthToken()).admin
            ? <Component {...componentProps} />
            : <Redirect
                to={{
                  pathname: '/home',
                  state: { from: componentProps.location }
                }}
              />
          : <Redirect
              to={{
                pathname: '/',
                state: { from: componentProps.location }
              }}
            />
      )}
    />
  )
}