// src/services/controllers/loginRegisterController.ts
"use server" // 👈 This tells Next.js this is a Server Action!

import { dadoCadastro, dadoLogin } from "@/types/TypeLoginCadastro";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/data/users.json");

const getFileUsers = (): any[] => {
  try {
    const fileData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(fileData);
  } catch (error) {
    return [];
  }
};

const saveFileUsers = (users: any[]) => {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), "utf-8");
};

export async function loginController(loginData: dadoLogin) {
  const { nome, senha } = loginData;
  const users = getFileUsers();

  if (!nome || !senha) {
    throw new Error("Faltando o nome ou a senha");
  }

  const user = users.find((u) => u.nome.toLowerCase() === nome.toLowerCase());

  if (!user || user.senha !== senha) {
    throw new Error("Usuário não existe ou senha errada");
  }

  const token = `file_session_jwt_${btoa(JSON.stringify({ id: user.id, nome: user.nome }))}`;
  
  user.token = token;
  saveFileUsers(users);

  const isAdmin = user.authorizations?.some(
    (auth: any) => auth.authorization?.id === 1 || auth.authorization?.name === "ADMIN"
  );

  return {
    user: {
      id: user.id,
      nome: user.nome,
      number: user.number,
      authorizations: user.authorizations,
      endress: user.endress,
      admin: isAdmin
    },
    token
  };
}

export async function registerController(dadoCadastro: dadoCadastro) {
  const { nome, senha, dd, numero, endereco, numero_casa } = dadoCadastro;
  const users = getFileUsers();

  if (!nome || !senha) {
    throw new Error("Faltando campos obrigatórios");
  }

  const existingUser = users.find((u) => u.nome.toLowerCase() === nome.toLowerCase());
  if (existingUser) {
    throw new Error("Já existe um usuário com esse nome");
  }

  const nextUserId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;

  const newLocalUser = {
    id: nextUserId,
    nome: nome,
    senha: senha, 
    token: "",
    number: { dd, numero },
    endress: { endereco, numero_casa },
    authorizations: [{ id: nextUserId, authorization: { id: 2, name: "USER" } }]
  };

  users.push(newLocalUser);
  saveFileUsers(users);

  return { mensagem: "Usuário criado!" };
}