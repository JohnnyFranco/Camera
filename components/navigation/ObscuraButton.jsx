import { ComponentProps } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { Colors } from "@/constants/Colors";

// Componente de botão reutilizável do app
export default function ObscuraButton({
  onPress, // função a ser executada quando o botão for pressionado
  iconName, // nome do ícone (opcional) da biblioteca Ionicons
  title, // texto do botão (opcional)
  containerStyle, // estilo adicional que pode ser passado pelo pai
  iconSize, // tamanho do ícone (opcional, default é 28)
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container, // estilos base definidos abaixo
        {
          backgroundColor: Colors.dark.background, // cor de fundo do botão
          borderRadius: title ? 6 : 40, // se houver título, borda arredondada menor; se não, botão mais circular
          alignSelf: "flex-start", // alinha o botão à esquerda
        },
        containerStyle, // aplica estilos extras passados por props
      ]}
    >
      {/* Renderiza o ícone se "iconName" for passado */}
      {iconName && (
        <Ionicons name={iconName} size={iconSize ?? 28} color={"white"} />
      )}

      {/* Renderiza o texto se "title" for passado */}
      {title ? (
        <Text
          style={{
            fontSize: 14,
            fontWeight: "600",
            color: "white",
          }}
        >
          {title}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
}

// Estilos básicos do botão
const styles = StyleSheet.create({
  container: {
    padding: 7, // espaçamento interno
    borderRadius: 40, // deixa o botão circular por padrão
    flexDirection: "row", // ícone e texto lado a lado
    alignItems: "center", // centraliza verticalmente
    gap: 7, // espaçamento entre ícone e texto
  },
});