import React, { useState, useEffect } from "react";
import api from "../src/services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    api.get("repositories").then((response) => {
      setRepositories(response.data);
    });
  }, []);
  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: `Novo projeto ${Date.now()}`,
      url: "https://github.com/ybribeiro14?tab=repositories",
      techs: "React Native",
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    console.log(id);
    await api.delete(`repositories/${id}`);

    const repositoryIndex = repositories.findIndex(
      (repository) => repository.id === id
    );

    repositories.splice(repositoryIndex, 1);

    setRepositories([...repositories]);
  }

  return (
    <>
      <ul data-testid="repository-list">
        {repositories.map((repo) => (
          <>
            <li key={repo.id}>{repo.title}</li>
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </>
  );
}

export default App;
