import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';

const HomeScreen: React.FC = () => {
  return (
    <>
      <View style={{flex: 1}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingVertical: 10,
          }}>
          <Text style={{fontSize: 32, fontWeight: 'bold', color: '#000'}}>
            Todo
          </Text>
          <TouchableOpacity>
            <Text>cdc</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={[
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
          ]}
          keyExtractor={({item}: {item: number}) => `sccsd${item}`}
          renderItem={({item}) => {
            return (
              <View
                style={{
                  backgroundColor: 'blue',
                  marginHorizontal: 16,
                  marginVertical: 5,
                }}>
                <View
                  style={{
                    marginLeft: 10,
                    backgroundColor: '#fff',
                    paddingVertical: 15,
                    paddingHorizontal: 5,
                  }}>
                  <Text>{item}</Text>
                </View>
              </View>
            );
          }}
        />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: '#000',
          position: 'absolute',
          bottom: 40,
          right: 40,
          padding: 16,
          borderRadius: 8,
        }}>
        <AntIcon name="plus" color="#fff" size={20} />
      </TouchableOpacity>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {},
});
