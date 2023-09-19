import React, { useState } from "react";
import { Star, Star2 } from "../../imagens";
import "./style.css";
import { novaTarefas } from "../../Serviço/api";

export default function NovaTarefa() {
  const [editandoTitulo, setEditandoTitulo] = useState(false);
  const [editandoTexto, setEditandoTexto] = useState(false);
  const [inputTitulo, setInputTitulo] = useState("Título");
  const [inputTexto, setInputTexto] = useState("Criar nota...");
  const [inputFavorito, setInputFavorito] = useState(false);
  const [favorito, setFavorito] = useState(Star);

  const clickInputTitulo = () => {
    setInputTitulo("");
    setEditandoTitulo(true);
  };
  const mudarInputTitulo = (e) => {
    setInputTitulo(e.target.value);
  };
  const mudarFocoTitulo = () => {
    if (inputTitulo.length > 0) {
      setEditandoTitulo(false);
    } else {
      setInputTitulo("Título");
      setEditandoTitulo(false);
    }
  };
  const clickInputTexto = () => {
    setInputTexto("");
    setEditandoTexto(true);
  };
  const mudarInputTexto = (e) => {
    setInputTexto(e.target.value);
  };
  const mudarFocoTexto = () => {
    if (inputTexto.length > 0) {
      setEditandoTitulo(false);
    } else {
      setEditandoTexto(false);
      setInputTexto("Criar nota...");
    }
  };
  const teclaEnter = (e) => {
    if (e.key === "Enter") {
      criarNota();
    }
  };
  function favoritarTarefa() {
    if (favorito === Star) {
      setFavorito(Star2);
      setInputFavorito(true);
    } else {
      setFavorito(Star);
      setInputFavorito(false);
    }
  }
  const criarNota = async () => {
    if (inputTitulo.length > 0 && inputTexto.length > 0) {
      await novaTarefas(inputTitulo, inputTexto, "#FFF", inputFavorito);
      window.location.reload();
    } else {
      window.location.reload();
    }
  };
  return (
    <div className="nova_tarefa">
      <div className="corpo_nova_tarefa">
        <div className="header_tarefa">
          <div className="titulo_tarefa">
            {editandoTitulo ? (
              <input
                type="text"
                value={inputTitulo}
                onChange={mudarInputTitulo}
                onBlur={mudarFocoTitulo}
                onKeyUp={teclaEnter}
                autoFocus
              />
            ) : (
              <p onClick={clickInputTitulo}>{inputTitulo}</p>
            )}
          </div>
          <div className="favorito_tarefa">
            <img src={favorito} alt="Favorito" onClick={favoritarTarefa} />
          </div>
        </div>
        <div className="texto_tarefa">
          {editandoTexto ? (
            <input
              type="text"
              value={inputTexto}
              onChange={mudarInputTexto}
              onBlur={mudarFocoTexto}
              onKeyUp={teclaEnter}
              autoFocus
            />
          ) : (
            <p onClick={clickInputTexto}>{inputTexto}</p>
          )}
        </div>
      </div>
    </div>
  );
}
