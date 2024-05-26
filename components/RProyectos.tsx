import { FunctionComponent } from "preact";
import { tProyect } from "../types.ts";

type Props = {
  proyectos: tProyect[];
};

const RProyectos: FunctionComponent<Props> = ({ proyectos }) => {
  return (
    <div>
      <h1>Proyectos</h1>
      {proyectos.length === 0 ? <p>No hay proyectos disponibles.</p> : (
        <ul>
          {proyectos.map((proyecto) => (
            <li key={proyecto.pname}>
              <h2>{proyecto.pname}</h2>
              <ul>
                {proyecto.pfilm.map((film) => (
                  <li key={film._id}>{film.name}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RProyectos;
