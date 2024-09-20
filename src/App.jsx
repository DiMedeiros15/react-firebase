import { initializeApp } from "firebase/app";
import {  collection,  getFirestore,  getDocs,  addDoc,  doc,  deleteDoc,} from "firebase/firestore";
import { useEffect, useState } from "react";
import InputForm from "./components/InputForm";
import UserList from "./components/UserList";
import "./App.css";

// Base de Dados Firebase
const firebaseApp = initializeApp({
  apiKey: "AIzaSyAdwEU6c7OvWJRY_-RResrDBFZA9l2XnGk",
  authDomain: "reactfirebase-b9d7c.firebaseapp.com",
  projectId: "reactfirebase-b9d7c",
});

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const db = getFirestore(firebaseApp);
  const userCollections = collection(db, "users");

  // Função para validar e-mail
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Função para criar usuário no Firebase
  const criarUser = async () => {
    if (!name || !email) {
      setError("Nome e email são obrigatórios");
      return;
    }

    //Validação 
    if (!isValidEmail(email)) {
      setError("E-mail inválido!");  // Exibe erro se o e-mail for inválido
      return;
    }
    
    setError("");  // Limpa erros anteriores
    try {
      await addDoc(userCollections, { name, email });
      setName("");  // Limpa o campo de nome após criação
      setEmail("");  // Limpa o campo de email após criação
      getUsers();  // Atualiza a lista de usuários
    } catch (err) {
      console.error("Erro ao criar usuário:", err);
      setError("Erro ao criar usuário. Tente novamente.");
    }
  };

 // Função para buscar usuários'
 const getUsers = async () => {
  setLoading(true);
  try {
    const data = await getDocs(userCollections);
    setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    setError("");  // Limpa o erro se for bem-sucedido
  } catch (err) {
    console.error("Erro ao buscar usuários:", err);
    setError("Erro ao carregar usuários. Tente novamente.");
  }
  setLoading(false);
};



  // UseEffect porque assim que carregar a tela, verifica no firebase se tem algum dados para carregar e mostrar em tela.
  //getDocs ele vai no banco buscar as referencias
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollections);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, [userCollections]);

 // Função para deletar usuário
 const deleteUser = async (id) => {
  try {
    await deleteDoc(doc(db, "users", id));
    getUsers();  // Atualiza a lista de usuários após deletar
  } catch (err) {
    console.error("Erro ao deletar usuário:", err);
    setError("Erro ao deletar usuário, Tente novamente.");
  }
};

  return (
    <div className="App"> 
      <h1>Cadastro de Usuários</h1>

      {loading && <p>Carregando...</p>}
      {error && <p className="error-message">{error}</p>} {/* Exibe a mensagem de erro */}

      <InputForm  name={name} setName={setName} email={email} setEmail={setEmail}  criarUser={criarUser}/>
      <UserList users={users} deleteUser={deleteUser} />
    </div>
  );
}

export default App;
