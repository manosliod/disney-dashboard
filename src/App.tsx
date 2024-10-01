import './App.css'
import React from 'react'
import store from './store/store'
import { Provider } from 'react-redux'
import BaseLayout from './components/BaseLayout.tsx'
import Dashboard from './pages/Dashboard.tsx'

const App: React.FC = () => (
  <Provider store={store}>
    <BaseLayout>
      <Dashboard />
    </BaseLayout>
  </Provider>
)

export default App
