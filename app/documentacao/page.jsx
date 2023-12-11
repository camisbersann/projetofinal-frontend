import styles from "./documentacao.module.css";
import { Header } from "../components/header/Header";
import Footer from "../components/footer/Footer";

export default function Documentacao() {
  return (
    <div className={styles.all}>
      <Header />
      <h1 className={styles.title}>Documentação API DevTravel</h1>

      <div>
        <div className={styles.container}>
          <div className={styles.content}>

            <h2 className={styles.c2}>Conteúdo</h2>


          </div>

          <div className={styles.allText}>
            <h2 className={styles.h2}>Introduçao Viagens DevTravel</h2>


            <p className={styles.text}>

              Bem-vindo à API de Viagens DevTravel,
              sua fonte confiável para informações abrangentes sobre destinos de viagem emocionantes.
              Explore os detalhes de diversos locais, desde estados até cidades encantadoras,
              e mergulhe em uma experiência completa antes mesmo de fazer as malas.
            </p>
            <h1 className={styles.h2}>Estado</h1>

            <h2 className={styles.text}>

              <p className={styles.text}>
                A seção de estados oferece uma visão geral das diferentes regiões do país. Descubra fatos interessantes, dados geográficos e uma breve descrição de cada estado.
              </p>
              <h1 className={styles.h2}>Regioes</h1>

              <p className={styles.text}>
                Explore as regiões que compõem este vasto país, cada uma com suas próprias características distintas. Desde praias exuberantes até montanhas majestosas, a DevTravel fornece insights detalhados sobre o que torna cada região única.
              </p>


              <h1 className={styles.h2}>Área</h1>

              <p className={styles.text}>
                Detalhes específicos sobre a área de cada estado estão disponíveis nesta seção. Saiba mais sobre a extensão territorial e descubra áreas de destaque que merecem sua atenção.
              </p>


              <h1 className={styles.h2}>Cidades</h1>

              <p className={styles.text}>
                Aprofunde-se nas cidades mais notáveis de cada estado. Encontre informações sobre a história, cultura, atrações turísticas e eventos especiais que tornam cada cidade especial.
              </p>


              <h1 className={styles.h2}>Populuçoes e Habitantes</h1>

              <p className={styles.text}>
                Descubra dados demográficos interessantes, incluindo a população total de cada estado e informações sobre os habitantes locais. Conheça as comunidades que contribuem para a riqueza cultural de cada região.
              </p>


              <h1 className={styles.h2}>Imagem do Local</h1>

              <p className={styles.text}>
                Visualize a beleza única de cada estado por meio de imagens deslumbrantes. De paisagens naturais a marcos arquitetônicos, nossas imagens proporcionam uma prévia envolvente do que você pode esperar ao explorar esse destino.
              </p>


            </h2>

            <h2 className={styles.h2}>Experiência DevTravel</h2>

            <h3>Roteiros Recomendados</h3>
            <p className={styles.text}>
              Oferecemos roteiros de viagem cuidadosamente elaborados para otimizar sua experiência. Seja você um aventureiro em busca de emoções ou um amante da cultura, nossos roteiros atendem a todos os gostos.
            </p>


            <h2 className={styles.h2}>Gastronomia Local</h2>

            <p className={styles.text}>
              Descubra a riqueza da culinária local em cada estado. Recomendações de restaurantes, pratos típicos e experiências gastronômicas inesquecíveis esperam por você.

            </p>


            <h2 className={styles.h2}>Atividades e Atraçoes</h2>

            <p className={styles.text}>
              Envolva-se em uma variedade de atividades emocionantes, desde trilhas naturais e passeios históricos até eventos culturais locais. Encontre atrações imperdíveis em cada cidade.
            </p>


            <h2 className={styles.h2}>Hospedagem</h2>

            <p className={styles.text}>
              Encontre opções de hospedagem que atendam às suas necessidades, desde hotéis luxuosos até aconchegantes pousadas locais. Avaliações e recomendações ajudarão você a escolher a estadia perfeita.
            </p>


            <h2 className={styles.h2}>Planege sua viagem</h2>
            <h3>Clima e Melhor Época para Visitar</h3>

            <p className={styles.text}>
              Obtenha informações sobre o clima de cada região e descubra a melhor época para visitar, garantindo que sua viagem seja uma experiência agradável.
            </p>


            <h2 className={styles.h2}>Hospedagem</h2>
            <h3>Dicas de viagem</h3>

            <p className={styles.text}>
              Explore dicas úteis para viajantes, desde informações práticas até conselhos locais. Esteja preparado para aproveitar ao máximo sua jornada
            </p>


            <h2 className={styles.h2}>Guia de viagem</h2>

            <h3 className={styles.text}>
              Descubra fatos interessantes sobre cada estado, desde dados geográficos até informações históricas. Saiba mais sobre a cultura e a população local para obter uma visão geral completa de cada destino.
              Baixe nosso guia de viagem abrangente para obter informações offline durante sua aventura. Mapas, recomendações e detalhes essenciais à distância de um clique.

              Sinta-se à vontade para explorar nossa API de Viagens DevTravel e transforme seus planos de viagem em uma jornada extraordinária!
            </h3>
          </div>

        </div>
        <a href="#" className={styles.top}>Back to Top &#8593;</a>
      </div>

      <Footer />

    </div>
  );
}
