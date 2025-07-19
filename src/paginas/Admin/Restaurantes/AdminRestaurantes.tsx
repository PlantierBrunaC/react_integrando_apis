import { useEffect, useState } from "react";
import IRestaurante from "../../../interfaces/IRestaurante";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Container,
  Button
} from "@mui/material";
import axios from "axios";
import { Link, Link as RouterLink } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';



const AdminRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

  useEffect(() => {
    axios.get<IRestaurante[]>("http://localhost:8000/api/v2/restaurantes/")
      .then(response => {
        setRestaurantes(response.data)
      })
      .catch(error => {
        console.log(error)
      })

  }, [])

  return (
    <>
    
      <Box>

        {/* HEADER COM FUNDO CINZA CLARO */}
      <Box sx={{ backgroundColor: '#d5f0d6', py: 3, mb: 4 }}>
          <Container maxWidth="lg">
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ fontWeight: 'bold', textAlign: 'center', color: '#273b27' }}
            >
              Administração dos Restaurantes - Alfood
            </Typography>
          </Container>
        </Box>

         {/* BOTÃO DE CADASTRAR NOVO RESTAURANTE */}
        <Container maxWidth="lg" sx={{ mb: 3 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Cadastrar novo restaurante</Typography>
            <Button
              variant="contained"
              component={RouterLink}
              sx={{
        backgroundColor: '#ffffff',
        color: '#273b27',
        '&:hover': {
          backgroundColor: '#e0e0e0'
        }
      }}
              to="/admin/restaurantes/novo"
            >
              Cadastrar
            </Button>
          </Box>
        </Container>

        {/* TABELA CENTRALIZADA COM MAIOR LARGURA */}
        <Container maxWidth="lg">

          {/* <h1>Admin Restaurantes</h1> */}
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Editar</TableCell>
                  <TableCell>Deletar</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {restaurantes.map(restaurante =>
                  <TableRow key={restaurante.id}>
                    <TableCell>{restaurante.nome}</TableCell>
                    <TableCell>
                      <IconButton
                        component={RouterLink}
                        to={`/admin/restaurantes/${restaurante.id}`}
                        aria-label="edit"
                        sx={{
                          backgroundColor: 'transparent',
                          '&:hover': {
                            backgroundColor: 'primary.dark',
                            '& svg': {
                              color: '#fff',
                            },
                          },
                        }}
                      >
                        <EditIcon sx={{ fontSize: 32, color: 'primary.main' }} />
                      </IconButton>
                    </TableCell>

                    {/* <TableCell>
                      [ <Link to={`/admin/restaurantes/${restaurante.id}`}>
                          <IconButton aria-label="edit">
                              <EditIcon />
                          </IconButton>
                          Editar</Link> ]
                    </TableCell> */}

                    <TableCell>
                      <IconButton
                        aria-label="delete"
                        sx={{
                          backgroundColor: 'transparent',
                          '&:hover': {
                            backgroundColor: 'error.dark',
                            '& svg': {
                              color: '#fff', // torna o ícone branco no hover
                            }
                          }
                        }}
                      >
                        <DeleteIcon sx={{ fontSize: 32, color: 'error.main' }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Box>


    </>
  )
}
export default AdminRestaurantes;
