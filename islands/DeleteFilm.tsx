import { createRef, FunctionComponent } from "preact";
import { useEffect, useState } from "preact/hooks";
import jscookie from "npm:js-cookie@3.0.5";
import { tProyect } from "../types.ts";

export const DeleteFilm: FunctionComponent<{ proyectos: tProyect[] }> = (
  props,
) => {
  const [nombreProyecto, setNombreProyecto] = useState<string>("");
  const [film, setFilm] = useState<string>("");
  const [films, setFilms] = useState<string[]>([]);
  const modalRef = createRef<HTMLDivElement>();

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

  useEffect(() => {
    const selectedProject = props.proyectos.find((p) =>
      p.pname === nombreProyecto
    );
    if (selectedProject) {
      setFilms(selectedProject.pfilm.map((f) => f._id));
    } else {
      setFilms([]);
    }
  }, [nombreProyecto]);

  const borrar = () => {
    const updatedProyectos = props.proyectos.map((p) => {
      if (p.pname === nombreProyecto) {
        const updatedFilms = p.pfilm.filter((f) => f._id !== film);
        return { ...p, pfilm: updatedFilms };
      }
      return p;
    });

    const cookieData = updatedProyectos.map((p) => ({
      pname: p.pname,
      pfilm: p.pfilm.map((f) => f._id),
    }));

    jscookie.set("proyectos", JSON.stringify(cookieData), {
      expires: 99999,
      path: "/",
    });
    window.location.reload();
  };

  return (
    <div>
      <button onClick={openModal}>
        Borrar una peli
      </button>
      <div id="myModal" class="modal" ref={modalRef}>
        <div class="modal-content">
          <span class="close" onClick={closeModal}>
            &times;
          </span>
          <p>Elige el proyecto y la película que quieras eliminar</p>
          <select
            value={nombreProyecto}
            onChange={(e) =>
              setNombreProyecto((e.target as HTMLSelectElement).value)}
          >
            <option value="">Seleccione un proyecto</option>
            {props.proyectos.map((p) => (
              <option key={p.pname} value={p.pname}>{p.pname}</option>
            ))}
          </select>
          <select
            value={film}
            onChange={(e) => setFilm((e.target as HTMLSelectElement).value)}
            disabled={!nombreProyecto}
          >
            <option value="">Seleccione una película</option>
            {films.map((filmId) => (
              <option key={filmId} value={filmId}>{filmId}</option>
            ))}
          </select>
          <button onClick={borrar} disabled={!film}>
            Borrar
          </button>
        </div>
      </div>
    </div>
  );
};
