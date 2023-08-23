import {useRoutes, BrowserRouter} from  'react-router-dom';
import Home from '../../Pages/Home';
import Calendar from '../../Pages/Calendar';
import Trends from '../../Pages/Trends'
import {MoodProvider} from '../../Context/index';
import Header from '../../Components/Header';
import Login from '../../Pages/Login';
import {UserProvider} from  '../../Context/userContext';
const App = ()  => {
    const AppRoutes = () => {
        let routes = useRoutes ([
          {path: '/',element: <Home/>},
          {path: '/calendar',element: <Calendar/>},
          {path: '/trends',element: <Trends/>},
          {path: '/login',element: <Login/>},
        ])
        return routes;
      }
      

    return (
      <>
  <UserProvider>
  <MoodProvider> 
   <BrowserRouter>
   <Header/>
    <AppRoutes/>
   </BrowserRouter>
   </MoodProvider>
   </UserProvider>
      </>
    )
  }
  
  export default App
  