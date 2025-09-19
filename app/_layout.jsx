import {
  DarkTheme, // Importa o tema escuro do React Navigation
  DefaultTheme, // Importa o tema padrão (claro) do React Navigation
  ThemeProvider, // Componente que fornece o tema para toda a árvore de navegação
} from "@react-navigation/native";
import { useFonts } from "expo-font"; // Hook do Expo para carregar fontes
import { Stack } from "expo-router"; // Componente de navegação em pilha do Expo Router
import * as SplashScreen from "expo-splash-screen"; // Biblioteca para controlar a tela de splash
import { useEffect } from "react"; // Hook do React para efeitos colaterais
import "react-native-reanimated"; // Importa a biblioteca para animações, um requisito para algumas bibliotecas de gestos e navegação

import { useColorScheme } from "@/hooks/useColorScheme"; // Hook personalizado para detectar o esquema de cores do sistema (claro/escuro)
import { GestureHandlerRootView } from "react-native-gesture-handler"; // Componente necessário para habilitar gestos nativos

// Impede que a tela de splash se esconda automaticamente antes que os recursos sejam carregados.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme(); // Obtém o esquema de cores atual do dispositivo (não está sendo usado, mas foi importado)
  const [loaded] = useFonts({
    // Carrega a fonte 'SpaceMono-Regular.ttf'
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    // Este efeito é executado sempre que a variável `loaded` muda
    if (loaded) {
      // Se as fontes foram carregadas, esconde a tela de splash
      SplashScreen.hideAsync();
    }
  }, [loaded]); // O efeito depende do estado de `loaded`

  if (!loaded) {
    // Enquanto as fontes não estiverem carregadas, não renderiza nada.
    // Isso mantém a tela de splash visível.
    return null;
  }

  return (
    // 'GestureHandlerRootView' é necessário para que a navegação e gestos funcionem corretamente.
    <GestureHandlerRootView>
      {/* 'ThemeProvider' aplica o tema escuro para todas as telas dentro dele. */}
      <ThemeProvider value={DarkTheme}>
        {/* O 'Stack' gerencia a navegação em pilha. As telas são empilhadas uma sobre a outra. */}
        <Stack>
          {/* 'Stack.Screen' define uma rota (tela) */}
          <Stack.Screen name="index" options={{ headerShown: false }} /> {/* Tela inicial, sem cabeçalho */}
          <Stack.Screen
            name="permissions"
            options={{ presentation: "modal", headerShown: true }} // Tela de permissões, exibida como um modal e com cabeçalho
          />
          <Stack.Screen
            name="media"
            options={{ presentation: "modal", headerShown: false }} // Tela de mídia, exibida como um modal e sem cabeçalho
          />
          <Stack.Screen name="+not-found" options={{ presentation: "modal" }} /> {/* Rota para lidar com URLs não encontradas, exibida como modal */}
        </Stack>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}