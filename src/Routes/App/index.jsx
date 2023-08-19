import {useRoutes, BrowserRouter} from  'react-router-dom';
import Screen1 from '../../Pages/Screen1'
import Screen2 from '../../Pages/Screen2'
import {MoodProvider} from '../../Context/index'
const App = ()  => {
    const AppRoutes = () => {
        let routes = useRoutes ([
          {path: '/',element: <Screen1/>},
          {path: '/category',element: <Screen2/>},
        ])
        return routes;
      }
      

    return (
      <>
  <MoodProvider> 
   <BrowserRouter>
    <AppRoutes/>
   </BrowserRouter>
   </MoodProvider>

      </>
    )
  }
  
  export default App
  