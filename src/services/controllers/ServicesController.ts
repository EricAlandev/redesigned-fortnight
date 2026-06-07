"use server"

import fs from "fs/promises";
import path from "path";
import { ServiceAndData, services as TypeServices } from "@/types/TypeService";
import { ParseTheTime, ParseTimeNotComplete } from "@/lib/functions/ParseTheTime";
import { PhotoImage } from "@/lib/functions/PhotoIMage";
import { config } from "process";

const currentDir = path.dirname(new URL(import.meta.url).pathname);


const rootPath = path.resolve(currentDir, "..", "..", ".."); 

const cleanRootPath = rootPath.startsWith('\\') ? rootPath.substring(1) : rootPath;

const dbPathServices = path.join(cleanRootPath, "services.json");
const dbPathBookings = path.join(cleanRootPath, "bookings.json");
const dbPathUsers    = path.join(cleanRootPath, "users.json");

// --- UTILITÁRIOS DE LEITURA E ESCRITA LOCAL ---
export async function getFileServices() {
  // process.cwd() garante que começamos na raiz do projeto
  // path.join resolve as barras automaticamente para Windows ou Linux e remove o %20 dos espaços
  const filePath = path.join(process.cwd(), 'src', 'data', 'services.json');

  try {
    const fileData = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(fileData);
  } catch (error) {
    console.error(`Erro real ao tentar ler o arquivo em: ${filePath}`, error);
    throw error;
  }
}

const saveFileServices = async (data: any[]) => {
  await fs.writeFile(dbPathServices, JSON.stringify(data, null, 2), "utf-8");
};

const getFileBookings = async (): Promise<any[]> => {
  try { 
    const data = await fs.readFile(dbPathBookings, "utf-8");
    return JSON.parse(data); 
  } catch { 
    return []; 
  }
};

const saveFileBookings = async (data: any[]) => {
  await fs.writeFile(dbPathBookings, JSON.stringify(data, null, 2), "utf-8");
};

const getFileUsers = async (): Promise<any[]> => {
  try { 
    const data = await fs.readFile(dbPathUsers, "utf-8");
    return JSON.parse(data); 
  } catch { 
    return []; 
  }
};

type servicePutParameter = ServiceAndData & { idParameter: string }
type pullOneServiceType = { idConvertido: number, idUser?: number }

// ==========================================================
// 1. PULL ALL SERVICES (GET)
// ==========================================================
export async function pullServices() {
  const services = await getFileServices();
  if (services.length === 0) return [];

  let arrayServices = [];
  for (let i = 0; i < services.length; i++) {
    const urlPhotos = await PhotoImage(services[i].nome_servico);
    arrayServices.push({
      id: services[i].id,
      nome_servico: services[i].nome_servico,
      preco: services[i].preco,
      preco_desconto: services[i].preco_desconto,
      url: urlPhotos
    });
  }
  return arrayServices;
}

// ==========================================================
// 2. PULL ONE SPECIFIC SERVICE BY ID (GET [ID])
// ==========================================================
export async function pullOneService({ idConvertido, idUser }: pullOneServiceType) {
  const services = await getFileServices(); 
  const bookings = await getFileBookings(); 

  console.log("this is my SERVICEEEE" , services);

  // Comparação segura convertendo ambos para Number
  const service = services.find(s => s && Number(s.id) === Number(idConvertido));
  
  if (!service) {
    throw new Error(`Fail to find the service. Procurou pelo ID: ${idConvertido} no arquivo local.`);
  }

  const availableSlots = (service.slots || []).filter((slot: any) => slot && !slot.choosed);

  let userCanComment = false;
  if (idUser !== undefined && !isNaN(Number(idUser)) && Number(idUser) > 0) {
    const now = new Date();
    const targetUserId = Number(idUser);
    
    const pastBooking = bookings.find(b => 
      b && 
      b.usuario_id === targetUserId && 
      b.servicos_id === idConvertido &&
      b.dia_horario &&
      new Date(b.dia_horario) < now &&
      (b.comentado === null || b.comentado !== true)
    );

    if (pastBooking) {
      userCanComment = true;
    }
  }

  let cleanComments: any = [];
  const rawComments = service.comentarios || [];
  const users = await getFileUsers(); 

  for (let i = 0; i < rawComments.length; i++) {
    const currentComment = rawComments[i];
    if (!currentComment) continue;

    const commentUser = users.find(u => u && u.id === currentComment.usuario_id);
    cleanComments.push({
      comentario: currentComment.comentario,
      avaliacaoComentario: String(currentComment.avaliacao || 0),
      dataAvaliation: ParseTimeNotComplete(currentComment.horario),
      idUser: currentComment.usuario_id,
      nomeUser: commentUser ? commentUser.nome : "Usuário Anônimo"
    });
  }

  return {
    id: service.id,
    nome_servico: service.nome_servico,
    preco: service.preco,
    preco_desconto: service.preco_desconto,
    descricao: service.descricao,
    url: await PhotoImage(service.nome_servico),
    ServicesData: availableSlots,
    avaliacao: String(service.avaliacao?.aprovacao_percentual || 0),
    quantidadeAvaliacoes: rawComments.length,
    comentarios: cleanComments,
    userCanComment: userCanComment
  };
}

// ==========================================================
// 7. USER SELECT SERVICE / BOOKING OPERATION (POST)
// ==========================================================
export async function userSelectService(id: number, idService: number, horario: string, idDate: string) {
  const services = await getFileServices(); 
  const bookings = await getFileBookings(); 

  const serviceIndex = services.findIndex(s => s && Number(s.id) === Number(idService));
  if (serviceIndex === -1) throw new Error("O serviço selecionado não existe.");

  const slots = services[serviceIndex].slots || [];
  const slotIndex = slots.findIndex((sl: any) => sl && sl.idDate === Number(idDate));

  if (slotIndex === -1 || slots[slotIndex].choosed) {
    throw new Error("Este horário não está disponível para este serviço.");
  }

  slots[slotIndex].choosed = true;
  services[serviceIndex].slots = slots;
  await saveFileServices(services); 

  const nextBookingId = bookings.length > 0 ? Math.max(...bookings.map(b => b?.id || 0)) + 1 : 1;
  bookings.push({
    id: nextBookingId,
    usuario_id: id,
    servicos_id: idService,
    idDate: Number(idDate),
    dia_horario: slots[slotIndex].dia_horario,
    choosed: true,
    comentado: null
  });
  await saveFileBookings(bookings); 

  return { success: true, message: "Serviço agendado com sucesso!" };
}