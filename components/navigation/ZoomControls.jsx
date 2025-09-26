// Importa componentes básicos do React Native
import {
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";

// Importa botão que detecta gestos (do pacote react-native-gesture-handler)
import { TouchableHighlight } from "react-native-gesture-handler";

// Importa animações com entrada "BounceIn" da biblioteca Reanimated
import Animated, { BounceIn } from "react-native-reanimated";

// Constantes que definem os limites do zoom
const MIN_ZOOM = 1;       // Zoom mínimo permitido
const MAX_ZOOM = 128;     // Zoom máximo permitido
const NEUTRAL_ZOOM = 1;   // Zoom neutro (sem aumento)
const zoomOptions = [1, 2, 3, 4, 5]; // Opções de zoom que serão exibidas nos botões

// Componente principal que renderiza os controles de zoom
export default function ZoomControls({
  setZoom,              // Função que altera o valor do zoom no estado pai
  setShowZoomControls,  // Função que mostra/esconde os controles de zoom
  zoom,                 // Valor atual do zoom (controlado pelo estado pai)
}) {
  // Obtém a largura e altura da tela em tempo real
  const { width, height } = useWindowDimensions();

  // Calcula o "raio" para posicionar os botões em formato circular
  const radius = Math.min(width, height - 100) * 0.35;

  // Função chamada quando o usuário pressiona um botão de zoom
  const handleZoomPress = (zoomFactor) => {
    if (zoomFactor === -1) {
      // Caso o valor seja -1, o zoom volta para o neutro
      setZoom(NEUTRAL_ZOOM);
    } else {
      // Caso contrário, calcula o novo valor de zoom respeitando os limites
      const newZoom = Math.min(Math.max(zoomFactor, MIN_ZOOM), MAX_ZOOM);
      setZoom(newZoom);
    }
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {/* Mapeia todas as opções de zoom para criar botões animados */}
      {zoomOptions.map((z, i) => {
        // Define o ângulo de cada botão em relação ao círculo
        const angle = (i / zoomOptions.length / 3) * 2 * Math.PI - Math.PI / 2;
        // Calcula posição horizontal (x) e vertical (y) do botão
        const x = Math.cos(angle) * radius + 40;
        const y = Math.sin(angle) * radius + height / 4;

        return (
          <Animated.View
            key={i} // chave única para renderização
            entering={BounceIn.delay(i * 100)} // Animação de entrada em cascata
            style={{
              position: "absolute",
              left: x,  // posição horizontal do botão
              top: y,   // posição vertical do botão
            }}
          >
            {/* Botão que define o nível de zoom */}
            <TouchableHighlight
              onPress={() => handleZoomPress(z)} // Define o zoom ao clicar
              style={{
                width: 50,
                height: 50,
                borderRadius: 25, // botão circular
                backgroundColor: zoom === z ? "#ffffff" : "#ffffff30", // Destaque se for o zoom atual
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* Texto que mostra o valor do zoom (ex: 2x, 3x) */}
              <Text
                style={{
                  color: zoom === z ? "black" : "white", // cor muda se estiver selecionado
                  fontWeight: "600",
                }}
              >
                {z}x
              </Text>
            </TouchableHighlight>
          </Animated.View>
        );
      })}

      {/* Botão "X" para fechar os controles de zoom */}
      <TouchableOpacity
        onPress={() => setShowZoomControls(false)} // Fecha o painel
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: "#ffffff30",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          left: 30,       // fixado no lado esquerdo
          top: height / 4, // alinhado verticalmente
        }}
      >
        <Text style={{ color: "white", fontWeight: "600" }}>X</Text>
      </TouchableOpacity>
    </View>
  );
} 