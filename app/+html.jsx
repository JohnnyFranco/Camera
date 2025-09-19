import { ScrollViewStyleReset } from 'expo-router/html'; // Importa um componente do Expo para resetar estilos de rolagem na web

/**
 * Este arquivo é somente para a web e é usado para configurar o HTML raiz de cada página da web durante a renderização estática.
 * O conteúdo desta função só é executado em ambientes Node.js e não tem acesso ao DOM ou às APIs do navegador.
 */
export default function Root({ children }) {
  return (
    // Define a tag <html> com o idioma "en"
    <html lang="en">
      {/* Define a tag <head> */}
      <head>
        {/* Meta tags essenciais para a web */}
        <meta charSet="utf-8" /> {/* Define a codificação de caracteres */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" /> {/* Garante compatibilidade com o Internet Explorer */}
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" /> {/* Configura a visualização para dispositivos móveis */}

        {/*
          Desabilita a rolagem do corpo da página na web. Isso faz com que os componentes ScrollView funcionem de forma mais parecida com a rolagem nativa.
          No entanto, a rolagem do corpo é útil para a web móvel. Se quiser habilitá-la, remova esta linha.
        */}
        <ScrollViewStyleReset />

        {/* Usando estilos CSS puros para garantir que a cor de fundo nunca pisque no modo escuro. */}
        <style dangerouslySetInnerHTML={{ __html: responsiveBackground }} /> {/* Injeta o CSS definido abaixo */}
        {/* Adicione quaisquer outros elementos <head> que você queira globalmente disponíveis na web... */}
      </head>
      {/* Define a tag <body> */}
      <body>{children}</body> {/* Renderiza o conteúdo do seu aplicativo dentro do corpo da página */}
    </html>
  );
}

// Estilos CSS que respondem ao esquema de cores do sistema
const responsiveBackground = `
body {
  background-color: #fff; /* Fundo branco por padrão */
}
@media (prefers-color-scheme: dark) {
  body {
    background-color: #000; /* Fundo preto se o modo escuro estiver ativado */
  }
}`;