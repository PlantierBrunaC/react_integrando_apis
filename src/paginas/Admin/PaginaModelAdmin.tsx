import { Box, Container, Paper } from "@mui/material";
import HeaderAdmin from "../../componentes/HeaderAdmin";
import { Outlet, useLocation, useParams } from "react-router-dom";

const PaginaModelAdmin = () => {
  const localizacao = useLocation();
  const params = useParams();

  const path = localizacao.pathname;

  const definirSubtitulo = () => {
    const rotasSubtitulos: { [key: string]: string } = {
      "/admin/restaurantes": "Restaurantes",
      "/admin/restaurantes/novo": "Formulário de cadastro de restaurante",
      "/admin/pratos": "Lista de Pratos",
      "/admin/pratos/novo": "Formulário do Prato",
    };

    if (rotasSubtitulos[path]) {
      return rotasSubtitulos[path];
    }

    // Casos dinâmicos com ID (edições)
    if (path.includes("/admin/restaurantes/") && params.id) {
      return "Edição do Restaurante";
    }

    if (path.includes("/admin/pratos/") && params.id) {
      return "Edição do Prato";
    }

    return "Área Administrativa";
  };

  const subtitulo = definirSubtitulo();

  return (
    <Box>
      <HeaderAdmin
        titulo="Administração - Alfood"
        subtitulo={subtitulo}
      />
      <Container maxWidth="lg" sx={{ mt: 3, mb: 3 }}>
        <Paper sx={{ p: 3 }}>
          <Outlet />
        </Paper>
      </Container>
    </Box>
  );
};

export default PaginaModelAdmin;
