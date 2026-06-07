"use server"

import { DataAvaliation } from "@/types/TypeAvaliation";
import { DataUser } from "@/types/TypeUsuarios";
// Import your database backend functions directly from your data controller
import { ChangeDataOfUser, PutComentController } from "@/services/controllers/UserController";

type ReturnOfDataChange = {
  user: any;
  message: string;
}

type MessageObject = {
  message: string;
}

// ==========================================================
// 1. BRIDGE ACTION: PROFILE MUTATION DATA
// ==========================================================
export const changeDataUser = async (data: DataUser): Promise<ReturnOfDataChange> => {
  console.log("Directly changing profile data metrics:", data);
  
  try {
    // Unpack interface structures to feed into data logic cleanly
    const result = await ChangeDataOfUser(
      Number(data.id),
      data.nome || "",
      data.endress?.endereco || "",
      data.endress?.numero_casa || "",
      data.number?.dd || "",
      data.number?.numero || ""
    );

    return result;
  } catch (error: any) {
    // Re-throw raw messages to trigger the hook's catch blocks correctly
    throw new Error(error.message || "Erro na alteração dos dados");
  }
};

// ==========================================================
// 2. BRIDGE ACTION: SERVICE REVIEWS SUBMISSION
// ==========================================================
export const putComents = async (data: DataAvaliation, idService: string): Promise<MessageObject> => {
  console.log("Directly mapping comment payload onto backend tree:", idService);

  try {
    const result = await PutComentController(
      String(data.avaliacao),
      data.comentario || "",
      Number(data.idUser),
      Number(idService)
    );

    return result;
  } catch (error: any) {
    throw new Error(error.message || "Erro ao salvar o comentário");
  }
};