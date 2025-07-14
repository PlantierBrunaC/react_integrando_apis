import { useState } from "react";
import IRestaurante from "../../../interfaces/IRestaurante";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

const AdminRestaurantes = () => {

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])


    return ( 
    // <h1>Admin Restaurantes</h1>

        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Nome</TableCell>
                    </TableRow>

                </TableBody>
            </Table> 

        </TableContainer> 
    )
}
export default AdminRestaurantes;   