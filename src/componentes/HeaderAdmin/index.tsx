import { Box, Container, Typography } from "@mui/material";

interface HeaderAdminProps {
  titulo: string;
  subtitulo: string;
}

const HeaderAdmin = ({ titulo, subtitulo }: HeaderAdminProps) => {
  return (
    <>
      {/* Fundo cinza claro */}
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

      {/* Fundo cinza escuro */}
      <Box sx={{ backgroundColor: '#273b27', py: 3, mb: 3 }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h5" 
            component="h3" 
            sx={{ fontWeight: 'medium', textAlign: 'center', color: '#fff' }}
          >
            {subtitulo}
          </Typography>
        </Container>
      </Box>
    </>
  );
};

export default HeaderAdmin;
