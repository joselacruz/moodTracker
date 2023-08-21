import {useRoutes, BrowserRouter} from  'react-router-dom';
import Home from '../../Pages/Home';
import Calendar from '../../Pages/Calendar';
import Trends from '../../Pages/Trends'
import {MoodProvider} from '../../Context/index';
import Header from '../../Components/Header';
const App = ()  => {
    const AppRoutes = () => {
        let routes = useRoutes ([
          {path: '/',element: <Home/>},
          {path: '/calendar',element: <Calendar/>},
          {path: '/trends',element: <Trends/>},
        ])
        return routes;
      }
      

    return (
      <>
  <MoodProvider> 
   <BrowserRouter>
   <Header/>
    <AppRoutes/>
   </BrowserRouter>
   </MoodProvider>

      </>
    )
  }
  
  export default App
  