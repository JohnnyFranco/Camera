import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { StyleSheet, TouchableOpacity, useColorScheme } from 'react-native';

// Componentes personalizados do projeto com tema (texto e view estilizados)
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
// Objeto de cores definidas no projeto (para temas claro/escuro)
import { Colors } from '@/constants/Colors';

// Componente Collapsible: cria uma seção expansível/recolhível
export function Collapsible({ children, title }) {
  // Estado que controla se o conteúdo está aberto ou fechado
  const [isOpen, setIsOpen] = useState(false);

  // Detecta se o tema atual é claro ou escuro, padrão é "light" se não definido
  const theme = useColorScheme() ?? 'light';

  return (
    <ThemedView>
      {/* Cabeçalho clicável que expande/recolhe o conteúdo */}
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)} // alterna o estado ao clicar
        activeOpacity={0.8} // controla opacidade no toque
      >
        {/* Ícone que muda conforme o estado (seta para baixo se aberto, para frente se fechado) */}
        <Ionicons
          name={isOpen ? 'chevron-down' : 'chevron-forward-outline'}
          size={18}
          color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
        />

        {/* Título da seção */}
        <ThemedText type="defaultSemiBold">{title}</ThemedText>
      </TouchableOpacity>

      {/* Conteúdo que só aparece se isOpen for true */}
      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
    </ThemedView>
  );
}

// Estilos locais para layout do cabeçalho e conteúdo
const styles = StyleSheet.create({
  heading: {
    flexDirection: 'row', // ícone e título lado a lado
    alignItems: 'center', // centraliza verticalmente
    gap: 6, // espaço entre ícone e título
  },
  content: {
    marginTop: 6, // espaço superior entre cabeçalho e conteúdo
    marginLeft: 24, // recuo lateral para dar hierarquia visual
  },
}); 