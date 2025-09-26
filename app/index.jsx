import * as React from "react";
import {
  StyleSheet,
  Platform,
  View,
  SafeAreaView,
  StatusBar,
  TouchableHighlight,
  Linking,
  Text,
} from "react-native";
import {
  Camera,
  useCameraDevice,
  useCameraDevices,
  useCameraPermission,
} from "react-native-vision-camera";
import { Redirect, useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import ObscuraButton from "@/components/ObscuraButton";
import { FontAwesome5 } from "@expo/vector-icons";
import ZoomControls from "@/components/ZoomControls";
import { BlurView } from "expo-blur";
import ExposureControls from "@/components/ExposureControls";

// Tela principal (Home) do app — controla a câmera, UI e ações rápidas
export default function HomeScreen() {
  // Verifica se o app já tem permissão de câmera
  const { hasPermission } = useCameraPermission();

  // Consulta o status da permissão do microfone (sincrono)
  const microphonePermission = Camera.getMicrophonePermissionStatus();

  // Controles locais para mostrar/ocultar painéis de zoom/exposição
  const [showZoomControls, setShowZoomControls] = React.useState(false);
  const [showExposureControls, setShowExposureControls] = React.useState(false);

  // Ref para a instância da câmera (usada para tirar foto)
  const camera = React.useRef(null);

  // Hook que retorna todos os dispositivos de câmera disponíveis
  const devices = useCameraDevices();

  // Estado que controla posição da câmera ('back' ou 'front')
  const [cameraPosition, setCameraPosition] = React.useState("back");

  // Seleciona o device atual com base na posição escolhida
  const device = useCameraDevice(cameraPosition);

  // Zoom inicial — tenta usar o valor neutro do device (se disponível)
  const [zoom, setZoom] = React.useState(device?.neutralZoom);

  // Exposição (EV) atual
  const [exposure, setExposure] = React.useState(0);

  // Estado de flash/torch (lanterna)
  const [flash, setFlash] = React.useState("off");
  const [torch, setTorch] = React.useState("off");

  // Se não há permissão de câmera ou microfone então redireciona para tela de permissões
  const redirectToPermissions =
    !hasPermission || microphonePermission === "not-determined";

  const router = useRouter();

  // Função para capturar foto usando a ref da câmera
  const takePicture = async () => {
    try {
      if (camera.current == null) throw new Error("Camera ref is null!");

      console.log("Taking photo...");
      const photo = await camera.current.takePhoto({
        flash: flash,
        enableShutterSound: false,
      });

      // Navega para a tela /media passando o caminho da foto e o tipo
      router.push({
        pathname: "/media",
        params: { media: photo.path, type: "photo" },
      });
      // Se quiser processar a foto diretamente, pode chamar onMediaCaptured(photo, 'photo') aqui
    } catch (e) {
      console.error("Failed to take photo!", e);
    }
  };

  // Se precisamos redirecionar para permissões, retorna um Redirect (expo-router)
  if (redirectToPermissions) return <Redirect href={"/permissions"} />;

  // Se o device ainda não foi carregado (hook useCameraDevice), renderiza vazio
  if (!device) return <></>;

  return (
    <>
      {/* Barra de status com conteúdo claro (ícones brancos) */}
      <StatusBar barStyle={"light-content"} />

      {/* SafeAreaView para respeitar áreas seguras (notch, barra de navegação) */}
      <SafeAreaView style={styles.container}>
        {/* Área da câmera */}
        <View style={{ flex: 2, borderRadius: 10, overflow: "hidden" }}>
          <Camera
            ref={camera}
            style={{ flex: 1 }}
            photo={true}
            zoom={zoom}
            device={device!} // non-null assertion — device está garantido por checagem anterior
            isActive={true}
            resizeMode="cover"
            preview={true}
            exposure={exposure}
            torch={torch}
            // fps={60} // pode habilitar se o device suportar
          />

          {/* Overlay com blur que mostra valores atuais de exposição e zoom */}
          <BlurView
            intensity={100}
            tint="dark"
            style={{
              flex: 1,
              position: "absolute",
              bottom: 0,
              right: 0,
              padding: 10,
            }}
            experimentalBlurMethod="dimezisBlurView"
          >
            <Text style={{ color: "white" }}>
              Exposure: {exposure} | Zoom: x{zoom}
            </Text>
          </BlurView>
        </View>

        {/* Seções condicionais: quando mostrar controles de zoom/exposição ou a UI padrão */}
        {showZoomControls ? (
          <ZoomControls
            setZoom={setZoom}
            setShowZoomControls={setShowZoomControls}
            zoom={zoom ?? 1}
          />
        ) : showExposureControls ? (
          <ExposureControls
            setExposure={setExposure}
            setShowExposureControls={setShowExposureControls}
            exposure={exposure}
          />
        ) : (
          // UI padrão com informações do device e botões
          <View style={{ flex: 1, padding: 10 }}>
            {/* Seção superior: mostra alguns metadados do device */}
            <View style={{ flex: 0.7 }}>
              <ThemedText>Max FPS: {device.formats[0].maxFps}</ThemedText>
              <ThemedText>
                Width: {device.formats[0].photoWidth} Height: {device.formats[0].photoHeight}
              </ThemedText>
              <ThemedText>Camera: {device.name}</ThemedText>
            </View>

            {/* Seção do meio: botões de ação rápida */}
            <View style={{ flex: 0.7, flexDirection: "row", justifyContent: "space-evenly" }}>
              {/* Botão para ligar/desligar a lanterna (torch) */}
              <ObscuraButton
                iconName={torch === "on" ? "flashlight" : "flashlight-outline"}
                onPress={() => setTorch((t) => (t === "off" ? "on" : "off"))}
                containerStyle={{ alignSelf: "center" }}
              />

              {/* Botão para alternar o modo de flash ao tirar foto */}
              <ObscuraButton
                iconName={flash === "on" ? "flash-outline" : "flash-off-outline"}
                onPress={() => setFlash((f) => (f === "off" ? "on" : "off"))}
                containerStyle={{ alignSelf: "center" }}
              />

              {/* Botão para alternar câmera frontal/traseira */}
              <ObscuraButton
                iconName="camera-reverse-outline"
                onPress={() => setCameraPosition((p) => (p === "back" ? "front" : "back"))}
                containerStyle={{ alignSelf: "center" }}
              />

              {/* Botão para abrir a galeria (link específico por plataforma) */}
              <ObscuraButton
                iconName="image-outline"
                onPress={() => {
                  const link = Platform.select({
                    ios: "photos-redirect://",
                    android: "content://media/external/images/media",
                  });
                  // Abre o app/URI da galeria do sistema
                  Linking.openURL(link!);
                }}
                containerStyle={{ alignSelf: "center" }}
              />

              {/* Botão que navega para a rota de configurações/mapa do app */}
              <ObscuraButton
                iconName="settings-outline"
                onPress={() => router.push("/_sitemap")}
                containerStyle={{ alignSelf: "center" }}
              />
            </View>

            {/* Seção inferior: controle de zoom/exposição e botão de captura */}
            <View style={{ flex: 1.1, flexDirection: "row", justifyContent: "space-evenly", alignItems: "center" }}>
              <ObscuraButton
                iconSize={40}
                title="+/-"
                onPress={() => setShowZoomControls((s) => !s)}
                containerStyle={{ alignSelf: "center" }}
              />

              {/* Botão principal de captura (ícone grande) */}
              <TouchableHighlight onPress={takePicture}>
                <FontAwesome5 name="dot-circle" size={55} color={"white"} />
              </TouchableHighlight>

              <ObscuraButton
                iconSize={40}
                title="1x"
                onPress={() => setShowExposureControls((s) => !s)}
                containerStyle={{ alignSelf: "center" }}
              />
            </View>
          </View>
        )}
      </SafeAreaView>
    </>
  );
}

// Estilos locais do componente
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Em Android adiciona espaço superior equivalente à altura da StatusBar
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
 