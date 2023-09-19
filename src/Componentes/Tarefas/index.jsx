import { useEffect, useState } from "react";
import { Star, Editar, Cores, Fechar, Star2 } from "../../imagens";
import "./style.css";
import {
  atualizaCorTarefa,
  atualizaFavorito,
  excluirTarefas,
  todasTarefasIndex,
} from "../../Serviço/api";
import TextoEditavel from "./componentes/textoEditavel";
export default function Tarefa() {
  const [atualizar, setAtualizar] = useState(true);
  const [modalVisivel, setModalVisivel] = useState(false);
  const [tarefaSelecionada, setTarefaSelecionada] = useState(null);
  const [tarefas, setTarefas] = useState([]);
  const [corSelecionada, setCorSelecionada] = useState(null);
  const cores = [
    "#FFFFFF",
    "#BAE2FF",
    "#B9FFDD",
    "#FFE8AC",
    "#FFCAB9",
    "#F99494",
    "#9DD6FF",
    "#ECA1FF",
    "#DAFF8B",
    "#CDCDCD",
    "#979797",
    "#A99A7C",
  ];
  useEffect(() => {
    todasTarefas();
  }, [atualizar]);
  const todasTarefas = async () => {
    const res = await todasTarefasIndex();
    setTarefas(res.data);
  };
  const favoritarTarefa = async (_id, favorito) => {
    await atualizaFavorito(_id, !favorito);
    setAtualizar(!atualizar);
  };
  const editarTarefa = (index, tarefa) => {
    setTarefaSelecionada(index.tarefa);
    setCorSelecionada(index.tarefa.cor);
    setModalVisivel(true);
  };
  const fecharModal = () => {
    setModalVisivel(false);
    setAtualizar(!atualizar);
  };
  const mostrarCor = (cor) => {
    setCorSelecionada(cor);
  };
  const atualizarCor = async (_id, cor) => {
    setModalVisivel(false);
    await atualizaCorTarefa(_id, cor);
    setAtualizar(!atualizar);
  };
  const excluirTarefa = async (id) => {
    await excluirTarefas(id);
    setAtualizar(!atualizar);
  };

  return (
    <div className="conteudo_tarefa">
      <div className="nome_favoritos">
        {tarefas.some((tarefa) => tarefa.favorito) ? "Favoritos" : null}
      </div>
      <div className="conteiner_tarefas">
        {tarefas.map(
          (tarefa, index) =>
            tarefa.favorito === true && (
              <div key={index}>
                <div
                  className="corpo_tarefa"
                  style={{
                    backgroundColor: tarefa.cor,
                  }}
                >
                  <div className="header_tarefa">
                    <div className="titulo_tarefa">{tarefa.titulo}</div>
                    <div className="favorito_tarefa">
                      <img
                        src={tarefa.favorito ? Star2 : Star}
                        alt="Favorito"
                        onClick={() =>
                          favoritarTarefa(tarefa._id, tarefa.favorito)
                        }
                      />
                    </div>
                  </div>
                  <div className="texto_tarefa">{tarefa.texto}</div>
                  <div>
                    <div className="opcoes_tarefa">
                      <div className="editar_tarefa">
                        <div className="editar_texto">
                          <img
                            src={Editar}
                            alt="Editar"
                            onClick={() => editarTarefa({ index, tarefa })}
                          />
                        </div>
                        <div className="editar_cores">
                          <img
                            src={Cores}
                            alt="Cores"
                            onClick={() => editarTarefa({ index, tarefa })}
                          />
                        </div>
                      </div>
                      <div>
                        <img
                          src={Fechar}
                          alt="Fechar"
                          onClick={() => excluirTarefa(tarefa._id)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
        )}
      </div>
      <div className="nome_outras_tarefas">
        {tarefas.some((tarefa) => !tarefa.favorito) ? "Outras Tarefas" : null}
      </div>
      <div className="conteiner_tarefas">
        {tarefas.map(
          (tarefa, index) =>
            tarefa.favorito === false && (
              <div key={index}>
                <div
                  className="corpo_tarefa"
                  style={{
                    backgroundColor: tarefa.cor,
                  }}
                >
                  <div className="header_tarefa">
                    <div className="titulo_tarefa">{tarefa.titulo}</div>
                    <div className="favorito_tarefa">
                      <img
                        src={tarefa.favorito ? Star2 : Star}
                        alt="Favorito"
                        onClick={() =>
                          favoritarTarefa(tarefa._id, tarefa.favorito)
                        }
                      />
                    </div>
                  </div>
                  <div className="texto_tarefa">{tarefa.texto}</div>
                  <div>
                    <div className="opcoes_tarefa">
                      <div className="editar_tarefa">
                        <div className="editar_texto">
                          <img
                            src={Editar}
                            alt="Editar"
                            onClick={() => editarTarefa({ index, tarefa })}
                          />
                        </div>
                        <div className="editar_cores">
                          <img
                            src={Cores}
                            alt="Cores"
                            onClick={() => editarTarefa({ index, tarefa })}
                          />
                        </div>
                      </div>
                      <div>
                        <img
                          src={Fechar}
                          alt="Fechar"
                          onClick={() => excluirTarefa(tarefa._id)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
        )}
      </div>
      <div>
        {modalVisivel && (
          <div className="modal">
            <div className="modal-conteudo">
              {tarefaSelecionada && (
                <div
                  key={tarefaSelecionada.index}
                  className="corpo_tarefa"
                  style={{
                    backgroundColor: modalVisivel
                      ? corSelecionada
                      : tarefaSelecionada.cor,
                  }}
                >
                  <div className="header_tarefa">
                    <div className="titulo_tarefa">
                      <TextoEditavel titulo={true} tarefa={tarefaSelecionada} />
                    </div>
                    <div className="favorito_tarefa">
                      <img
                        src={tarefaSelecionada.favorito ? Star2 : Star}
                        alt="Favorito"
                        onClick={() =>
                          favoritarTarefa(
                            tarefaSelecionada._id,
                            tarefaSelecionada.favorito
                          )
                        }
                      />
                    </div>
                  </div>
                  <div className="texto_tarefa">
                    <TextoEditavel titulo={false} tarefa={tarefaSelecionada} />
                  </div>
                  <div>
                    <div className="opcoes_tarefa">
                      <div className="editar_tarefa">
                        <div className="editar_texto">
                          <img src={Editar} alt="Editar" />
                        </div>
                        <div className="editar_cores">
                          <img src={Cores} alt="Cores" />
                        </div>
                      </div>
                      <div>
                        <img src={Fechar} alt="Fechar" onClick={fecharModal} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div>
                <div>
                  <div
                    className="corpo_cores_tarefa"
                    style={{
                      backgroundColor: modalVisivel
                        ? corSelecionada
                        : tarefaSelecionada.cor,
                    }}
                  >
                    {cores.map((cor, index) => (
                      <div
                        key={index}
                        className="amostra_cores"
                        style={{ backgroundColor: cor }}
                        onMouseEnter={() => mostrarCor(cor)}
                        onMouseLeave={() => mostrarCor(tarefaSelecionada.cor)}
                        onClick={() => atualizarCor(tarefaSelecionada._id, cor)}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
