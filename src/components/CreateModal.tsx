import * as React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomModal from './CustomModal';
import {Dispatch, MutableRefObject, SetStateAction} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createTodo, createTodoSuccess} from '../service/slice/TodoSlice';
import {RootState} from '../service/configureStore';
import {TodoType} from '../types/todo';

type Props = {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  refFlatList: MutableRefObject<FlatList<TodoType> | undefined>;
};

const priorityData = [
  {
    id: 0,
    label: 'Thấp',
    color: 'green',
  },
  {
    id: 1,
    label: 'Trung bình',
    color: 'yellow',
  },
  {
    id: 2,
    label: 'Cao',
    color: 'red',
  },
];

const CreateModal: React.FC<Props> = props => {
  const {width} = Dimensions.get('window');

  const dispatch = useDispatch();

  const {visible, setVisible, refFlatList} = props;

  const actionLoading = useSelector(
    (state: RootState) => state.todo.actionLoading,
  );

  const [priority, setPriority] = React.useState<0 | 1 | 2>(0);
  const [task, setTask] = React.useState<string>('');

  React.useEffect(() => {
    if (actionLoading === 'createTodoSuccess') {
      dispatch(createTodoSuccess(''));
      setVisible(false);
      setPriority(0);
      setTask('');
      setTimeout(() => {
        refFlatList.current?.scrollToEnd();
      }, 500);
    }
  }, [actionLoading]);

  return (
    <CustomModal
      visible={visible}
      setVisible={setVisible}
      w={0.9 * width}
      h={270}>
      <View style={{padding: 16}}>
        <View>
          <Text style={styles.label}>Công việc</Text>
          <TextInput
            style={styles.input}
            placeholder="Công việc"
            onChangeText={setTask}
            value={task}
          />
          <Text style={styles.label}>Mức độ ưu tiên</Text>
          <View style={styles.priorityLevel}>
            {priorityData.map(item => (
              <TouchableOpacity
                key={item.id}
                onPress={() => setPriority(item.id)}
                style={[
                  styles.priorityItem,
                  {
                    borderWidth: 1,
                    borderColor: item.id === priority ? '#d1d1d1' : '#fff',
                  },
                ]}>
                <View style={[styles.dot, {backgroundColor: item.color}]} />
                <Text style={styles.text}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: '#e1e1e1'}]}
            onPress={() => setVisible(false)}>
            <Text style={styles.text}>Trở về</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: '#7f51c8'}]}
            onPress={() => {
              Keyboard.dismiss();
              dispatch(
                createTodo({
                  task: task,
                  priority: priority,
                }),
              );
            }}>
            <Text
              style={[
                styles.text,
                {
                  color: '#fff',
                  marginRight: actionLoading === 'createTodoLoading' ? 10 : 0,
                },
              ]}>
              Thêm
            </Text>
            {actionLoading === 'createTodoLoading' && (
              <ActivityIndicator size="small" color={'#fff'} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </CustomModal>
  );
};

export default CreateModal;

const styles = StyleSheet.create({
  input: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    paddingVertical: 5,
    paddingHorizontal: 8,
    marginTop: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    color: '#000',
  },
  dot: {
    height: 30,
    width: 30,
    backgroundColor: 'red',
    borderRadius: 15,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    flexDirection: 'row',
  },
  priorityLevel: {
    marginTop: 8,
    marginBottom: 15,
    flexDirection: 'row',
  },
  priorityItem: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 8,
  },
});
