import React, { useState } from "react";
import {
  Fechar,
  Pesquisa,
  Logo,
  Star,
  Star2,
  Editar,
  Cores,
} from "../../imagens";
import "./style.css";
import { tarefasIndex } from "../../Serviço/api";

export default function Header() {
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [pesquisa, setPesquisa] = useState(false);
  const [resPesquisa, setResPesquisa] = useState([]);
  function homePage() {
    window.location.reload();
  }
  const handlePesquisa = async (event) => {
    setTermoPesquisa(event.target.value);
    const res = await tarefasIndex(event.target.value);
    setResPesquisa(res.data);
    setPesquisa(true);
  };
  function fecharPage() {
    window.location.reload();
  }
  return (
    <div>
      <div className="header">
        <div className="barra_logo" onClick={homePage}>
          <img src={Logo} alt="Logo" className="barra_img" />
          <div className="barra_nome">CoreNotes</div>
        </div>
        <div className="barra_pesquisa">
          <input
            type="text"
            placeholder="Pesquisar"
            value={termoPesquisa}
            onChange={handlePesquisa}
          />
          <img src={Pesquisa} alt="Pesquisar" className="img_pesquisa" />
        </div>
        <div className="barra_fechar" onClick={fecharPage}>
          <img src={Fechar} alt="Fechar" className="img_fechar" />
        </div>
      </div>
      {pesquisa && (
        <div className="conteudo_tarefa">
          <div className="nome_favoritos">
            {resPesquisa.length > 0 ? "Pesquisa" : null}
          </div>
          <div className="conteiner_tarefas">
            {resPesquisa.map((tarefa, index) => (
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
                      />
                    </div>
                  </div>
                  <div className="texto_tarefa">{tarefa.texto}</div>
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
                        <img src={Fechar} alt="Fechar" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
