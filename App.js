import React, {useState, useCallback} from 'react';
import DeviceInfo from 'react-native-device-info';
import {View, Text} from 'react-native';
import MapView from 'react-native-maps';
import HMSMap, {MapTypes} from '@hmscore/react-native-hms-map';

function App() {
  const [isHmsDevice, setIsHmsDevice] = useState(false);
  const [isGmsDevice, setIsGmsDevice] = useState(false);

  DeviceInfo.hasGms().then(hasGms => {
    useCallback(() => {
      setIsGmsDevice(() => hasGms);
    }, []);
  });

  DeviceInfo.hasHms().then(hasHms => {
    useCallback(() => {
      setIsHmsDevice(() => hasHms);
    }, []);
  });

  return (
    <View>
      {isHmsDevice && !isGmsDevice ? (
        <View>
          <Text>Siilela's Map</Text>
          <MapView
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        </View>
      ) : (
        <View>
          <Text>Huawei's Map</Text>
          <HMSMap
            mapType={MapTypes.NORMAL}
            camera={{target: {latitude: 41, longitude: 29}, zoom: 11}}
          />
        </View>
      )}
    </View>
  );
}

export default App;
