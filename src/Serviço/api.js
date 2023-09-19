import axios from "axios";

export const api = axios.create({
  baseURL: "https://corelab-api-challenge-h8ne6b9fo-leotolotti.vercel.app",
});

export const todasTarefasIndex = async () => {
  let url = `/tarefas`;
  return api.get(url);
};
export const tarefasIndex = async (texto) => {
  let url = `/tarefas/${texto}`;
  return api.get(url);
};
export const novaTarefas = async (titulo, texto, cor, favorito) => {
  let url = `/tarefas`;
  return api.post(url, {
    titulo: titulo,
    texto: texto,
    cor: cor,
    favorito: favorito,
  });
};
export const atualizaFavorito = async (_id, favorito) => {
  let url = `/tarefas/${_id}/favorito`;
  return api.post(url, {
    favorito: favorito,
  });
};
export const atualizaTitulo = async (_id, titulo) => {
  let url = `/tarefas/${_id}/titulo`;
  return api.post(url, {
    titulo: titulo,
  });
};
export const atualizaTexto = async (_id, texto) => {
  let url = `/tarefas/${_id}/texto`;
  return api.post(url, {
    texto: texto,
  });
};
export const atualizaCorTarefa = async (_id, cor) => {
  let url = `/tarefas/${_id}/cor`;
  return api.post(url, {
    cor: cor,
  });
};
export const excluirTarefas = async (_id) => {
  let url = `/tarefas/${_id}`;
  return api.delete(url);
};
