import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import TiktokProgressbar from 'react-native-tiktok-progressbar';

export default function App() {
  return (
    <View style={styles.container}>
      <TiktokProgressbar
        paddingHorizontal={15}
        height={1}
        color="blue"
        isLoading={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
