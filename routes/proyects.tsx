import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { tFilm, tProyect } from "../types.ts";
import RProyectos from "../components/RProyectos.tsx";
import { getCookies } from "$std/http/cookie.ts";
type Data = {
  proyectos: tProyect[];
};
export const handler: Handlers = {
  GET: (req: Request, ctx: FreshContext<unknown>) => {
    // Obtener las cookies de la solicitud
    const cookies = getCookies(req.headers);
    const proyectos = JSON.parse(cookies.proyectos);
    return ctx.render({ proyectos });
  },
};

const Page = (props: PageProps<Data>) => {
  const proyectos = props.data.proyectos;
  return <RProyectos proyectos={proyectos} />;
};

export default Page;
