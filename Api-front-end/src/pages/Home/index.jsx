import { useEffect, useState, useRef } from 'react';
import './style.css';
import Trash from '../../assets/trash.png';
import api from '../../services/api';

function Home() {
  const [users, setUsers] = useState([]);

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  // Função para obter usuários da API
  async function getUsers() {
    try {
      const usersFromApi = await api.get('/usuarios');
      setUsers(usersFromApi.data);
    } catch (error) {
      console.error('Erro ao obter usuários:', error);
    }
  }

  // Função para deletar usuários
  async function deleteUsers(id) {
    try {
      await api.delete(`/usuarios/${id}`);
      getUsers(); // Atualiza a lista de usuários após deletar
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  }

  // Função para criar novos usuários
  async function createUsers() {
    const newUser = {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value,
    };

    try {
      await api.post('/usuarios', newUser);
      getUsers(); // Atualiza a lista de usuários após criar

      // Limpa os campos de input
      inputName.current.value = '';
      inputAge.current.value = '';
      inputEmail.current.value = '';
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    }
  }

  // useEffect para obter usuários quando o componente é montado
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className='container'>
      <form action="">
        <h1>Cadastro de Usuários</h1>
        <input name='nome' type="text" placeholder='Nome' ref={inputName} />
        <input name='idade' type="number" placeholder='Idade' ref={inputAge} />
        <input name='email' type="email" placeholder='E-mail' ref={inputEmail} />
        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map(user => (
        <div key={user.id} className='card'>
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} alt="Deletar" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
