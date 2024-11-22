import { Text, View, StyleSheet } from 'react-native';
import Camera from '@/components/Camera';

export default function Scanner() {
  return (
    <View style={styles.container}>
      <Camera></Camera>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
  
  },
});
