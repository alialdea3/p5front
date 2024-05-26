import { FunctionComponent } from "preact";
import { tFilm } from "../types.ts";

type Props = {
  film: tFilm;
};

const RFilmComplete: FunctionComponent<Props> = ({ film }) => {
  if (!film) {
    return <div>las cagao</div>;
  }
  return (
    <div class="search-bar">
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>{film.name}</h2>
        <p>
          <strong>Brand:</strong> {film.brand}
        </p>
        <p>
          <strong>Iso:</strong> {film.iso}
        </p>
        <p>
          <strong>Formato:</strong> {film.formatOneTwenty ? "f.1.20" : ""}
          {film.formatThirtyFive ? "f.35" : ""}
        </p>
        <p>
          <strong>Color:</strong> {film.color ? "A color" : "Blanco y negro"}
        </p>
        <p>
          <strong>Descripcion:</strong> {film.description}
        </p>
      </div>
      <img
        src={film.staticImageUrl}
        alt={film.name}
        style={{ maxWidth: "200px", marginBottom: "10px" }}
      />
      <button
        onClick={(e) => {
          window.location.href = `/`;
        }}
      >
        Back
      </button>
    </div>
  );
};

export default RFilmComplete;
