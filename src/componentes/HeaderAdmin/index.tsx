import AccountCircle from "@mui/icons-material/AccountCircle";
import { Box, Container, Typography, Link, Button, Stack, IconButton } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';


interface HeaderAdminProps {
  titulo: string;
  subtitulo: string;
}

const HeaderAdmin = ({ titulo, subtitulo }: HeaderAdminProps) => {
  return (
    <>
      {/* Fundo cinza claro Header*/}
      <Box sx={{ backgroundColor: '#f5f5f5', py: 3 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: 'bold', textAlign: 'center' }}
          >
            {titulo}
          </Typography>
        </Container>
      </Box>

      {/* Fundo verde escuro */}
      <Box sx={{ backgroundColor: '#273b27', py: 3, mb: 3 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h5"
            component="h3"
            sx={{ fontWeight: 'medium', textAlign: 'center', color: '#fff' }} >
            {subtitulo}
          </Typography>


          {/* Links abaixo do subtítulo */}
          {/* Linha com botões centralizados e ícone à direita */}
          <Box sx={{ position: 'relative' }}>
            {/* Botões centralizados */}
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              alignItems="center"
            >
              <Button
                component={RouterLink}
                to="/admin/restaurantes"
                sx={{
                  color: '#fff',
                  textTransform: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                    textDecorationColor: '#fff',
                  },
                }}
              >
                Restaurantes Cadastrados
              </Button>

              <Button
                component={RouterLink}
                to="/admin/restaurantes/novo"
                sx={{
                  color: '#fff',
                  textTransform: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                    textDecorationColor: '#fff',
                  },
                }}
              >
                Cadastrar Restaurante
              </Button>

              <Button
                component={RouterLink}
                to="/admin/pratos"
                sx={{
                  color: '#fff',
                  textTransform: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                    textDecorationColor: '#fff',
                  },
                }}
              >
                Pratos cadastrados
              </Button>
              <Button
                component={RouterLink}
                to="/admin/pratos/novo"
                sx={{
                  color: '#fff',
                  textTransform: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                    textDecorationColor: '#fff',
                  },
                }}
              >
                Cadastrar Prato
              </Button>
            </Stack>

            {/* Ícone alinhado à direita */}
            <Box sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}>
              <IconButton component={RouterLink} to="/restaurantes">
                <AccountCircle fontSize="large" sx={{ color: '#fff' }} />
              </IconButton>
            </Box>
          </Box>

        </Container>
      </Box>
    </>
  );
};

export default HeaderAdmin;
