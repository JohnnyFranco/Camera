import * as React from "react";
import { Stack, useRouter } from "expo-router";
import {
  Alert,
  StyleSheet,
  Switch,
  TouchableHighlight,
  View,
} from "react-native";

// Biblioteca do Expo para gerenciar permissões e salvar na galeria
import * as ExpoMediaLibrary from "expo-media-library";

// Componentes personalizados do projeto (componentes com tema)
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
// Camera e tipos de permissão da biblioteca react-native-vision-camera
import { Camera, CameraPermissionStatus } from "react-native-vision-camera";
import { Ionicons } from "@expo/vector-icons";

// Tamanho padrão dos ícones usados na tela
const ICON_SIZE = 26;

// Componente principal da tela de permissões
export default function PermissionsScreen() {
  // useRouter do expo-router para navegação (substituir tela atual)
  const router = useRouter();

  // Estado local para armazenar o status da permissão da câmera
  // Inicializamos como "not-determined" (ainda não perguntado)
  const [cameraPermissionStatus, setCameraPermissionStatus] =
    React.useState("not-determined");

  // Estado local para armazenar o status da permissão do microfone
  const [microphonePermissionStatus, setMicrophonePermissionStatus] =
    React.useState("not-determined");

  // Hook do Expo Media Library para checar e solicitar permissão de galeria
  // `mediaLibraryPermission` contém o status atual
  // `requestMediaLibraryPermission` é a função para solicitar a permissão
  const [mediaLibraryPermission, requestMediaLibraryPermission] =
    ExpoMediaLibrary.usePermissions();

  // Função assíncrona que solicita permissão ao microfone e atualiza o estado
  const requestMicrophonePermission = async () => {
    // react-native-vision-camera retorna uma string indicando o status
    const permission = await Camera.requestMicrophonePermission();

    // Atualiza o estado local com o novo status (por exemplo: "granted", "denied")
    setMicrophonePermissionStatus(permission);
  };

  // Função assíncrona que solicita permissão para usar a câmera e atualiza o estado
  const requestCameraPermission = async () => {
    const permission = await Camera.requestCameraPermission();

    setCameraPermissionStatus(permission);
  };

  // Handler para o botão de "Continuar" — verifica se todas as permissões exigidas
  // foram concedidas; caso sim, substitui a rota para a tela principal, caso não,
  // informa o usuário para habilitar as permissões nas configurações.
  const handleContinue = () => {
    if (
      cameraPermissionStatus === "granted" &&
      microphonePermissionStatus === "granted" &&
      mediaLibraryPermission?.granted
    ) {
      // Navega para a rota raíz (substitui a tela atual)
      router.replace("/");
    } else {
      // Mostra um alerta caso alguma permissão esteja faltando
      Alert.alert("Por favor, vá em Ajustes e habilite as permissões");
    }
  };

  // Render da UI
  return (
    <>
      {/* Define o título da tela na barra de navegação */}
      <Stack.Screen options={{ title: "Permissões" }} />

      {/* ThemedView é um wrapper com estilos temáticos do app */}
      <ThemedView style={styles.container}>
        {/* Espaçador visual */}
        <View style={styles.spacer} />

        {/* Texto explicativo — traduzido para português */}
        <ThemedText type="subtitle" style={styles.subtitle}>
          O Obscura precisa de acesso a algumas permissões para funcionar corretamente.
        </ThemedText>

        <View style={styles.spacer} />

        {/* Linha indicando que as permissões a seguir são obrigatórias */}
        <View style={styles.row}>
          <Ionicons
            name="lock-closed-outline"
            color={"orange"}
            size={ICON_SIZE}
          />
          <ThemedText style={styles.footnote}>OBRIGATÓRIO</ThemedText>
        </View>

        <View style={styles.spacer} />

        {/* Contêiner da permissão da câmera */}
        <View
          style={StyleSheet.compose(styles.row, styles.permissionContainer)}
        >
          <Ionicons name="camera-outline" color={"gray"} size={ICON_SIZE} />

          {/* Texto com título e descrição da permissão */}
          <View style={styles.permissionText}>
            <ThemedText type="subtitle">Câmera</ThemedText>
            <ThemedText>Usada para tirar fotos e gravar vídeos.</ThemedText>
          </View>

          {/* Switch que reflete o estado atual da permissão da câmera. */}
          <Switch
            trackColor={{ true: "orange" }}
            value={cameraPermissionStatus === "granted"}
            // Ao mudar o switch, solicitamos a permissão da câmera
            onChange={requestCameraPermission}
          />
        </View>

        <View style={styles.spacer} />

        {/* Contêiner da permissão do microfone */}
        <View
          style={StyleSheet.compose(styles.row, styles.permissionContainer)}
        >
          <View style={styles.row}>
            <Ionicons
              name="mic-circle-outline"
              color={"gray"}
              size={ICON_SIZE}
            />
            <View style={styles.permissionText}>
              <ThemedText type="subtitle">Microfone</ThemedText>
              <ThemedText>Usado para gravar áudio em vídeos.</ThemedText>
            </View>
          </View>

          {/* Switch para solicitar permissão do microfone */}
          <Switch
            trackColor={{ true: "orange" }}
            value={microphonePermissionStatus === "granted"}
            onChange={requestMicrophonePermission}
          />
        </View>

        <View style={styles.spacer} />

        {/* Contêiner da permissão da galeria (Media Library) */}
        <View
          style={StyleSheet.compose(styles.row, styles.permissionContainer)}
        >
          <Ionicons name="library-outline" color={"gray"} size={ICON_SIZE} />

          <View style={styles.permissionText}>
            <ThemedText type="subtitle">Galeria</ThemedText>
            <ThemedText>Usada para salvar, visualizar e gerenciar mídias.</ThemedText>
          </View>

          {/* Switch que solicita a permissão da galeria ao ser acionado */}
          <Switch
            trackColor={{ true: "orange" }}
            value={mediaLibraryPermission?.granted}
            onChange={async () => await requestMediaLibraryPermission()}
          />
        </View>

        <View style={styles.spacer} />
        <View style={styles.spacer} />
        <View style={styles.spacer} />

        {/* Botão circular de continuar — chama handleContinue */}
        <TouchableHighlight
          onPress={handleContinue}
          style={StyleSheet.compose(styles.row, styles.continueButton)}
        >
          <Ionicons
            name="arrow-forward-outline"
            color={"white"}
            size={ICON_SIZE}
          />
        </TouchableHighlight>
      </ThemedView>
    </>
  );
}

// Estilos da tela usando StyleSheet do React Native
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  subtitle: {
    textAlign: "center",
  },
  footnote: {
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6, // espaçamento entre itens da linha (RN 0.71+ suporta gap em alguns casos)
  },
  spacer: {
    marginVertical: 8,
  },
  permissionContainer: {
    backgroundColor: "#ffffff20",
    borderRadius: 10,
    padding: 10,
    justifyContent: "space-between",
  },
  permissionText: {
    marginLeft: 10,
    flexShrink: 1,
  },
  continueButton: {
    padding: 10,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 50,
    alignSelf: "center",
  },
}); 