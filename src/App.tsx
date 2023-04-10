import 'react-native-gesture-handler'
import React from 'react';
import {
  Text,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import Touchable from './components/Touchable';
import Dragable from './components/Dragable';


function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.container}>
        <Text style={styles.title}>Touch</Text>
       <Touchable />
       <Text style={styles.title}>Drag</Text>
       <Dragable />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%"
  },
  title: {
    alignSelf: "center",
    marginTop: 16,
    fontSize: 16,
    fontWeight: "600"
  }
});

export default App;
