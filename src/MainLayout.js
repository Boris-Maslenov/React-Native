import { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Navbar } from './components/Navbar';
import { MainScreen } from './screens/MainScreen';
import { TodoScreen } from './screens/TodoScreen';
import { ScreenContext } from './context/screen/screenContext';

export const MainLayout = () => {
    const {todoId} = useContext(ScreenContext);
    const content = todoId ?  <TodoScreen /> : <MainScreen />
    return(
        <View style={styles.container}>
              <Navbar /> 
              <View >
                  {content} 
              </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
});