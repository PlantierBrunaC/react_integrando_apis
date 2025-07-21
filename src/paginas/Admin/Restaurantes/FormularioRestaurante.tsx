import { Box, Button, Container, Paper, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";
import HeaderAdmin from "../../../componentes/HeaderAdmin";
import http from "../../../http";
import { botaoPrincipal } from "../../../Estilos/estilos";

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

    const subtitulo = nomeRestaurante ? "Edição do Restaurante" : "Formulário do Restaurante";


    return (

        <>
            <Box>
                {/* REFATORAÇÃO O HEADER FOI PARA A PÁGINA MODELO
                 <HeaderAdmin
                    titulo="Administração dos Restaurantes - Alfood"
                    subtitulo={subtitulo}
                /> */}

                <Container maxWidth="lg" sx={{ mt: 3, mb: 3 }}>
                    <Paper sx={{ p: 3 }}>
                        <Box
                            component="form"
                            onSubmit={aoSubmeterForm}
                            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                        >
                            <TextField
                                value={nomeRestaurante}
                                onChange={(evento) => setNomeRestaurante(evento.target.value)}
                                id="standard-basic"
                                label="Nome do Restaurante"
                                variant="standard"
                                fullWidth
                                required
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="outlined"
                                sx={botaoPrincipal}
                            >
                                Salvar
                            </Button>


                        </Box>
                    </Paper>
                </Container>
            </Box>
        </>

    )
}

export default FormularioRestaurante;   