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
import HeaderAdmin from "../../../componentes/HeaderAdmin";
import http from "../../../http";


const AdminRestaurantes = () => {

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    useEffect(() => {
        http.get<IRestaurante[]>("restaurantes/")
            .then(response => {
                setRestaurantes(response.data)
            })
            .catch(error => {
                console.log(error)
            })

    }, [])

    const deletar = (restauranteASerDeletado: IRestaurante) => {
        http.delete(`restaurantes/${restauranteASerDeletado.id}/`)
            .then(() => {
                const listaDeRestaurantes = restaurantes.filter(restaurante => restaurante.id !== restauranteASerDeletado.id)
                setRestaurantes([...listaDeRestaurantes])
                alert("Restaurante deletado com sucesso!")
            }
            )

    }

    return (
        <>


            <Box>

                <HeaderAdmin
                    titulo="Administração dos Restaurantes - Alfood"
                    subtitulo="Restaurantes" />

                {/* BOTÃO DE CADASTRAR NOVO RESTAURANTE */}
                <Container maxWidth="lg" sx={{ mb: 3 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">Cadastrar novo restaurante</Typography>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: '#273b27', '&:hover': { backgroundColor: '#1e2e1e' } }}
                            component={RouterLink}
                            to="/admin/restaurantes/novo" >
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
                                <TableRow sx={{ backgroundColor: '#273b27' }}>
                                    <TableCell sx={{ color: '#fff' }}>ID</TableCell>
                                    <TableCell sx={{ color: '#fff' }}>Nome</TableCell>
                                    <TableCell sx={{ color: '#fff' }}>Editar</TableCell>
                                    <TableCell sx={{ color: '#fff' }}>Deletar</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {restaurantes.map((restaurante, index) =>
                                    <TableRow
                                        key={restaurante.id}
                                        sx={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'transparent' }} // zebra com cinza clarinho
                                    >
                                        <TableCell sx={{ color: '#273b27', fontWeight: 500 }}>
                                            {restaurante.id}
                                        </TableCell>
                                        <TableCell sx={{ color: '#273b27', fontWeight: 500 }}>
                                            {restaurante.nome}
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                component={RouterLink}
                                                to={`/admin/restaurantes/${restaurante.id}`}
                                                aria-label="edit"
                                                sx={{
                                                    backgroundColor: 'transparent',
                                                    '&:hover': {
                                                        backgroundColor: '#273b27',
                                                        '& svg': {
                                                            color: '#fff',
                                                        },
                                                    },
                                                }}
                                            >
                                                <EditIcon sx={{ fontSize: 32, color: '#273b27' }} />
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
                                                onClick={() => deletar(restaurante)}
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

            <Box sx={{ height: 48 }} />



        </>
    )
}
export default AdminRestaurantes;
