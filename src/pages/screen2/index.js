import React, {useEffect, useState} from 'react';
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

const Screen2 = () => {
  const [pic, setPic] = useState({
    pic: null,
  });
  const [avatar, setAvatar] = useState([]);
  const [names, setNames] = useState({
    name: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  const myfun = () => {
    ImagePicker.showImagePicker((response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        showError('Oops, sepertinya anda tidak memilih foto nya ?');
      } else if (response.error) {
        showError('Oops, sepertinya ada masalah');
      } else {
        let source = {uri: response.uri};
        setAvatar(source); // yang ini coba pake ... ini
        // let newArr = [...avatar,source] coba ini dlu
        // console.log("ini apa ?:",newArr)hasilnya dicba apa ?
        //seAvatar(newArr) kalau ada array isinya banyak bisa di setAvatar
        setPic(response.data);
        showSuccess('Selamat anda sukses menambahkan gambar');
      }
    });
  };
  const uploadPic = () => {
    setLoading(true);
    RNFetchBlob.fetch(
      'POST',
      'https://dev.dispenda.online/api/post-screen-2',
      {
        'Content-Type': 'multipart/form-data',
      },
      [
        {name: 'name', data: names},
        // name: image adalah nama properti dari api kita
        {name: 'image', filename: 'tempbody.jpg', data: pic},
      ],
    ).then((resp) => {
      showSuccess('Photo yang anda upload success');
      setLoading(false);
      console.log('Response Saya');
      console.log(resp.data);
      setAvatar({avatarSource: null});
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
            onChangeText={(value) => setNames('name', value)}
          />
          <Gap height={18} />
          <Text style={styles.text}>Gambar</Text>
          <Gap height={18} />
          <View style={{flexDirection: 'row'}}>
            <Image source={avatar} style={styles.photo} />
            <Gap width={13} />
            <Image source={avatar} style={styles.photo} />
            <Gap width={13} />
            <Image source={avatar} style={styles.photo} />
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
