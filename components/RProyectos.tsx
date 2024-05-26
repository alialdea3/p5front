import { FunctionComponent } from "preact";
import { tFilm } from "../types.ts";
import BackButton from "../islands/BackButton.tsx";
import { DeleteButton } from "../islands/DeleteButton.tsx";
import { DeleteFilm } from "../islands/DeleteFilm.tsx";

type Props = {
  proyectos: { pname: string; pfilm: tFilm[] }[];
};

const RProyectos: FunctionComponent<Props> = ({ proyectos }) => {
  return (
    <div>
      <BackButton />
      <div class="container">
        <h1 class="title">Proyectos</h1>
        <DeleteButton proyectos={proyectos} />
        <DeleteFilm proyectos={proyectos} />
        {proyectos.length === 0 ? <p>No hay proyectos disponibles.</p> : (
          <ul>
            {proyectos.map((proyecto) => (
              <li key={proyecto.pname} class="project-container">
                <h2 class="project-title">{proyecto.pname}</h2>
                <ul class="film-list">
                  {proyecto.pfilm.map((film) => (
                    <li key={film._id} class="film-item">{film.name}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RProyectos;
