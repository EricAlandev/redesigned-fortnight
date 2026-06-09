"use server"

import fs from "fs";
import path from "path";
import { ServiceAndData, services as TypeServices } from "@/types/TypeService";
import { ParseTheTime, ParseTimeNotComplete } from "@/lib/functions/ParseTheTime";
import { PhotoImage } from "@/lib/functions/PhotoIMage";

const servicesPath = path.join(process.cwd(), "src/data/services.json");
const bookingsPath = path.join(process.cwd(), "src/data/bookings.json");
const usersPath = path.join(process.cwd(), "src/data/users.json");

// --- JSON FILE DATABASE SYSTEM UTILITIES ---
const getFileServices = (): any[] => {
  try { return JSON.parse(fs.readFileSync(servicesPath, "utf-8")); } catch { return []; }
};
const saveFileServices = (data: any[]) => {
  fs.writeFileSync(servicesPath, JSON.stringify(data, null, 2), "utf-8");
};
const getFileBookings = (): any[] => {
  try { return JSON.parse(fs.readFileSync(bookingsPath, "utf-8")); } catch { return []; }
};
const saveFileBookings = (data: any[]) => {
  fs.writeFileSync(bookingsPath, JSON.stringify(data, null, 2), "utf-8");
};
const getFileUsers = (): any[] => {
  try { return JSON.parse(fs.readFileSync(usersPath, "utf-8")); } catch { return []; }
};

type servicePutParameter = ServiceAndData & { idParameter: string }
type pullOneServiceType = { idConvertido: number, idUser?: number }

// ==========================================================
// 1. PULL ALL SERVICES (GET)
// ==========================================================
export async function pullServices() {
  const services = getFileServices();
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
  const services = getFileServices();
  const bookings = getFileBookings();

  const service = services.find(s => s.id === idConvertido);
  if (!service) {
    throw new Error("Fail to find the service");
  }

  // Filter available timeslots (where choosed === false)
  const availableSlots = (service.slots || []).filter((slot: any) => !slot.choosed);

  // Verification: Can the user review this item?
  let userCanComment = false;
  if (idUser !== undefined && idUser > 0) {
    const now = new Date();
    
    // Scan booking collections for a past, unreviewed completion
    const pastBooking = bookings.find(b => 
      b.usuario_id === idUser && 
      b.servicos_id === idConvertido &&
      new Date(b.dia_horario) < now &&
      (b.comentado === null || b.comentado !== true)
    );

    if (pastBooking) {
      userCanComment = true;
    }
  }

  // Parse custom metadata payloads for reviews
  let cleanComments: any = [];
  const rawComments = service.comentarios || [];
  const users = getFileUsers();

  for (let i = 0; i < rawComments.length; i++) {
    const commentUser = users.find(u => u.id === rawComments[i].usuario_id);
    cleanComments.push({
      comentario: rawComments[i].comentario,
      avaliacaoComentario: String(rawComments[i].avaliacao),
      dataAvaliation: ParseTimeNotComplete(rawComments[i].horario),
      idUser: rawComments[i].usuario_id,
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
// 3. PULL QUEUE OF SERVICES (ADMIN METRICS FETCH)
// ==========================================================
// ==========================================================
// 3. PULL QUEUE OF SERVICES (ADMIN METRICS FETCH)
// ==========================================================
export async function pullQueueOfServices(period: string = "semana") {
  const services = getFileServices();
  const bookings = getFileBookings();
  const users = getFileUsers();

  const now = new Date();

  const upcomingBookings = bookings
    .filter((b) => new Date(b.dia_horario) > now)
    .sort((a, b) => new Date(a.dia_horario).getTime() - new Date(b.dia_horario).getTime());

  // Return a flat array instead of a metrics object
  const result = upcomingBookings.map((booking) => {
    const service = services.find((s) => s.id === booking.servicos_id);
    const user = users.find((u) => u.id === booking.usuario_id);
    return {
      idService: booking.servicos_id,
      idData: booking.idDate,
      nome_servico: service?.nome_servico || "",
      preco: service?.preco || 0,
      preco_desconto: service?.preco_desconto || null,
      horario: booking.dia_horario,
      nome: user?.nome || "Usuário Anônimo",
      number: user?.number || ""
    };
  });

  return result; // ✅ plain array, .slice() will work
}

// ==========================================================
// 4. SEARCH SERVICE CONTROLLER
// ==========================================================
export async function searchServiceController(searchValue: string) {
  const services = getFileServices();
  const decodedSearch = decodeURIComponent(searchValue).trim();
  const cleanSearch = decodedSearch.replace(/[^a-zA-Z0-9 ]/g, '');

  if (cleanSearch === "") return { services: [], quantityResult: 0 };

  const matches = services.filter(s => 
    s.nome_servico?.toLowerCase().includes(cleanSearch.toLowerCase())
  );

  let finalArray: TypeServices[] = [];
  for (let i = 0; i < matches.length; i++) {
    finalArray.push({
      id: matches[i].id,
      descricao: matches[i].descricao,
      nome_servico: matches[i].nome_servico,
      preco: matches[i].preco,
      preco_desconto: matches[i].preco_desconto,
      url: await PhotoImage(matches[i].nome_servico)
    });
  }

  return { services: finalArray, quantityResult: finalArray.length };
}

// ==========================================================
// 5. CREATE SERVICE (POST)
// ==========================================================
export async function createServiceAction({ nome_servico, preco, preco_desconto, horario, descricao }: ServiceAndData) {
  const services = getFileServices();

  if (preco_desconto !== null && Number(preco_desconto) > Number(preco)) {
    throw new Error("Preço desconto maior que preço normal");
  }

  const nextServiceId = services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 1;

  // Build the unified layout mapping related sub-entities inside a clean single object tree
  const newService = {
    id: nextServiceId,
    nome_servico,
    preco: Number(preco),
    preco_desconto: (preco_desconto !== null && preco_desconto !== "") ? Number(preco_desconto) : null,
    descricao,
    escolhido: false,
    avaliacao: { quantidade: 0, aprovacao_percentual: 0 },
    comentarios: [],
    slots: [
      {
        idDate: 1,
        dia_horario: horario,
        choosed: false
      }
    ]
  };

  services.push(newService);
  saveFileServices(services);

  return { 
    message: "Serviço e horário criados com sucesso!", 
    serviceId: nextServiceId 
  };
}

// ==========================================================
// 6. ADD NEW DATA/SLOT TO SERVICE (POST)
// ==========================================================
export async function AddNewDataController(dia_horario: string, idConvertido: number) {
  const services = getFileServices();
  const index = services.findIndex(s => s.id === idConvertido);

  if (index === -1) throw new Error("Serviço não encontrado");

  const slots = services[index].slots || [];
  const nextDateId = slots.length > 0 ? Math.max(...slots.map((sl: any) => sl.idDate)) + 1 : 1;

  slots.push({
    idDate: nextDateId,
    dia_horario: dia_horario,
    choosed: false
  });

  services[index].slots = slots;
  saveFileServices(services);

  return { message: "Data adicionada!" };
}

// ==========================================================
// 7. USER SELECT SERVICE / BOOKING OPERATION (POST)
// ==========================================================
export async function userSelectService(id: number, idService: number, horario: string, idDate: string) {
  const services = getFileServices();
  const bookings = getFileBookings();

  const serviceIndex = services.findIndex(s => s.id === idService);
  if (serviceIndex === -1) throw new Error("O serviço selecionado não existe.");

  const slots = services[serviceIndex].slots || [];
  const slotIndex = slots.findIndex((sl: any) => sl.idDate === Number(idDate));

  if (slotIndex === -1 || slots[slotIndex].choosed) {
    throw new Error("Este horário não está disponível para este serviço.");
  }

  // Lock timeslot on file array matrix
  slots[slotIndex].choosed = true;
  services[serviceIndex].slots = slots;
  saveFileServices(services);

  // Generate Booking record row entry
  const nextBookingId = bookings.length > 0 ? Math.max(...bookings.map(b => b.id)) + 1 : 1;
  bookings.push({
    id: nextBookingId,
    usuario_id: id,
    servicos_id: idService,
    idDate: Number(idDate),
    dia_horario: slots[slotIndex].dia_horario,
    choosed: true,
    comentado: null
  });
  saveFileBookings(bookings);

  return { success: true, message: "Serviço agendado com sucesso!" };
}

// ==========================================================
// 8. CHANGE SERVICE DATA (PUT)
// ==========================================================
export async function changeService({ idParameter, nome_servico, preco_desconto, preco, descricao }: servicePutParameter) {
  const services = getFileServices();
  const index = services.findIndex(s => s.id === Number(idParameter));

  if (index === -1) throw new Error("Não foi possível encontrar o serviço atual");

  let parameters: any = {};
  if (nome_servico && nome_servico !== "") parameters.nome_servico = nome_servico;
  if (descricao && descricao !== "") parameters.descricao = descricao;
  if (preco_desconto !== undefined && preco_desconto !== "") parameters.preco_desconto = Number(preco_desconto);
  if (preco && preco !== "") parameters.preco = Number(preco);

  if (Object.keys(parameters).length === 0) throw new Error("Nenhum campo para atualizar");

  services[index] = { ...services[index], ...parameters };
  saveFileServices(services);

  return { mensagem: "Serviço atualizado com sucesso" };
}

// ==========================================================
// 9. DELETE SERVICE (DELETE)
// ==========================================================
export async function deleteService(id: string) {
  const services = getFileServices();
  const updatedList = services.filter(s => s.id !== Number(id));

  if (services.length === updatedList.length) {
    throw new Error("Error in the delete of the service");
  }

  saveFileServices(updatedList);
  return { mensagem: "service deleted" };
}