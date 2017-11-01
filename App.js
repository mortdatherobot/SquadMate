import React from 'react';
import { StyleSheet, Text, View,Button } from 'react-native';
import Signin from './src/screens/Signin';
import Home from './src/screens/Home'
import Profile from './src/screens/Profile'
import {Provider,connect} from 'react-redux';
import {StackNavigator,addNavigationHelpers,StackNavigatorConfig} from 'react-navigation';
import {AppStore} from './src/store/AppStore';
import {createStore,combineReducers} from 'redux';


const AppNavigator = StackNavigator({ Home:{screen:Home},Signin:{screen:Signin},Profile:{screen:Profile}});
const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Home'));
const navReducer = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};


const appReducer = combineReducers({
  nav: navReducer
});

class Root extends React.Component {


  render() {
    return (
      <AppNavigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav,
      })} />
    );
  }
}
const mapStateToProps = (state) => ({
  nav: state.nav
});

const AppWithNavigationState =  connect(mapStateToProps)(Root);
const store = createStore(appReducer);
export default class App extends React.Component {
 
  render() {
    return (
      <Provider store={store}>
      <AppWithNavigationState />
    </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
