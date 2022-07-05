import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import Toast from 'react-native-toast-message';
import MainTabs from './screens/components/tapButtons/mainTabs';

import {MainPage} from './screens/pages/mainPage';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './redux/reducers';

const store = createStore(rootReducer);

const THEME_COLOR = '#14142f';

const App = () => {
  const [isStarted, setIsStarted] = useState(false);
  useEffect(() => {}, [isStarted]);
  if (!isStarted) return <MainPage submit={setIsStarted} />;
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={THEME_COLOR}/>
        <MainTabs />
      </SafeAreaView>
      <Toast />
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME_COLOR,
  },
});

export default App;
