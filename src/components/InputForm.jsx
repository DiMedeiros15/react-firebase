
import React from "react";

const InputForm = ({ name, setName, email, setEmail, criarUser }) => {
  return (
    <div className="">
      <input
        type="text"
        placeholder="Digite seu nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Digite seu email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
 
      <button onClick={criarUser}>Criar Usuário</button>
    </div>
  );
};

export default InputForm;
 
