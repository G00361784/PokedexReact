import logo from './logo.svg';
import './App.css';
import './components/image'
import Gallery from './components/image';
function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        
        <Gallery/>


        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
