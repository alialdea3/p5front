import { FunctionComponent } from "preact";
import { tFilm } from "../types.ts";
import {
  brand,
  color,
  format120,
  format35,
  formatg,
  iso,
  name,
} from "../singnals.ts";

export const FiltrosGuapos: FunctionComponent<{ films: tFilm[] }> = (props) => {
  const marcas = Array.from(new Set(props.films.map((film) => film.brand)));
  marcas.unshift("Todas");

  const isos: string[] = Array.from(
    new Set(props.films.map((film) => film.iso.toString())),
  );
  isos.unshift("Todas");

  const colores: string[] = ["Ambos", "A color", "Blanco y Negro"];
  const formatos: string[] = ["Todos", "Ambos", "f.35", "f.1.20"];

  return (
    <div class="search-bar">
      <div class="filters-container">
        <div class="search-box">
          <label class="search-label">Marca:</label>
          <select
            class="search-select"
            value={"Todas"}
            onInput={(e) => {
              brand.value = e.currentTarget.value;
            }}
          >
            {marcas.map((br, index) => <option key={index}>{br}</option>)}
          </select>
        </div>

        <div class="search-box">
          <label class="search-label">Iso:</label>
          <select
            class="search-select"
            value={"Todas"}
            onInput={(e) => {
              iso.value = e.currentTarget.value;
            }}
          >
            {isos.map((br, index) => <option key={index}>{br}</option>)}
          </select>
        </div>

        <div class="search-box">
          <label class="search-label">Color:</label>
          <select
            class="search-select"
            value={"Ambos"}
            onInput={(e) => {
              if (e.currentTarget.value === "A color") {
                color.value = "true";
              }
              if (e.currentTarget.value === "Blanco y Negro") {
                color.value = "false";
              }
              if (e.currentTarget.value === "Ambos") {
                color.value = "Ambos";
              }
            }}
          >
            {colores.map((br, index) => <option key={index}>{br}</option>)}
          </select>
        </div>

        <div class="search-box">
          <label class="search-label">Formatos:</label>
          <select
            class="search-select"
            value={"Todos"}
            onInput={(e) => {
              const selectedValue = e.currentTarget.value;
              if (selectedValue === "Ambos") {
                format35.value = "true";
                format120.value = "true";
                formatg.value = "x";
              } else if (selectedValue === "Todos") {
                formatg.value = "Todos";
                format35.value = "Todos";
                format120.value = "Todos";
              } else {
                format35.value = selectedValue === "f.35" ? "true" : "false";
                format120.value = selectedValue === "f.1.20" ? "true" : "false";
                formatg.value = "x";
              }
            }}
          >
            {formatos.map((br, index) => <option key={index}>{br}</option>)}
          </select>
        </div>

        <div class="search-box">
          <label class="search-label">Nombre:</label>
          <input
            class="search-input"
            onInput={(e) => {
              name.value = e.currentTarget.value;
            }}
          >
          </input>
        </div>
      </div>
    </div>
  );
};

export default FiltrosGuapos;
