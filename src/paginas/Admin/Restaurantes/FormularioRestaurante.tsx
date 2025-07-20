import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";
import HeaderAdmin from "../../../componentes/HeaderAdmin";
import http from "../../../http";

const FormularioRestaurante = () => {

    //Hook que pega os parametros da URL
    const parametros = useParams();

    useEffect(() => {
        if (parametros.id) {
            console.log("ID recebido:", parametros.id)
            //Com CRASE para concatenar o resultado com o parametro
            http.get<IRestaurante>(`restaurantes/${parametros.id}`)
                .then(response => {
                    setNomeRestaurante(response.data.nome)
                    console.log("Response completo:", response);
                    console.log("Dados da API:", response.data);
                    console.log("Nome recebido:", response.data.nome);

                })
        }
    }, [parametros])

    const [nomeRestaurante, setNomeRestaurante] = useState("");


    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        // console.log("Formulário enviado")

        if (parametros.id) {
            http.put(`restaurantes/${parametros.id}/`, {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert("Restaurante atualizado com sucesso!")
                })
                .catch(error => {
                    console.log(error)
                })

        } else {
            http.post("restaurantes/", {
                nome: nomeRestaurante
            })
                .then(() => {
                    alert("Restaurante cadastrado com sucesso!")
                })
                .catch(error => {
                    console.log(error)
                })
        }

    }


    return (

        <>
            <Box>

                <HeaderAdmin
                    titulo="Administração dos Restaurantes - Alfood"
                    subtitulo="Formulário do Restaurante" />

                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Box component="form" onSubmit={aoSubmeterForm} >

                    <TextField value={nomeRestaurante}
                        onChange={evento => setNomeRestaurante(evento.target.value)}
                        id="standard-basic"
                        label="Nome do Restaurante"
                        variant="standard" 
                        fullWidth
                        margin="normal"
                        required
                        />

                    {/* <p>Nome atual do restaurante: {nomeRestaurante}</p>
                    <p>ID atual do restaurante: {parametros.id}</p>
                    <p>URL atual do restaurante: {`restaurantes/${parametros.id}`}</p> */}



                    <Button type="submit" variant="outlined" fullWidth color="primary" sx={{ mt: 2 }} >Salvar</Button>
                    </Box>
                </Box>
            </Box >


        </>
    )
}

export default FormularioRestaurante;   