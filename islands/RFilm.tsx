import { useEffect, useState } from "preact/hooks";
import { createRef, FunctionComponent } from "preact";
import jscookie from "npm:js-cookie@3.0.5";

import { tFilm, tProyect } from "../types.ts";

const RFilm: FunctionComponent<{ film: tFilm; cookies: tProyect[] }> = (
  props,
) => {
  const [selectedProyecto, setSelectedProyecto] = useState<string>("");
  const [nuevoProyecto, setNuevoProyecto] = useState<string>("");
  const [proyectos, setProyectos] = useState<tProyect[]>([]);

  const modalRef = createRef();
  const modalRef2 = createRef();
  const modalRef3 = createRef();

  const openModal = (ref: any) => {
    if (ref.current) {
      ref.current.style.display = "block";
    }
  };

  const closeModal = (ref: any) => {
    if (ref.current) {
      ref.current.style.display = "none";
    }
  };

  useEffect(() => {
    const proyectosCookie = jscookie.get("proyectos");
    if (proyectosCookie) {
      setProyectos(JSON.parse(proyectosCookie));
    }
  }, []);

  const handleCreateProject = (e: Event) => {
    e.preventDefault();

    const proyectoExistente = proyectos.find(
      (proyecto) => proyecto.pname === nuevoProyecto,
    );

    if (proyectoExistente) {
      alert("El proyecto ya existe 🌈");
      return;
    }

    const nuevoProyect: tProyect = {
      pname: nuevoProyecto,
      pfilm: [props.film],
    };

    const updatedProyectos = [...proyectos, nuevoProyect];

    jscookie.set("proyectos", JSON.stringify(updatedProyectos), {
      expires: 99999,
      path: "/",
    });

    setProyectos(updatedProyectos);
    setNuevoProyecto("");
    closeModal(modalRef2);
  };

  const handleAddToProject = (e: Event) => {
    e.preventDefault();

    const proyectoSeleccionado = proyectos.find(
      (proyecto) => proyecto.pname === selectedProyecto,
    );

    if (!proyectoSeleccionado) {
      alert("¡Ups! No se encontró el proyecto seleccionado");
      return;
    }

    const proyectoActualizado: tProyect = {
      ...proyectoSeleccionado,
      pfilm: [...proyectoSeleccionado.pfilm, props.film],
    };

    const updatedProyectos = proyectos.map((proyecto) =>
      proyecto.pname === selectedProyecto ? proyectoActualizado : proyecto
    );

    jscookie.set("proyectos", JSON.stringify(updatedProyectos), {
      expires: 99999,
      path: "/",
    });

    setProyectos(updatedProyectos);
    window.location.reload();
  };

  return (
    <div class="search-bar">
      <div className="film-box">
        <div style={{ textAlign: "center", marginBottom: "10px" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>
            {props.film.name}
          </h2>
          <p>
            <strong>Brand:</strong> {props.film.brand}
          </p>
          <p>
            <strong>Iso:</strong> {props.film.iso}
          </p>
          <p>
            <strong>Formato:</strong>{" "}
            {props.film.formatOneTwenty ? "f.1.20" : ""}
            {props.film.formatThirtyFive ? "f.35" : ""}
          </p>
          <p>
            <strong>Color:</strong>{" "}
            {props.film.color ? "A color" : "Blanco y negro"}
          </p>
        </div>
        <img
          src={props.film.staticImageUrl}
          alt={props.film.name}
          style={{ maxWidth: "200px", marginBottom: "10px" }}
        />
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => {}}>
            +info
          </button>

          <button onClick={() => openModal(modalRef)}>+add</button>
          <div id="myModal" class="modal" ref={modalRef}>
            <div class="modal-content">
              <span class="close" onClick={() => closeModal(modalRef)}>
                &times;
              </span>
              <p>Que quieres hacer:</p>
              <button onClick={() => openModal(modalRef2)}>
                Crear un proyecto
              </button>
              <div id="myModal2" class="modal" ref={modalRef2}>
                <div class="modal-content">
                  <span class="close" onClick={() => closeModal(modalRef2)}>
                    &times;
                  </span>
                  <p>Pon un nombre a tu proyecto</p>
                  <form onSubmit={handleCreateProject}>
                    <input
                      type="text"
                      name="name"
                      placeholder="Nombre del proyecto"
                      value={nuevoProyecto}
                      onInput={(e: any) => setNuevoProyecto(e.target.value)}
                      required
                    />
                    <button type="submit">Crear</button>
                  </form>
                </div>
              </div>
              <p>----------</p>

              <button onClick={() => openModal(modalRef3)}>
                Añadir a proyecto
              </button>
              <div id="myModal3" class="modal" ref={modalRef3}>
                <div class="modal-content">
                  <span class="close" onClick={() => closeModal(modalRef3)}>
                    &times;
                  </span>
                  <p>Elige el proyecto al cual lo quieras añadir</p>
                  <form onSubmit={handleAddToProject}>
                    <select
                      value={selectedProyecto}
                      onChange={(e: any) => setSelectedProyecto(e.target.value)}
                      required
                    >
                      <option value="">Selecciona un proyecto</option>
                      {proyectos.map((proyecto) => (
                        <option value={proyecto.pname} key={proyecto.pname}>
                          {proyecto.pname}
                        </option>
                      ))}
                    </select>
                    <button type="submit">Añadir</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RFilm;
