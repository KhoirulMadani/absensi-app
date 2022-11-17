import {Text, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import AnimatedLottieView from 'lottie-react-native';

const Splash = ({navigation}) => {
  useEffect(() =>
    setTimeout(() => {
      navigation.replace('Absensi');
    }, 2000),
  );

  return (
    <View style={{flex: 1}}>
      <AnimatedLottieView
        source={require('../../components/lottie/loading.json')}
        loop={true}
        autoPlay={true}
      />
    </View>
  );
};

export default Splash;
