import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from './routes/routes';
import { DefaultLayout } from './components/layout/DefaultLayout';
import { SkeletonTheme } from 'react-loading-skeleton';
import { useDispatch } from 'react-redux';
import './assets/styles/App.css';
import { useEffect } from 'react';
import { checkAuth } from './redux/auth/authSlice';

function App() {
  const dispatch = useDispatch();

  // Check auth when app start
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
      <Router>
          <div className='app'>
            <SkeletonTheme baseColor="#202020" highlightColor="#444">
              <Routes>
                {publicRoutes.map((route, index) => {
                    const Page = route.component;
                    return (
                      <Route 
                        key={index}
                        path={route.path}
                        element={
                          <DefaultLayout>
                            <Page />
                          </DefaultLayout>
                        }
                      />
                    )
                })}
              </Routes>
            </SkeletonTheme>
          </div>
      </Router>
  )
}

export default App;
