import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {userContext} from '../../router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Data = ({navigation}) => {
  const {dataSiswa} = useContext(userContext);
  const [data, setData] = dataSiswa;
  const [textInput, setTextInput] = useState('');

  const tambah = () => {
    data.push({nama: textInput});
    setData(data);
    saveData(data);
  };

  const cekTeksInput = () => {
    if (textInput == '') {
      alert('Harap masukan nama siswa!!');
    } else {
      navigation.replace('Absensi');
      tambah();
    }
  };

  const saveData = async data => {
    try {
      await AsyncStorage.setItem('database', JSON.stringify(data));
    } catch (e) {
      console.log('save error', e);
    }
  };

  return (
    <View style={{padding: 20}}>
      <TextInput
        placeholderTextColor={'grey'}
        placeholder="Masukkan Nama Siswa"
        style={styles.input}
        onChangeText={value => setTextInput(value)}
      />
      <TouchableOpacity
        style={styles.conterBottom}
        onPress={() => {
          cekTeksInput();
        }}>
        <Text style={styles.textTam}>Tambah</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Data;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'black',
    paddingLeft: 15,
    borderRadius: 7,
    color: 'black',
  },
  conterBottom: {
    backgroundColor: 'black',
    marginTop: 30,
    height: 40,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textTam: {
    fontSize: 17,
    color: 'white',
  },
});
