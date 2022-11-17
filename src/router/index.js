import React, {createContext, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../screen/0.splah';
import Home from '../screen/1.home';
import Data from '../screen/3.tambahData';

const Stack = createNativeStackNavigator();
export const userContext = createContext();
const Router = () => {
  const [data, setData] = useState([]);
  return (
    <userContext.Provider
      value={{
        dataSiswa: [data, setData],
      }}>
      <Stack.Navigator>
        <Stack.Screen
          name="splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Absensi"
          component={Home}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="data"
          component={Data}
          options={{headerShown: true}}
        />
      </Stack.Navigator>
    </userContext.Provider>
  );
};

export default Router;
