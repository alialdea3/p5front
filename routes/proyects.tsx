import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { tFilm, tProyect } from "../types.ts";
import RProyectos from "../components/RProyectos.tsx";
import { getCookies } from "$std/http/cookie.ts";
import jscookie from "npm:js-cookie@3.0.5";

type Data = {
  proyectos: tProyect[];
};

export const handler: Handlers = {
  GET: async (req: Request, ctx: FreshContext<unknown>) => {
    const cookies = getCookies(req.headers);
    console.log("Cookies:", cookies);

    let pCompleto: { pname: string; pfilm: tFilm[] }[] = [];

    if (!cookies.proyectos) {
      jscookie.set("proyectos", JSON.stringify([]), {
        expires: 99999,
        path: "/",
      });
    } else {
      const proyectos: tProyect[] = JSON.parse(
        decodeURIComponent(cookies.proyectos),
      );

      const res = await fetch("https://filmapi.vercel.app/api/films");
      const data: tFilm[] = await res.json();

      pCompleto = proyectos.map((proyecto) => {
        const films = proyecto.pfilm
          .map((filmId) => {
            return data.find((f: tFilm) => f._id === filmId) as tFilm;
          })
          .filter((film): film is tFilm => film !== undefined);
        return { pname: proyecto.pname, pfilm: films };
      });
    }

    return ctx.render({ proyectos: pCompleto });
  },
};

const Page = (props: PageProps<Data>) => {
  return <RProyectos proyectos={props.data.proyectos} />;
};

export default Page;
