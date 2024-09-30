import './App.css'
import BaseLayout from "./components/BaseLayout.tsx";
import Dashboard from "./pages/Dashboard.tsx";

function App() {

  return (
    <>
        <BaseLayout>
            <Dashboard />
        </BaseLayout>
    </>
  )
}

export default App
