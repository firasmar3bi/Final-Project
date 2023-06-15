import './App.css';

import Layout from './component/Layout/Layout';
import Home from './component/Home/Home';
import About from './component/About/About'
import Shop from './component/Shop/Shop'
import Bloge from './component/Bloge/Bloge'
import Contact from './component/Contact/Contact'
import Card from './component/Card/Card'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import PageNotFound from './component/PageNotFound/PageNotFound';
import Register from './component/Register/Register';
import Login from './component/Login/Login';
import { TokenContextProvider } from './component/Contex/ContexToken';
import ProtectedRouter from './component/protectedRouter/ProtectedRouter';

function App() {
  const router = createBrowserRouter ([
    {path : '' ,
    element :<Layout />
    ,children: [
      {index : true , element : <Home />},
      {path : "Shop" , element : <Shop />},
      {path : "About" , element : <About />},
      {path : "Bloge" , element : <Bloge />},
      {path : "Contact" , element : <Contact />},
      {path : "Card" , element :<ProtectedRouter><Card /></ProtectedRouter> },
      {path : "Register" , element : <Register />},
      {path : "Login" , element : <Login />},
      {path : "*" , element : <PageNotFound />},
    ]}
  ])
  
  return (
    <>
    <TokenContextProvider>
      <RouterProvider router={router} />
    </TokenContextProvider>
    </>
  );
}

export default App;
