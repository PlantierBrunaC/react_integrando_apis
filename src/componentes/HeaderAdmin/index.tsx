import { Box, Container, Typography, Link, Button, Stack } from "@mui/material";

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
          <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
            <Link href="/admin/restaurantes" underline="none">
              <Button
                sx={{
                  color: '#fff',
                  textTransform: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                    textDecorationColor: '#fff',
                  },
                }}
              >
                Home
              </Button>
            </Link>

            <Link   href="/admin/restaurantes/novo" underline="none">
              <Button  
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
            </Link>

            <Link href="#" underline="none">
              <Button
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
            </Link>
          </Stack>

        </Container>
      </Box>
    </>
  );
};

export default HeaderAdmin;
