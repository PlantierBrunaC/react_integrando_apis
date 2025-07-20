import { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import axios from 'axios';
import { IPaginacao } from '../../interfaces/IPaginacao';
import IPrato from '../../interfaces/IPrato';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { IconButton, TextField, Box } from '@mui/material';

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [mesmaPagina, setMesmaPagina] = useState('');
  const restaurantesPorPagina = 6;
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [paginasAcumuladas, setPaginasAcumuladas] = useState<IRestaurante[][]>([]);
  const [paginaAtualExibida, setPaginaAtualExibida] = useState(0);
  const [busca, setBusca] = useState('');
  const [limparFiltroAtivado, setLimparFiltroAtivado] = useState(false);

  useEffect(() => {
    buscarRestaurantes();
  }, [busca]);

  const buscarRestaurantes = () => {
    axios.get<IPaginacao<IRestaurante>>('http://localhost:8000/api/v1/restaurantes/', {
      params: {
        ordering: 'nome',
        search: busca
      }
    })
    .then(response => {
      const listaRestaurantes = response.data.results;
      setMesmaPagina(response.data.next);
      setTotalPaginas(Math.ceil(response.data.count / restaurantesPorPagina));

      axios.get<IPaginacao<IPrato>>('http://localhost:8000/api/v1/pratos/')
        .then(responsePrato => {
          const pratos = responsePrato.data.results;

          const restaurantesComPratos = listaRestaurantes.map(rest => ({
            ...rest,
            pratos: pratos.filter(p => p.restaurante === rest.id)
          }));

          setRestaurantes(restaurantesComPratos);

          const paginasAgrupadas: IRestaurante[][] = [];
          for (let i = 0; i < restaurantesComPratos.length; i += restaurantesPorPagina) {
            paginasAgrupadas.push(restaurantesComPratos.slice(i, i + restaurantesPorPagina));
          }

          setPaginasAcumuladas(paginasAgrupadas);
          setPaginaAtualExibida(0);
        })
        .catch(error => console.log("Erro ao carregar pratos " + error));
    })
    .catch(error => console.log(error));
  };

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
            setPaginaAtualExibida((prev) => prev + 1);
          });
      })
      .catch(error => console.log(error));
  };

  const limparBusca = () => {
    setBusca('');
    setPaginaAtualExibida(0);
    setLimparFiltroAtivado(true);
  };

  return (
    <section className={style.ListaRestaurantes}>
      <Typography variant="h4" component="h1" gutterBottom>
        Os restaurantes mais <em>bacanas</em> !
      </Typography>

      <Box sx={{ backgroundColor: '#f5f5f5', p: 2, mb: 2, borderRadius: 1 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Busque seu restaurante favorito
        </Typography>
        <Box display="flex" alignItems="center">
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Buscar restaurante"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') buscarRestaurantes();
            }}
          />
          <IconButton color="primary" onClick={buscarRestaurantes} sx={{ ml: 1 }}>
            <RestaurantIcon />
          </IconButton>
        </Box>
      </Box>

      {paginasAcumuladas[paginaAtualExibida]?.length > 0 ? (
        paginasAcumuladas[paginaAtualExibida].map(item => (
          <Restaurante restaurante={item} key={item.id} />
        ))
      ) : (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="body1" gutterBottom>Nenhum restaurante localizado.</Typography>
          <Button onClick={limparBusca} variant="outlined">Limpar filtro</Button>
        </Box>
      )}

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
  );
};

export default ListaRestaurantes;
