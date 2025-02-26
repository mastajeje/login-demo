import { useEffect } from 'react'
import './App.css'
import Login from './pages/Login';

function App() {
//   const [count, setCount] = useState(0)
useEffect(() => {
    testServer();
},[])

  const testServer = () => {
    fetch('http://localhost:5000/api')
    .then(response => response.json())
    .then(data => console.log(data))
  }


  return (
    <>
<div>
    {/* Hello */}
    <Login/>
</div>
    </>
  )
}

export default App
