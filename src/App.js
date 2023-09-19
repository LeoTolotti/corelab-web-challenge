import "./App.css";
import Tarefa from "./Componentes/Tarefas";
import Header from "./Componentes/Header";
import NovaTarefa from "./Componentes/NovaTarefa";
import "./App.css";
function App() {
  return (
    <div className="App">
      <Header />
      <div className="conteudo_app">
        <NovaTarefa />
        <Tarefa />
      </div>
    </div>
  );
}

export default App;
