import ReactDOM from 'react-dom/client'
import { AppProvider } from './AppProvider.tsx'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AppProvider>
    <App />
  </AppProvider>,
)
