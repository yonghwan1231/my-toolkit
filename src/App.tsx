import 'App.css'
import { Routes, Route } from 'react-router-dom'
import { Fragment } from 'react/jsx-runtime'
import { HttpTest } from 'http/pages/HttpTest'
import { PaginationTest } from 'pagination/pages/PaginationTest'
import { ReactQueryToolkitTest } from 'reactQueryToolkit/pages/ReactQueryToolkitTest'
import { UseFileTest } from 'useFile/pages/UseFileTest'
import { UseFormxTest } from 'useFormx/pages/UseFormxTest'
import { UseModalTest } from 'useModal/pages/UseModalTest'
import { UseQueryStringTest } from 'useQueryString/pages/UseQueryStringTest'

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

const routes: RouteType[] = [
  { path: '/http', element: <HttpTest /> },
  { path: '/pagination', element: <PaginationTest /> },
  { path: '/reactQueryToolkit', element: <ReactQueryToolkitTest /> },
  { path: '/useFile', element: <UseFileTest /> },
  { path: '/useFormx', element: <UseFormxTest /> },
  { path: '/useModal', element: <UseModalTest /> },
  { path: '/useQueryString', element: <UseQueryStringTest /> },
]

const App = () => {
  return (
    <Fragment>
      <Routes>{renderRoutes(routes)}</Routes>
    </Fragment>
  )
}

export default App
