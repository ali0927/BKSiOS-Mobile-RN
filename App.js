import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {ToastProvider} from 'react-native-toast-notifications';
import MainTabs from './screens/components/tapButtons/mainTabs';

import {MainPage} from './screens/pages/mainPage';

const App = () => {
  const [isStarted, setIsStarted] = useState(false);
  useEffect(() => {}, [isStarted]);
  if (!isStarted) return <MainPage submit={setIsStarted} />;
  return (
    <ToastProvider>
    <SafeAreaView style={styles.container}>
      <MainTabs />
    </SafeAreaView>
    </ToastProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
