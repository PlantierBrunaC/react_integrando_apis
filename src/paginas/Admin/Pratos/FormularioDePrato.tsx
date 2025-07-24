import { Box, Button, Container, FormControl, InputLabel, MenuItem, Paper, Select, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IPrato from "../../../interfaces/IPrato";
import HeaderAdmin from "../../../componentes/HeaderAdmin";
import http from "../../../http";
import { botaoPrincipal } from "../../../Estilos/estilos";
import ITag from "../../../interfaces/ITag";
import IRestaurante from "../../../interfaces/IRestaurante";

const FormularioDePrato = () => {

    const [nomePrato, setNomePrato] = useState("");
    const [descricaoPrato, setDescricaoPrato] = useState("");

    const [tags, setTags] = useState<ITag[]>([]);
    const [tag, setTag] = useState("");

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
    const [restauranteLista, setRestauranteLista] = useState("");

    const [imagem, setImagem] = useState<File | null>(null);

    useEffect(() => {
        http.get<{ tags: ITag[] }>(`tags/`)
            .then(response => setTags(response.data.tags))

        http.get<IRestaurante[]>(`restaurantes/`)
            .then(responseRestaurantes => setRestaurantes(responseRestaurantes.data))


    }, [])

    const selecionarArquivo = (evento: React.ChangeEvent<HTMLInputElement>) => {
        if (evento.target.files?.length) {
            setImagem(evento.target.files[0]);
        } else {
            setImagem(null);
        }
    }


    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

    }

    const subtitulo = nomePrato ? "Edição do Prato" : "Formulário do Prato";


    return (

        <>
            <Box>

                <Container maxWidth="lg" sx={{ mt: 3, mb: 3 }}>
                    <Paper sx={{ p: 3 }}>
                        <Box
                            component="form"
                            onSubmit={aoSubmeterForm}
                            sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                        >
                            <TextField
                                value={nomePrato}
                                onChange={(evento) => setNomePrato(evento.target.value)}
                                id="standard-basic"
                                label="Nome do Prato"
                                variant="standard"
                                fullWidth
                                required
                                margin="dense"
                            />

                            <TextField
                                value={descricaoPrato}
                                onChange={(evento) => setDescricaoPrato(evento.target.value)}
                                id="standard-basic"
                                label="Descrição do Prato"
                                variant="standard"
                                fullWidth
                                required
                                margin="dense"
                            />

                            {/* FORMCONTROL é o SELECT do Moi */}
                            {/* SELECT DE TAGS  */}
                            <FormControl
                                margin="dense"
                                fullWidth
                            >
                                <InputLabel id='select-tag'>
                                    Tag
                                </InputLabel>
                                <Select labelId="select-tag" value={tag} onChange={evento => setTag(evento.target.value)}
                                >
                                    {tags.map(tag => <MenuItem key={tag.id} value={tag.id}>
                                        {tag.value}
                                    </MenuItem>
                                    )}

                                </Select>

                            </FormControl>



                            {/* SELECT DE RESTAURANTES  */}
                            <FormControl
                                margin="dense"
                                fullWidth
                            >
                                <InputLabel id='select-restaurante'>
                                    Restaurante
                                </InputLabel>
                                <Select labelId="select-restaurante" value={restauranteLista} onChange={evento => setRestauranteLista(evento.target.value)}
                                >
                                    {restaurantes.map(restaurante => <MenuItem key={restaurante.id} value={restaurante.id}>
                                        {restaurante.nome}
                                    </MenuItem>
                                    )}

                                </Select>

                            </FormControl>


                            <input type="file" onChange={selecionarArquivo} />



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

export default FormularioDePrato;   