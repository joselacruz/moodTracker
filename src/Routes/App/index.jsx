import {useRoutes, BrowserRouter} from  'react-router-dom';
import Home from '../../Pages/Home'
import Screen2 from '../../Pages/Screen2'
import {MoodProvider} from '../../Context/index'
import Header from '../../Components/Header';
const App = ()  => {
    const AppRoutes = () => {
        let routes = useRoutes ([
          {path: '/',element: <Home/>},
          {path: '/calendar',element: <Screen2/>},
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
  