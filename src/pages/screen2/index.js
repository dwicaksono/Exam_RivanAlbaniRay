import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import {Button, Gap, Loading} from '../../components';
import {showError, showSuccess} from '../../utils';
import LinearGradient from 'react-native-linear-gradient';
import Axios from 'axios';

const Screen2 = () => {
  const [pic, setPic] = useState({
    pic: null,
  });
  const [avatar, setAvatar] = useState([]);
  const [names, setNames] = useState('');

  const [loading, setLoading] = useState(false);

  myfun = () => {
    ImagePicker.showImagePicker((response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        showError('Oops, sepertinya anda tidak memilih foto nya ?');
      } else if (response.error) {
        showError('Oops, sepertinya ada masalah');
      } else {
        let source = {uri: response.uri}; // yang di set ke source object
        // setAvatar(source);
        let newArr = [...avatar, source.uri]; //ini object di jadikan data bisa karena body array yang di minta isinya file bukan object.
        console.log('ini apa ?:', newArr);
        setAvatar(newArr);
        setPic(response.data);
        showSuccess('Selamat anda sukses menambahkan gambar');
      }
    });
  };
  
  
  const uploadPic = () => {
    setLoading(true);
    
    const data ={
        name: names,
        images: avatar,
      }
    
    const url = 'https://dev.dispenda.online/api/post-screen-2'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }
   
    fetch(url, options)
      .then((response) => response.json())
      .then((json) => {
        showSuccess('Photo yang anda upload success');
        console.error(json);
        setLoading(false);
      })
      .catch((error) => {
        showError('error');
        console.error(error);
        setLoading(false);
      });
  };

  return (
    <>
      <LinearGradient colors={['#7EF9FF', '#F1FFFE']} style={{flex: 1}}>
        <View style={styles.page}>
          <Text style={styles.text}>Nama</Text>
          <Gap height={18} />
          <TextInput
            style={styles.input}
            value={names.name}
            onChangeText={(value) => setNames(value)}
          />
          <Gap height={18} />
          <Text style={styles.text}>Gambar</Text>
          <Gap height={18} />
          <View style={{flexDirection: 'row'}}>
            {avatar.map((poto, id) => {
              return (
                <>
                  <Image key={id} source={{uri:poto}} style={styles.photo} />
                  <Gap width={13} />
                </>
              );
            })}

            <Gap width={13} />
            <TouchableOpacity style={styles.plus} onPress={myfun}>
              <Text style={{color: 'white', fontSize: 40, textAlign: 'center'}}>
                +
              </Text>
            </TouchableOpacity>
          </View>
          <Gap height={18} />
          <Button type="secondary" title="Submit" onPress={uploadPic} />
        </View>
      </LinearGradient>
      {loading && <Loading />}
    </>
  );
};

export default Screen2;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    padding: 15,
  },
  text: {
    fontSize: 22,
    letterSpacing: 2,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#0e52b1',
  },
  plus: {
    backgroundColor: '#e74c3c',
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  photo: {
    width: 40,
    height: 40,
  },
});
