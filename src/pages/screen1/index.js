import Axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {Button, Gap, Loading} from '../../components';
import {showError, showSuccess, useForm} from '../../utils';
import LinearGradient from 'react-native-linear-gradient';

const Screen1 = ({navigation}) => {
  const [data, setData] = useState({
    code: '',
  });
  const [dataForm, setDataForm] = useForm({
    code: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    Axios.get('https://dev.dispenda.online/api/get-random-code')
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log('err:', err));
  };

  const postData = () => {
    setLoading(true);
    Axios.post('https://dev.dispenda.online/api/post-screen-1', dataForm)
      .then((res) => {
        showSuccess('Sukses anda memasukkan code yang benar');
        setLoading(false);
        console.log('res:', res);
        setDataForm(res.data);
        navigation.navigate('Screen2');
      })
      .catch((err) => {
        showError('Anda memasukkan code yang salah atau expired');
        setLoading(false);
        console.log('err', err);
      });
  };

  return (
    <>
      <LinearGradient colors={['#7EF9FF', '#F1FFFE']} style={{flex: 1}}>
        <View style={styles.page}>
          <Text style={styles.text}>Random Code</Text>
          <Gap height={18} />
          <View style={styles.randomCode}>
            <Text style={{color: 'white', fontSize: 20}}>{data.code}</Text>
          </View>
          <Gap height={18} />
          <Text style={styles.text}>Input Code</Text>
          <Gap height={18} />
          <TextInput
            style={styles.input}
            value={dataForm.code}
            onChangeText={(value) => setDataForm('code', value)}
          />
          <Gap height={20} />
          <Button type="secondary" title="submit" onPress={postData} />
        </View>
      </LinearGradient>
      {loading && <Loading />}
    </>
  );
};

export default Screen1;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    padding: 15,
  },
  text: {
    fontSize: 20,
    letterSpacing: 2,
    textAlign: 'center',
  },
  randomCode: {
    width: 100,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#0e52b1',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#0e52b1',
  },
});
