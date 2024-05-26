import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { tFilm, tProyect } from "../types.ts";
import RProyectos from "../components/RProyectos.tsx";
import { getCookies } from "$std/http/cookie.ts";

type Data = {
  proyectos: tProyect[];
  pCompleto?: { pname: string; pfilms: tFilm[] }[];
};
export const handler: Handlers = {
  GET: async (req: Request, ctx: FreshContext<unknown>) => {
    const cookies = getCookies(req.headers);
    console.log("Cookies:", cookies);

    if (!cookies.proyectos) {
      throw new Error("No se encontró la cookie 'proyectos'");
    }

    const proyectos: tProyect[] = JSON.parse(
      decodeURIComponent(cookies.proyectos),
    );

    return ctx.render({ proyectos });
  },
};

const Page = (props: PageProps) => {
  return <RProyectos proyectos={props.data.proyectos} />;
};

export default Page;
