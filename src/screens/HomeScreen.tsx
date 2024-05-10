import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';

import {CreateModal} from '../components';
import {getTodoList} from '../service/slice/TodoSlice';
import {TodoType} from '../types/todo';
import {RootState} from '../service/configureStore';

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();

  const todoList = useSelector((state: RootState) => state.todo.todoList);
  const loading = useSelector((state: RootState) => state.todo.actionLoading);

  const [visible, setVisible] = React.useState<boolean>(false);
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    dispatch(getTodoList());
  }, []);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getTodoList());
    setRefreshing(false);
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Todo</Text>
          <TouchableOpacity>
            <Text>cdc</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={todoList}
          keyExtractor={(item: TodoType) => `${item.id}`}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({item}: {item: TodoType}) => {
            let priorityColor =
              item.priority === 0
                ? 'green'
                : item.priority === 1
                ? 'yellow'
                : 'red';
            return (
              <View
                style={[
                  styles.itemContainer,
                  {backgroundColor: priorityColor},
                ]}>
                <View style={styles.item}>
                  <Text>{item.task}</Text>
                </View>
              </View>
            );
          }}
        />
      </View>
      <TouchableOpacity
        style={styles.floaButton}
        onPress={() => setVisible(true)}>
        <AntIcon name="plus" color="#fff" size={20} />
      </TouchableOpacity>
      <CreateModal visible={visible} setVisible={setVisible} />
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
  },
  floaButton: {
    backgroundColor: '#7f51c8',
    position: 'absolute',
    bottom: 40,
    right: 40,
    padding: 16,
    borderRadius: 8,
  },
  itemContainer: {
    marginHorizontal: 16,
    marginVertical: 5,
    borderRadius: 8,
  },
  item: {
    marginLeft: 10,
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
});
