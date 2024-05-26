import { Handlers } from "$fresh/server.ts";
import { PageProps } from "$fresh/server.ts";
import RFilms from "../islands/RFilms.tsx";
import FiltrosGuapos from "../islands/FiltrosGuapos.tsx";
import { tCookie, tFilm, tProyect } from "../types.ts";
import jscookie from "npm:js-cookie@3.0.5";

export const handler: Handlers<tFilm[]> = {
  GET: async (_req, ctx) => {
    const url = "https://filmapi.vercel.app/api/films";
    try {
      const res = await fetch(url);
      const films: tFilm[] = await res.json();
      return ctx.render(films);
    } catch (e) {
      console.error(e);
      return new Response(e.message, { status: 500 });
    }
  },
};

export default (props: PageProps<tFilm[]>) => {
  const films = props.data;
  const cookies: tCookie[] = JSON.parse(jscookie.get("proyectos") || "[]");
  // {<FiltrosGuapos films={films} />}
  return ( //<RPerfiles usuarios={usuarios} />
    <>
      <FiltrosGuapos films={films} />
      <RFilms films={films} cookies={cookies} />
    </>
  );
};
