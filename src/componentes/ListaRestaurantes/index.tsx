import { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import axios from 'axios';
import { IPaginacao } from '../../interfaces/IPaginacao';
import IPrato from '../../interfaces/IPrato';

// ✅ Importação dos componentes e ícones do Material UI
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  //Const mesmaPagina está carregando os restaurantes paginados na mesma tela do usuário
  const [mesmaPagina, setMesmaPagina] = useState('')
  // funções abaixo são para calcular o total de paginas consultando a API de restaurantes e para paginar
  const restaurantesPorPagina = 6;
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [paginasAcumuladas, setPaginasAcumuladas] = useState<IRestaurante[][]>([]);
  const [paginaAtualExibida, setPaginaAtualExibida] = useState(0);

  // Código remoção do código chumbado, substituido por API 
  // const restaurantes: IRestaurante[] = [
  //   {
  //     id: 1,
  //     nome: "Lyllys Cafe",
  //     pratos: [
  //       {
  //         id: 1,
  //         descricao: 'Lasanha à Bolonhesa',
  //         imagem: 'https://receitassaborosa.com/wp-content/uploads/2019/12/Lasanha-com-Molho-a-Bolonhesa.jpg',
  //         nome: 'Lasanha',
  //         restaurante: 1,
  //         tag: 'Italiana'
  //       },
  //       {
  //         id: 2,
  //         descricao: 'Strogonoff de Frango à brasileira',
  //         imagem: 'https://img.itdg.com.br/images/recipes/000/002/462/332854/332854_original.jpg',
  //         nome: 'Strogonoff',
  //         restaurante: 1,
  //         tag: 'Russa'
  //       },
  //       {
  //         id: 3,
  //         descricao: 'Empadão de Frango',
  //         imagem: 'https://t1.uc.ltmcdn.com/pt/images/5/7/1/img_como_fazer_empadao_de_frango_27175_600.jpg',
  //         nome: 'Empadão de Frango',
  //         restaurante: 1,
  //         tag: 'Portuguesa'
  //       }
  //     ]
  //   },
  //   {
  //     id: 2,
  //     nome: "Sugiro Sushi",
  //     pratos: [
  //       {
  //         id: 1,
  //         descricao: 'Combinado de 8 peças',
  //         imagem: 'https://www.sabornamesa.com.br/media/k2/items/cache/5031e263a4a258791d6306b2d3d9dbf6_XL.jpg',
  //         nome: 'Sushi',
  //         restaurante: 1,
  //         tag: 'Japonesa'
  //       },
  //       {
  //         id: 2,
  //         descricao: 'Sashimi de Salmão',
  //         imagem: 'https://www.comidaereceitas.com.br/img/sizeswp/1200x675/2009/04/sashimi_facil.jpg',
  //         nome: 'Sashimi',
  //         restaurante: 1,
  //         tag: 'Japonesa'
  //       }
  //     ]
  //   },
  //   {
  //     id: 3,
  //     nome: "Cantina da Escola",
  //     pratos: [
  //       {
  //         id: 1,
  //         descricao: 'Salgado de queijo com presunto',
  //         imagem: 'https://img.itdg.com.br/tdg/images/recipes/000/102/312/279767/279767_original.jpg',
  //         nome: 'Quejunto',
  //         restaurante: 1,
  //         tag: 'Lanche'
  //       },
  //       {
  //         id: 2,
  //         descricao: 'Coxinha de Frango',
  //         imagem: 'https://t1.rg.ltmcdn.com/pt/posts/1/9/1/coxinha_simples_191_600.jpg',
  //         nome: 'Coxinha',
  //         restaurante: 1,
  //         tag: 'Lanche'
  //       },
  //       {
  //         id: 3,
  //         descricao: 'Risole de Palmito',
  //         imagem: 'https://img.itdg.com.br/tdg/images/recipes/000/005/116/323871/323871_original.jpg',
  //         nome: 'Risole',
  //         restaurante: 1,
  //         tag: 'Lanche'
  //       }
  //     ]
  //   }
  // ]

  useEffect(() => {
    //Obter os restaurantes
    axios.get<IPaginacao<IRestaurante>>('http://localhost:8000/api/v1/restaurantes/')
      .then(response => {
        const listaRestaurantes = response.data.results

        // setRestaurantes(response.data.results)
        // SUBSTITUIDO POR PAGINAÇÃO DOS RESTAURANTES
        // setMesmaPagina(response.data.next)
        //console.log(response)
        setMesmaPagina(response.data.next);
        setTotalPaginas(Math.ceil(response.data.count / restaurantesPorPagina));

        axios.get<IPaginacao<IPrato>>('http://localhost:8000/api/v1/pratos/')
          .then(responsePrato => {
            const pratos = responsePrato.data.results

            //Relaciona os pratos ao restaurante
            const restaurantesComPratos = listaRestaurantes.map(rest => ({
              ...rest,
              pratos: pratos.filter(p => p.restaurante === rest.id)
            }))

            setRestaurantes(restaurantesComPratos)

            const paginasAgrupadas: IRestaurante[][] = [];

            for (let i = 0; i < restaurantesComPratos.length; i += restaurantesPorPagina) {
              paginasAgrupadas.push(restaurantesComPratos.slice(i, i + restaurantesPorPagina));
            }

            setPaginasAcumuladas(paginasAgrupadas);

          })
          .catch(error => {
            console.log("Erro ao carregar pratos" + error)
          })
      })
      .catch(error => {
        console.log(error)
      })
  }, [])



  
const nextPage = () => {
  axios.get<IPaginacao<IRestaurante>>(mesmaPagina)
    .then(response => {
      const novosRestaurantes = response.data.results;
      const todosRestaurantes = [...restaurantes, ...novosRestaurantes];

      setRestaurantes(todosRestaurantes);
      setMesmaPagina(response.data.next);
      setTotalPaginas(Math.ceil(response.data.count / restaurantesPorPagina));

      axios.get<IPaginacao<IPrato>>('http://localhost:8000/api/v1/pratos/')
        .then(responsePrato => {
          const pratos = responsePrato.data.results;

          const todosComPratos = todosRestaurantes.map(rest => ({
            ...rest,
            pratos: pratos.filter(p => p.restaurante === rest.id)
          }));

          const novasPaginasAgrupadas: IRestaurante[][] = [];

          for (let i = 0; i < todosComPratos.length; i += restaurantesPorPagina) {
            novasPaginasAgrupadas.push(todosComPratos.slice(i, i + restaurantesPorPagina));
          }

          setPaginasAcumuladas(novasPaginasAgrupadas);

          // ✅ Exibir a nova página automaticamente
          setPaginaAtualExibida((prev) => prev + 1);
        });
    })
    .catch(error => {
      console.log(error);
    });
};



  return (
    <section className={style.ListaRestaurantes}>
      <Typography variant="h4" component="h1" gutterBottom>
        Os restaurantes mais <em>bacanas</em>!
      </Typography>

      {paginasAcumuladas[paginaAtualExibida]?.map(item => (
        <Restaurante restaurante={item} key={item.id} />
      ))}

      {mesmaPagina && (
        <Button
          variant="outlined"
          color="secondary"
          onClick={nextPage}
          startIcon={<RestaurantIcon />}
          sx={{ mt: 2 }}
        >
          Ver mais restaurantes
        </Button>
      )}

      <Typography sx={{ mt: 4 }}>Páginas: {totalPaginas}</Typography>

      <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setPaginaAtualExibida(paginaAtualExibida - 1)}
          disabled={paginaAtualExibida === 0}
          startIcon={<ArrowBackIcon />}
        >
          Página Anterior
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={() => setPaginaAtualExibida(paginaAtualExibida + 1)}
          disabled={paginaAtualExibida >= totalPaginas - 1}
          endIcon={<ArrowForwardIcon />}
        >
          Próxima Página
        </Button>
      </Stack>
    </section>
  )
}

export default ListaRestaurantes;
