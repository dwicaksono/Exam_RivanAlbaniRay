import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Logo} from '../../assets';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Screen1');
    }, 3000);
  }, [navigation]);
  return (
    <LinearGradient colors={['#7EF9FF', '#F1FFFE']} style={{flex: 1}}>
      <View style={styles.page}>
        <Image source={Logo} style={{height: 200, width: 200}} />
      </View>
    </LinearGradient>
  );
};

export default Splash;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
