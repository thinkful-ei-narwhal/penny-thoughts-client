import React, { Component} from 'react'
import AuthApiService from '../services/auth-api-service'
import TokenService from '../services/token-service'
import IdleService from '../services/idle-service'


const UserContext = React.createContext({
  user: {},
  userData: {},
  error: null,
  setError: () => {},
  clearError: () => {},
  setUser: () => {},
  setUserData: () => {},
  processLogin: () => {},
  processLogout: () => {},
})

export default UserContext;

export class UserProvider extends Component {
  constructor(props) {
    super(props)
    const state = { user: {}, error: null, userData: {} }

    const jwtPayload = TokenService.parseAuthToken()

    if (jwtPayload)
      state.user = {
        id: jwtPayload.user_id,
        name: jwtPayload.name,
        username: jwtPayload.sub,
      }

    this.state = state;
    IdleService.setIdleCallback(this.logoutBecauseIdle)
  }

  componentDidMount() {
    if (TokenService.hasAuthToken()) {
      IdleService.registerIdleTimerResets()
      TokenService.queueCallbackBeforeExpiry(() => {
        this.fetchRefreshToken()
      })
    }
  }

  componentWillUnmount() {
    IdleService.unRegisterIdleResets()
    TokenService.clearCallbackBeforeExpiry()
  }

  setError = error => {
    this.setState({ error })
  }

  clearError = () => {
    this.setState({ error: null })
  }

  setUser = data => {
    this.setState({ user: data })
  }

  setUserData = data => {
    this.setState({ userData:data})
  }


  processLogin = authToken => {
    TokenService.saveAuthToken(authToken)
    const jwtPayload = TokenService.parseAuthToken()
    this.setUser({
      id: jwtPayload.user_id,
      name: jwtPayload.name,
      username: jwtPayload.sub,
    })
    IdleService.registerIdleTimerResets()
    TokenService.queueCallbackBeforeExpiry(() => {
      this.fetchRefreshToken()
    })
  }

  processLogout = () => {
    TokenService.clearAuthToken()
    TokenService.clearCallbackBeforeExpiry()
    IdleService.unRegisterIdleResets()
    this.setUser({})
  }

  logoutBecauseIdle = () => {
    TokenService.clearAuthToken()
    TokenService.clearCallbackBeforeExpiry()
    IdleService.unRegisterIdleResets()
    this.setUser({ idle: true })
  }

  fetchRefreshToken = () => {
    AuthApiService.refreshToken()
      .then(res => {
        TokenService.saveAuthToken(res.authToken)
        TokenService.queueCallbackBeforeExpiry(() => {
          this.fetchRefreshToken()
        })
      })
      .catch(err => {
        this.setError(err)
      })
  }

  render() {
    const value = {
      user: this.state.user,
      error: this.state.error,
      setError: this.setError,
      clearError: this.clearError,
      setUser: this.setUser,
      processLogin: this.processLogin,
      processLogout: this.processLogout,
      userData: this.state.userData,
      setUserData: this.setUserData,
    }
    return (
      <UserContext.Provider value={value}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}
