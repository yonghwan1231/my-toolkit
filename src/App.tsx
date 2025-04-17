import '@/assets/scss/App.scss'
import { Routes, Route } from 'react-router-dom'
import { Fragment } from 'react/jsx-runtime'

type RouteType = {
  path: string
  element: React.JSX.Element
  children?: RouteType[]
}

const renderRoutes = (routes: RouteType[], parentPath = '') => {
  return routes.map(({ path, element, children }) => {
    const fullPath = parentPath + path
    return (
      <Route key={fullPath} path={path} element={element}>
        {children && renderRoutes(children, fullPath)}
      </Route>
    )
  })
}

const routes: RouteType[] = [{ path: '/', element: <></> }]

const App = () => {
  return (
    <Fragment>
      <Routes>{renderRoutes(routes)}</Routes>
    </Fragment>
  )
}

export default App
