// O componente ThemedView é um wrapper para o componente nativo View do React Native,
// com a principal função de aplicar cores de fundo baseadas em temas (claro/escuro).

import { View, StyleSheet } from 'react-native';

// Importa o mesmo hook usado no ThemedText. Ele é responsável por determinar
// a cor a ser usada com base no tema do sistema.
import { useThemeColor } from '@/hooks/useThemeColor';

// Define o componente funcional ThemedView.
// Ele aceita as props style, lightColor, darkColor, e outras.
export function ThemedView({
  style, // Prop para estilos adicionais.
  lightColor, // Cor de fundo para o tema claro.
  darkColor, // Cor de fundo para o tema escuro.
  ...otherProps // Coleta todas as outras propriedades, como 'children' (os componentes que serão renderizados dentro dele).
}) {
  // Usa o hook useThemeColor para obter a cor de fundo apropriada.
  // Se lightColor e darkColor não forem fornecidos, ele usa a cor padrão 'background'.
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return (
    <View
      // Aplica a cor de fundo e os estilos passados.
      // O estilo dinâmico de cor de fundo vem primeiro, garantindo que os estilos
      // passados pela prop 'style' possam sobrescrevê-lo se necessário.
      style={[{ backgroundColor }, style]}
      // Repassa as outras props (como 'children', por exemplo) para o componente View nativo.
      {...otherProps}
    />
  );
}