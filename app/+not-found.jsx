import { Link, Stack } from 'expo-router'; // Importa Link para navegação e Stack para a configuração da tela
import { StyleSheet } from 'react-native'; // Importa StyleSheet para estilização

import { ThemedText } from '@/components/ThemedText'; // Componente de texto que se adapta a temas (claro/escuro)
import { ThemedView } from '@/components/ThemedView'; // Componente de view (contêiner) que se adapta a temas

// Componente principal para a tela de 'Não Encontrado'
export default function NotFoundScreen() {
  return (
    // Usa um Fragmento (<>) para agrupar múltiplos componentes sem um contêiner extra
    <>
      {/* 'Stack.Screen' é usado aqui para configurar opções de navegação para esta tela.
        'title: "Oops!"' define o título que aparecerá no cabeçalho da navegação.
      */}
      <Stack.Screen options={{ title: 'Oops!' }} />
      
      {/* 'ThemedView' é um contêiner que ajusta sua cor de fundo com base no tema.
        Ele aplica o estilo definido em `styles.container`.
      */}
      <ThemedView style={styles.container}>
        {/*
          'ThemedText' é um componente de texto que ajusta sua cor com base no tema.
          'type="title"' sugere que ele tem um estilo de fonte maior, como um título.
        */}
        <ThemedText type="title">This screen doesn't exist.</ThemedText>
        
        {/*
          'Link' cria um link navegável. Quando pressionado, ele navega para a URL especificada em 'href'.
          'href="/"' aponta para a rota inicial do aplicativo.
        */}
        <Link href="/" style={styles.link}>
          {/* O texto do link, também temático, com um estilo específico para links */}
          <ThemedText type="link">Go to home screen!</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

// Objeto de estilos usando StyleSheet.create para melhor performance
const styles = StyleSheet.create({
  container: {
    flex: 1, // Faz com que o contêiner ocupe todo o espaço disponível
    alignItems: 'center', // Centraliza o conteúdo horizontalmente
    justifyContent: 'center', // Centraliza o conteúdo verticalmente
    padding: 20, // Adiciona um preenchimento de 20 pixels em todos os lados
  },
  link: {
    marginTop: 15, // Adiciona uma margem superior de 15 pixels
    paddingVertical: 15, // Adiciona um preenchimento vertical de 15 pixels
  },
});