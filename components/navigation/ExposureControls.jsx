import React from "react";
import {
  Platform,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import Animated, { BounceIn } from "react-native-reanimated";

// Opções de exposição para Android e iOS
// Valores diferentes por plataforma, pois os dispositivos usam escalas distintas
const exposureOptionsAndroid = [-10, -5, 0, 5, 10];
const exposureOptionsIOS = [-2, -1, 0, 1, 2];

// Define quais valores usar conforme o sistema operacional
const exposureOptions =
  Platform.OS === "android" ? exposureOptionsAndroid : exposureOptionsIOS;

// Componente principal: controles de exposição da câmera
export default function ExposureControls({
  setExposure, // função recebida via props para atualizar o valor de exposição
  setShowExposureControls, // função para esconder/mostrar os controles
  exposure, // valor atual de exposição selecionado
}) {
  // Hook que fornece dimensões da tela em tempo real
  const { width, height } = useWindowDimensions();

  // Calcula o raio usado para posicionar os botões de exposição em forma de arco
  const radius = Math.min(width, height - 100) * 0.35;

  // Função que define o valor de exposição ao clicar em um botão
  const handleExposurePress = (exposureValue) => {
    setExposure(exposureValue);
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {/* Renderiza os botões de exposição dinamicamente a partir da lista de opções */}
      {exposureOptions.map((exp, i) => {
        // Calcula a posição (x, y) do botão baseado no ângulo do arco
        const angle =
          (i / exposureOptions.length / 3) * 2 * Math.PI - Math.PI / 2;
        const x = width - Math.cos(angle) * radius - 90; // ajusta para alinhar à direita
        const y = Math.sin(angle) * radius + height / 4;

        return (
          <Animated.View
            key={i}
            // BounceIn com delay para criar efeito de entrada animada
            entering={BounceIn.delay(i * 100)}
            style={{
              position: "absolute",
              left: x,
              top: y,
            }}
          >
            {/* Botão circular com valor da exposição */}
            <TouchableHighlight
              onPress={() => handleExposurePress(exp)}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: exposure === exp ? "#ffffff" : "#ffffff30",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* Texto do valor de exposição (+ ou -) */}
              <Text
                style={{
                  color: exposure === exp ? "black" : "white",
                  fontWeight: "600",
                }}
              >
                {exp > 0 ? `+${exp}` : exp}
              </Text>
            </TouchableHighlight>
          </Animated.View>
        );
      })}

      {/* Botão para fechar os controles de exposição */}
      <TouchableOpacity
        onPress={() => setShowExposureControls(false)}
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: "#ffffff30",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          right: 30,
          top: height / 4,
        }}
      >
        <Text style={{ color: "white", fontWeight: "600" }}>X</Text>
      </TouchableOpacity>
    </View>
  );
}