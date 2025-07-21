import { Box, Container, Paper } from "@mui/material";
import HeaderAdmin from "../../componentes/HeaderAdmin";
import { Outlet, useLocation, useParams } from "react-router-dom";

const PaginaModelAdmin = () => {
  const localizacao = useLocation();
  const params = useParams();

  let subtitulo = "SUBTITULO";

  if (localizacao.pathname === "/admin/restaurantes") {
    subtitulo = "Restaurantes";
  } else if (localizacao.pathname === "/admin/restaurantes/novo") {
    subtitulo = "Formulário de cadastro de restaurante";
  } else if (params.id) {
    subtitulo = "Edição do Restaurante";
  }

  return (
    <Box>
      <HeaderAdmin
        titulo="Administração dos Restaurantes - Alfood"
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
