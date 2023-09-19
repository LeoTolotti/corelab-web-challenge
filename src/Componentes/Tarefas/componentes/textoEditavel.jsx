import React, { useState } from "react";
import { atualizaTexto, atualizaTitulo } from "../../../Serviço/api";

function TextoEditavel(props) {
  const [editando, setEditando] = useState(false);
  const [valor, setValor] = useState(
    props.titulo ? props.tarefa.titulo : props.tarefa.texto
  );

  const clickInput = () => {
    setEditando(true);
  };

  const mudarInput = (e) => {
    setValor(e.target.value);
  };

  const mudarFoco = () => {
    setEditando(false);
    if (props.titulo) {
      tituloAlterado();
    } else {
      textoAlterado();
    }
  };
  const tituloAlterado = async () => {
    await atualizaTitulo(props.tarefa._id, valor);
  };
  const textoAlterado = async () => {
    await atualizaTexto(props.tarefa._id, valor);
  };
  return (
    <div className="texto_editavel">
      {editando ? (
        <input
          type="text"
          value={valor}
          onChange={mudarInput}
          onBlur={mudarFoco}
          autoFocus
        />
      ) : (
        <p onClick={clickInput}>{valor}</p>
      )}
    </div>
  );
}

export default TextoEditavel;
