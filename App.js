import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {ToastProvider} from 'react-native-toast-notifications';
import MainTabs from './screens/components/tapButtons/mainTabs';

import {MainPage} from './screens/pages/mainPage';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from "./redux/reducers";

const store = createStore(rootReducer);

const App = () => {
  const [isStarted, setIsStarted] = useState(false);
  useEffect(() => {}, [isStarted]);
  if (!isStarted) return <MainPage submit={setIsStarted} />;
  return (
    <Provider store={store}>
      <ToastProvider
        placement="top"
        duration={5000}
        animationType="zoom-in"
        animationDuration={250}
        successColor="green"
        textStyle={{fontSize: 20}}
        offset={50} // offset for both top and bottom toasts
        offsetTop={30}
        offsetBottom={40}
        swipeEnabled={true}>
        <SafeAreaView style={styles.container}>
          <MainTabs />
        </SafeAreaView>
      </ToastProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
