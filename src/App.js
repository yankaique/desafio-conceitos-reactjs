import React,{useState, useEffect} from "react";
import api from './services/api';
import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);
  const [randomTecnology, setRandomTecnology] = useState('react-native');

  useEffect(()=>{
    api.get('repositories').then(response => {setRepositories(response.data)})
  },[])

  async function handleAddRepository() {

    if(randomTecnology=='react'){
      setRandomTecnology('node');
    }else if(randomTecnology == 'node'){
      setRandomTecnology('react-native');
    }else{
      setRandomTecnology('react');
    }

    const response = await api.post('repositories',{title:`Uma aplicação feita com ${randomTecnology}`,
    url:"https://github.com/yankaique",
    techs:randomTecnology})

    const newData = response.data;

    setRepositories([...repositories,newData]);
  }

  async function handleRemoveRepository(id) {

    await api.delete(`repositories/${id}`);
    
    const findIndex = repositories.findIndex(repositorie => repositorie.id === id);

    repositories.splice(findIndex,1);

    setRepositories([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(response => 
        (<li key={response.id}>{response.title}  
          <button onClick={() => handleRemoveRepository(response.id)}>
          Remover
          </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
