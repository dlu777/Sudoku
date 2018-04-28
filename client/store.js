// import {createStore, combineReducers, applyMiddleware} from 'redux'
// import createLogger from 'redux-logger'
// import thunkMiddleware from 'redux-thunk'
// import {composeWithDevTools} from 'redux-devtools-extension'

// /**
//  * ACTION TYPES
//  */
// const GET_USER = 'GET_USER'
// const REMOVE_USER = 'REMOVE_USER'

// /**
//  * INITIAL STATE
//  */
// const defaultUser = {}

// /**
//  * ACTION CREATORS
//  */
// const getUser = user => ({type: GET_USER, user})
// const removeUser = () => ({type: REMOVE_USER})

// /**
//  * THUNK CREATORS
//  */
// export const me = () =>
//   dispatch =>
//     axios.get('/auth/me')
//       .then(res =>
//         dispatch(getUser(res.data || defaultUser)))
//       .catch(err => console.log(err))

// export const auth = (email, password, method) =>
//   dispatch =>
//     axios.post(`/auth/${method}`, { email, password })
//       .then(res => {
//         dispatch(getUser(res.data))
//         history.push('/home')
//       }, authError => { // rare example: a good use case for parallel (non-catch) error handler
//         dispatch(getUser({error: authError}))
//       })
//       .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

// export const logout = () =>
//   dispatch =>
//     axios.post('/auth/logout')
//       .then(_ => {
//         dispatch(removeUser())
//         history.push('/login')
//       })
//       .catch(err => console.log(err))

// /**
//  * REDUCER
//  */
// const userReducer = function (state = defaultUser, action) {
//   switch (action.type) {
//     case GET_USER:
//       return action.user
//     case REMOVE_USER:
//       return defaultUser
//     default:
//       return state
//   }
// }


// const reducer = combineReducers({user})
// const middleware = composeWithDevTools(applyMiddleware(
//   thunkMiddleware,
//   createLogger({collapsed: true})
// ))
// const store = createStore(reducer, middleware)

// export default store
