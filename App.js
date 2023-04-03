import {useState, useEffect, useCallback} from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { MainLayout } from './src/MainLayout';
import { TodoState } from './src/context/todo/TodoState';
import { ScreenState } from './src/context/screen/ScreenState';
import { View } from 'react-native';

SplashScreen.preventAutoHideAsync();
    export default function App() {
    const [isReady, setIsReady] = useState(false);
    useEffect(()=>{
      async function loadApplication(){
        try{
          await Font.loadAsync({
            'roboto-regular' : require('./assets/fonts/Roboto-Regular.ttf'),
            'roboto-bold' : require('./assets/fonts/Roboto-Bold.ttf')
          })
        }catch(e){
          console.log(e);
        }finally{
          setIsReady(true)
        }
      }
      loadApplication();
    }, []);

    const onLayoutRootView = useCallback(async () => {
      if (isReady) {
        await SplashScreen.hideAsync();
      }
    }, [isReady]);

    if (!isReady) {return null}

    return (
      <View style={{flex: 1}}  onLayout={onLayoutRootView}>
        <ScreenState>
            <TodoState>
              <MainLayout /> 
            </TodoState>
        </ ScreenState>
      </View>  
    )
}