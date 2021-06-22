
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { Alert } from 'react-bootstrap';

function Header(){
  return(
    <div>
      <Alert variant="dark">This is some alert</Alert>
      <Button className="some-button">Click Me</Button>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Header/>
    </div>
  );
}

export default App;
