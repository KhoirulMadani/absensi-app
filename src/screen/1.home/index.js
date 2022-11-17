import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DataContext, NamaContext} from '../../context';
import React, {useContext, useEffect, useState} from 'react';
import {userContext} from '../../router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import RadioForm from 'react-native-simple-radio-button';

const Home = ({navigation}) => {
  const {dataSiswa} = useContext(userContext);
  const [data, setData] = dataSiswa;
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [inputModal, setInputModal] = useState('');
  const [klik, setKlik] = useState('');
  const [select, setSelect] = useState();
  const [lokal, setLokal] = useState([]);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    const refresh = navigation.addListener('focus', () => {
      getData();
    });
    return refresh;
  }, [navigation]);

  const getData = async () => {
    try {
      let value = await AsyncStorage.getItem('database');
      value = JSON.parse(value);
      if (value !== null) {
        setData(value);
        console.log('get data', value);
      }
    } catch (e) {
      console.log('get error', e);
    }
  };

  const alertDel = index => {
    Alert.alert('Hapus Data!', 'apakah anda yakin ingin menghapusnya', [
      {
        text: 'Batal',
        style: 'cancel',
      },
      {
        text: 'Ok',
        onPress: () => del(index),
      },
    ]);
  };

  const del = index => {
    setLoading(true);
    data.splice(index, 1);
    console.log('hapus data', data);
    setData(data);
    saveData(data);
    setLoading(false);
  };

  const saveData = async data => {
    try {
      await AsyncStorage.setItem('database', JSON.stringify(data));
    } catch (e) {
      console.log('save error', e);
    }
  };

  const Simpan = () => {
    data[index].nama = inputModal;
    console.log(data);
    saveData(data);
  };

  const radio_props = [
    {label: 'Hadir', value: 'Hadir'},
    {label: 'Izin', value: 'Izin'},
    {label: 'Sakit', value: 'Sakit'},
    {label: 'Alfa', value: 'Alfa'},
  ];

  const RadioButtonProject = {
    getInitialState: function () {
      return {
        value: 0,
      };
    },
    render: function () {
      return (
        <View>
          <RadioForm
            radio_props={radio_props}
            onPress={value => {
              setKlik({value: value});
            }}
          />
        </View>
      );
    },
  };

  const pilih = (value, index) => {
    data[index].Status = value;
    setData(data);
    console.log(data);
    saveData(data);
  };

  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <TouchableOpacity
          style={styles.conterData}
          key={index}
          onPress={() => [
            toggleModal(),
            setInputModal(item.nama),
            setIndex(index),
          ]}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginRight: 50,
              // backgroundColor: 'red',
            }}>
            <Text style={{color: 'black'}}>{item.nama}</Text>
            <View
              style={{
                // backgroundColor: 'blue',
                // alignItems: 'center',
                width: 55,
                height: 20,
              }}>
              <Text style={{color: 'black'}}>{item.Status}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => [setIndex(index), alertDel(index)]}>
            <Icon name="delete" size={25} color={'grey'} />
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        style={styles.conterBottom}
        onPress={() => navigation.replace('data')}>
        <Icon name="plus" size={30} color={'#FFFFFF'} />
      </TouchableOpacity>
      <Modal
        isVisible={isModalVisible}
        animationIn="zoomIn"
        animationOut="zoomOut">
        <View style={styles.conterModal}>
          <View style={styles.conterHeaderModal}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{color: 'black'}}>Keterangan Absensi</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Icon name="close" size={25} color={'black'} />
              </TouchableOpacity>
            </View>
            <RadioForm
              radio_props={radio_props}
              initial={-1}
              onPress={value => [setSelect(value)]}
              buttonSize={15}
              buttonColor={'black'}
              selectedButtonColor={'black'}
              style={{marginTop: 8}}
            />
          </View>
          <View style={{alignItems: 'center', top: 15}}>
            <Text style={{color: 'black', right: '40%', top: '12%'}}>
              Ubah Nama
            </Text>
            <TextInput
              placeholder="edit data"
              placeholderTextColor={'grey'}
              style={styles.input}
              value={inputModal}
              onChangeText={t => setInputModal(t)}
            />
            <TouchableOpacity
              style={styles.conterBottomModal}
              onPress={value => [
                Simpan(),
                toggleModal(),
                setKlik(value),
                pilih(select, index),
              ]}>
              <Text style={{color: 'white'}}>Simpan</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  conterData: {
    backgroundColor: 'white',
    elevation: 2,
    height: 45,
    marginHorizontal: 20,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
  },
  conterBottom: {
    backgroundColor: 'black',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  conterModal: {
    backgroundColor: 'white',
    padding: 15,
    height: 320,
    borderRadius: 10,
  },
  conterHeaderModal: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 130,
  },
  buttonModal: {
    backgroundColor: 'black',
    width: 60,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 4,
  },
  input: {
    borderWidth: 1,
    height: 45,
    width: '100%',
    marginTop: 30,
    borderRadius: 7,
    paddingHorizontal: 15,
    color: 'black',
  },
  conterBottomModal: {
    backgroundColor: 'black',
    height: 45,
    width: 80,
    marginTop: 8,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
