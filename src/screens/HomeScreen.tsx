import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';

import {CreateModal, SkeletonItem} from '../components';
import {deleteTodo, getTodoList} from '../service/slice/TodoSlice';
import {TodoType} from '../types/todo';
import {RootState} from '../service/configureStore';

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch();

  const ref = React.useRef<FlatList<TodoType>>(null);

  const todoList = useSelector((state: RootState) => state.todo.todoList);
  const actionLoading = useSelector(
    (state: RootState) => state.todo.actionLoading,
  );
  const loadingList = useSelector((state: RootState) => state.todo.loading);

  const [visible, setVisible] = React.useState<boolean>(false);
  const [refreshing, setRefreshing] = React.useState<boolean>(false);
  const [selectedItem, setSelectedItem] = React.useState<string>();
  const [isFirstLoad, setFirstLoad] = React.useState<boolean>(false);

  React.useEffect(() => {
    setFirstLoad(true);
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
        </View>
        {loadingList && isFirstLoad ? (
          <FlatList
            data={[1, 2, 3, 4, 5]}
            keyExtractor={(item: number) => `${item}`}
            renderItem={() => <SkeletonItem />}
          />
        ) : (
          <FlatList
            ref={ref}
            data={todoList}
            keyExtractor={(item: TodoType) => `${item.id}`}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            style={styles.list}
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
                    <Text style={styles.text}>{item.task}</Text>
                    <TouchableOpacity
                      hitSlop={5}
                      onPress={() => {
                        setSelectedItem(item.id);
                        dispatch(deleteTodo(item.id));
                      }}>
                      {actionLoading === 'deleteTodoLoading' &&
                      selectedItem === item.id ? (
                        <ActivityIndicator size="small" color={'#7f51c8'} />
                      ) : (
                        <AntIcon name="delete" size={20} color={'#7f51c8'} />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        )}
      </View>
      <TouchableOpacity
        style={styles.floaButton}
        onPress={() => setVisible(true)}>
        <AntIcon name="plus" color="#fff" size={20} />
      </TouchableOpacity>
      <CreateModal
        refFlatList={ref}
        visible={visible}
        setVisible={setVisible}
      />
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
  list: {marginBottom: 20},
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
    paddingHorizontal: 10,
    borderRadius: 8,
    flexDirection: 'row',
  },
  text: {
    fontSize: 16,
    color: '#000',
    flex: 1,
  },
});
