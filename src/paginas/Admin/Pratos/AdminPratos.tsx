import { useEffect, useState } from "react";
import IPratos from "../../../interfaces/IPrato";
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
import { botaoPrincipal } from "../../../Estilos/estilos";


const AdminPratos = () => {

    const [pratos, setPratos] = useState<IPratos[]>([])

    useEffect(() => {
        http.get<IPratos[]>("pratos/")
            .then(response => {
                setPratos(response.data)
            })
            .catch(error => {
                console.log(error)
            })

    }, [])

    const deletar = (PratoASerDeletado: IPratos) => {
        http.delete(`pratos/${PratoASerDeletado.id}/`)
            .then(() => {
                const listaDeRestaurantes = pratos.filter(prato => prato.id !== PratoASerDeletado.id)
                setPratos([...listaDeRestaurantes])
                alert("Pratos deletado com sucesso!")
            }
            )

    }

    return (
        <>


            <Box>

               
                {/* BOTÃO DE CADASTRAR NOVO Pratos */}
                <Container maxWidth="lg" sx={{ mb: 3 }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">Cadastrar novo Prato</Typography>
                        <Button
                            variant="contained"
                            sx={botaoPrincipal}
                            component={RouterLink}
                            to="/admin/pratos/novo" >
                            Cadastrar
                        </Button>
                    </Box>
                </Container>

                {/* TABELA CENTRALIZADA COM MAIOR LARGURA */}
                <Container maxWidth="lg">

                    {/* <h1>Admin Pratos</h1> */}
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ backgroundColor: '#273b27' }}>
                                    <TableCell sx={{ color: '#fff' }}>ID</TableCell>
                                    <TableCell sx={{ color: '#fff' }}>Nome</TableCell>
                                    <TableCell sx={{ color: '#fff' }}>Descrição</TableCell>
                                    <TableCell sx={{ color: '#fff' }}>Tag</TableCell>
                                    <TableCell sx={{ color: '#fff' }}>Imagem</TableCell>
                                    <TableCell sx={{ color: '#fff' }}>Editar</TableCell>
                                    <TableCell sx={{ color: '#fff' }}>Deletar</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {pratos.map((prato, index) =>
                                    <TableRow
                                        key={prato.id}
                                        sx={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'transparent' }} // zebra com cinza clarinho
                                    >
                                        <TableCell sx={{ color: '#273b27', fontWeight: 500 }}>
                                            {prato.id}
                                        </TableCell>
                                        <TableCell sx={{ color: '#273b27', fontWeight: 500 }}>
                                            {prato.nome}
                                        </TableCell>
                                        <TableCell sx={{ color: '#273b27', fontWeight: 500 }}>
                                            {prato.descricao}
                                        </TableCell>
                                        <TableCell sx={{ color: '#273b27', fontWeight: 500 }}>
                                            {prato.tag}
                                        </TableCell>
                                        <TableCell sx={{ color: '#273b27', fontWeight: 500 }}>
                                           <a href={prato.imagem} target="_blank" rel="noopener noreferrer">Ver imagem</a>
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                component={RouterLink}
                                                to={`/admin/pratos/${prato.id}`}
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

                                        <TableCell>
                                            <IconButton
                                                aria-label="delete"
                                                onClick={() => deletar(prato)}
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
export default AdminPratos;
