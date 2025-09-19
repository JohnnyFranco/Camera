import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router"; // Importa hooks e componentes de navegação do Expo Router
import { Alert, Image, StyleSheet } from "react-native"; // Importa componentes nativos do React Native

import { ThemedText } from "@/components/ThemedText"; // Componente de texto que se adapta a temas
import { ThemedView } from "@/components/ThemedView"; // Componente de view que se adapta a temas
import ObscuraButton from "@/components/ObscuraButton"; // Componente de botão personalizado
import { saveToLibraryAsync } from "expo-media-library"; // Função do Expo para salvar arquivos na galeria

export default function MediaScreen() {
  // `useLocalSearchParams` pega os parâmetros passados para a rota.
  // Aqui, ele desestrutura os parâmetros `media` (o URI do arquivo) e `type` (o tipo de arquivo, ex: 'photo').
  const { media, type } = useLocalSearchParams();
  // `useRouter` retorna um objeto que permite controlar a navegação programaticamente.
  const router = useRouter();

  // Exibe os parâmetros no console para depuração
  console.log(media, type);

  return (
    // 'ThemedView' é um contêiner que ajusta sua cor de fundo com base no tema.
    <ThemedView style={styles.container}>
      {
        // Renderização condicional:
        // Se o tipo for "photo", exibe uma imagem.
        type === "photo" ? (
          // O componente 'Image' renderiza a imagem usando o URI do arquivo.
          // O prefixo `file://` é crucial para URIs de arquivos locais.
          <Image
            source={{ uri: `file://${media}` }}
            style={{ width: "100%", height: "80%", resizeMode: "contain" }}
          />
        ) : null
        // A linha abaixo está comentada, mas sugere que um componente de vídeo poderia ser renderizado se o tipo fosse diferente.
        // <Video source={{ uri: media }} style={{ width: "100%", height: "100%" }} />
      }
      {/* Botão para salvar o arquivo na galeria. */}
      <ObscuraButton
        title="Save to gallery"
        containerStyle={{ alignSelf: "center" }}
        onPress={async () => {
          // Salva o arquivo na biblioteca de mídia do dispositivo
          saveToLibraryAsync(media);
          // Exibe um alerta de sucesso
          Alert.alert("Saved to gallery!");
          // Navega de volta para a tela anterior
          router.back();
        }}
      />
      {/* Link para apagar o arquivo e voltar para a tela inicial. */}
      <Link href="/" style={styles.link}>
        <ThemedText type="link">Delete and go back</ThemedText>
      </Link>
    </ThemedView>
  );
}

// Objeto de estilos usando StyleSheet para melhor organização e desempenho
const styles = StyleSheet.create({
  container: {
    flex: 1, // Faz com que o contêiner ocupe todo o espaço disponível
    padding: 20, // Adiciona um espaçamento interno de 20 pixels
  },
  link: {
    marginTop: 15, // Adiciona uma margem superior de 15 pixels
    paddingVertical: 15, // Adiciona um espaçamento vertical de 15 pixels
    alignSelf: "center", // Centraliza o próprio componente horizontalmente
  },
});