import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import AdminRestaurantes from './paginas/Admin/Restaurantes/AdminRestaurantes';
import FormularioRestaurante from './paginas/Admin/Restaurantes/FormularioRestaurante';
import PaginaModelAdmin from './paginas/Admin/PaginaModelAdmin';
import AdminPratos from './paginas/Admin/Pratos/AdminPratos';
import FormularioDePrato from './paginas/Admin/Pratos/FormularioDePrato';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />

<Route path='/admin' element={<PaginaModelAdmin />}> 

      <Route path="restaurantes" element={<AdminRestaurantes />} />
      <Route path="restaurantes/novo" element={<FormularioRestaurante />} />
      <Route path="restaurantes/:id" element={<FormularioRestaurante />} />

      <Route path="pratos" element={<AdminPratos />} />
      <Route path="pratos/novo" element={<FormularioDePrato />} />
      <Route path="pratos/:id" element={<FormularioDePrato />} />
</Route>

    </Routes>
  );
}

export default App;
