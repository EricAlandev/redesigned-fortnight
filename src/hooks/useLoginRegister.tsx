// src/hooks/useLoginRegister.ts
'use client'
import { dadoLogin, dadoCadastro } from "@/types/TypeLoginCadastro";
// Direct import! Next.js knows this runs on the server because of "use server" inside that file
import { loginController, registerController } from "@/services/controllers/loginRegisterController";
import { useGlobal } from "@/lib/GlobalContext";
import { useRouter } from "next/navigation";

export default function useLoginRegister() {
  const { login } = useGlobal();
  const router = useRouter();

  const makeLogin = async (loginData: dadoLogin) => {
    try {
      // Calling the server function directly with zero fetch endpoints!
      const valueLogin = await loginController(loginData);

      if (valueLogin?.user && valueLogin?.token) {
        login(valueLogin?.user, valueLogin?.token);
        router.push("/");
      }
    } catch (error: any) {
      return { message: error?.message || "Erro no login", status: 'error' as const };
    }
  };

  const register = async (dadoCadastro: dadoCadastro) => {
    try {
      const regi = await registerController(dadoCadastro);
      return { message: regi?.mensagem, status: 'register' as const };
    } catch (error: any) {
      return { message: error?.message || "Erro no cadastro", status: 'error' as const };
    }
  };

  return {
    makeLogin,
    register
  };
}