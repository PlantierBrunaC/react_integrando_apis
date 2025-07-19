import { useEffect, useState } from "react";
import IRestaurante from "../../../interfaces/IRestaurante";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import axios from "axios";
import { Link, Link as RouterLink } from 'react-router-dom';


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
        // <h1>Admin Restaurantes</h1>

        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                        <TableCell>Editar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map(restaurante =>
                        <TableRow key={restaurante.id}>
                            <TableCell>{restaurante.nome}</TableCell>
                            <TableCell>
                                [ <Link to={`/admin/restaurantes/${restaurante.id}`}>Editar</Link> ] 
                                </TableCell>
                        </TableRow>

                    )}

                </TableBody>
            </Table>

        </TableContainer>
    )
}
export default AdminRestaurantes;   