import { FunctionalComponent } from "preact";
import { tFilm, tProyect } from "../types.ts";
import RFilm from "./RFilm.tsx";
import { useEffect } from "preact/hooks";
import {
  brand,
  color,
  format120,
  format35,
  formatg,
  iso,
  name,
} from "../singnals.ts";

const RFilms: FunctionalComponent<{ films: tFilm[]; cookies: tProyect[] }> = (
  props,
) => {
  const proyectNames: string[] = [];

  const filteredFilms = props.films.filter((film) => {
    if (brand.value !== "Todas" && film.brand !== brand.value) return false;

    if (iso.value !== "Todas" && film.iso.toString() !== iso.value) {
      return false;
    }

    if (
      name.value !== "Todas" &&
      film.name.toLowerCase().indexOf(name.value.toLowerCase()) === -1
    ) {
      return false;
    }

    if (
      color.value !== "Ambos" && (color.value === "true" && !film.color) ||
      (color.value === "false" && film.color)
    ) {
      return false;
    }

    if (
      formatg.value !== "Todos" &&
        (format120.value === "true" && !film.formatOneTwenty) ||
      (format120.value === "false" && film.formatOneTwenty) ||
      (format35.value === "true" && !film.formatThirtyFive) ||
      (format35.value === "false" && film.formatThirtyFive)
    ) {
      return false;
    }

    return true;
  });

  useEffect(() => {}, []);
  return (
    <div>
      <div>
        <button
          onClick={() => {
            const projectsUrl = `/proyects/${proyectNames}`;
            window.location.href = projectsUrl;
          }}
        >
          Proyectos
        </button>
      </div>
      <div className="film-grid">
        {filteredFilms.map((film: tFilm) => (
          <RFilm film={film} cookies={props.cookies} />
        ))}
      </div>
    </div>
  );
};

export default RFilms;
