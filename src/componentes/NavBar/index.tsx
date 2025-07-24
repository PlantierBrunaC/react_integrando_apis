import estilos from './NavBar.module.scss';
import { Link } from 'react-router-dom';
import { IconButton } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

const NavBar = () => {
  return (
    <nav className={estilos.navbar}>
      <div className={estilos.navWrapper}>
        {/* Espaço à esquerda (pode ser logo futuramente) */}
        <div className={estilos.leftSpace}></div>

        {/* Links centralizados */}
        <ul className={estilos.Link}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/restaurantes">Restaurantes</Link>
          </li>
        </ul>

        {/* Ícone do usuário à direita */}
        <div className={estilos.userIcon}>
          <IconButton component={Link} to="/admin/restaurantes">
            <AccountCircle fontSize="large" />
          </IconButton>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
