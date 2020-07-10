import React, { Component} from 'react'
import AuthApiService from '../services/auth-api-service'
import TokenService from '../services/token-service'
import IdleService from '../services/idle-service'
import UserService from '../services/userService'


const UserContext = React.createContext({
  user: {},
  userData: {},
  error: null,
  setError: () => { },
  clearError: () => { },
  setUser: () => { },
  setUserData: () => { },
  clearUserData: () => { },
  processLogin: () => { },
  processLogout: () => { },
  confirm: false,
  deleteAccount: false,
  toggleConfirm: () => {},
  toggleDelete: () => {}
})

export default UserContext;

export class UserProvider extends Component {
  constructor(props) {
    super(props)
    const state = { 
      user: {},
      error: null,
      userData: {},
      confirm: false,
      deleteAccount: false
     }

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
    this.setState({ 
      userData: {
        full_name: data.full_name,
        email: data.email
      }
    })
  }

  clearUserData = () => {
    this.setState({ user: null, userData: null })
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
    this.clearUserData()
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


  toggleConfirm = () => {
    this.setState({ confirm: !this.state.confirm })
  }

  toggleDelete = () => {
    this.setState({ deleteAccount: !this.state.deleteAccount });
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
      clearUserData: this.clearUserData,
      confirm: this.state.confirm,
      deleteAccount: this.state.deleteAccount,
      toggleConfirm: this.toggleConfirm,
      toggleDelete: this.toggleDelete
    }
    return (
      <UserContext.Provider value={value}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}
