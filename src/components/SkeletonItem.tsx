import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Animated, Dimensions} from 'react-native';

const SkeletonItem: React.FC = () => {
  const {width, height} = Dimensions.get('window');

  const opacity = React.useRef(new Animated.Value(0.3));

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity.current, {
          toValue: 1,
          useNativeDriver: true,
          duration: 500,
        }),
        Animated.timing(opacity.current, {
          toValue: 0.4,
          useNativeDriver: true,
          duration: 800,
        }),
      ]),
    ).start();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: opacity.current,
        },
      ]}
    />
  );
};

export default SkeletonItem;

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: 'auto',
    backgroundColor: '#c1c1c1',
    marginHorizontal: 16,
    borderRadius: 8,
    marginVertical: 5,
  },
});
