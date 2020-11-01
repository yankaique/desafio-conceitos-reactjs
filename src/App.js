import React,{useState, useEffect} from "react";
import api from './services/api';
import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);
  const [addicted, setAddicted] = useState(1);

  useEffect(()=>{
    api.get('repositories').then(response => {setRepositories(response.data)})
  },[])

  async function handleAddRepository() {
    const response = await api.post('repositories',{title:`Respositório ${addicted}`,
    url:"https://github.com/yankaique",
    techs:'React'})

    setAddicted(addicted+1);

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
