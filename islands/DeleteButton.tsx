import { createRef, FunctionComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import jscookie from "npm:js-cookie@3.0.5";
import { tProyect } from "../types.ts";

export const DeleteButton: FunctionComponent<{ proyectos: tProyect[] }> = (
  props,
) => {
  const [nombreProyecto, setNombreProyecto] = useState<string>("");
  const [uniqueProyectos, setUniqueProyectos] = useState<string[]>([]);
  const modalRef = createRef<HTMLDivElement>();

  useEffect(() => {
    const uniqueNames = Array.from(
      new Set(props.proyectos.map((p) => p.pname)),
    );
    setUniqueProyectos(uniqueNames);
  }, [props.proyectos]);

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.style.display = "block";
    }
  };

  const closeModal = () => {
    if (modalRef.current) {
      modalRef.current.style.display = "none";
    }
  };

  const borrar = () => {
    const nuevoProyect = props.proyectos.filter((p) =>
      p.pname !== nombreProyecto
    );
    const cookie = nuevoProyect.map((p) => {
      const film_ids = p.pfilm.map((f) => f._id);
      return { pname: p.pname, pfilm: film_ids };
    });

    jscookie.set(
      "proyectos",
      JSON.stringify(cookie),
      { expires: 99999, path: "/" },
    );
    window.location.reload();
  };

  return (
    <div>
      <button onClick={openModal}>
        Borrar un proyecto
      </button>
      <div id="myModal" class="modal" ref={modalRef}>
        <div class="modal-content">
          <span class="close" onClick={closeModal}>
            &times;
          </span>
          <p>Elige el proyecto que quieras eliminar</p>
          <select
            value={nombreProyecto}
            onChange={(e) =>
              setNombreProyecto((e.target as HTMLSelectElement).value)}
          >
            <option value="">Seleccione un proyecto</option>
            {uniqueProyectos.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
          <button onClick={borrar} disabled={!nombreProyecto}>
            Borrar
          </button>
        </div>
      </div>
    </div>
  );
};
