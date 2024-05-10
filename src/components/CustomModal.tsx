import * as React from 'react';
import {Dispatch, SetStateAction} from 'react';
import {
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';

interface Props {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
  w: number;
  h: number;
}

const CustomModal: React.FC<Props> = props => {
  const {width, height} = Dimensions.get('window');
  const {visible, setVisible, children, w, h} = props;

  return (
    <Modal visible={visible} transparent>
      <View
        style={[
          styles.modal,
          {
            width: w,
            height: h,
            top: (height - h) / 2,
            left: (width - w) / 2,
          },
        ]}>
        {children}
      </View>
      <TouchableOpacity style={styles.blur} onPress={() => setVisible(false)} />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    position: 'absolute',
    backgroundColor: 'white',
    zIndex: 10,
    borderRadius: 8,
    flex: 1,
  },
  blur: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
  },
});

export default CustomModal;
