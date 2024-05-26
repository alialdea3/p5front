import { tFilm } from "../../types.ts";
import RFilmComplete from "../../islands/RFilmComplete.tsx";
import { FreshContext, Handlers } from "$fresh/server.ts";
import { PageProps } from "$fresh/server.ts";

export const handler: Handlers = {
  GET: async (req: Request, ctx: FreshContext<unknown>) => {
    const { id } = ctx.params;
    const response = await fetch("https://filmapi.vercel.app/api/films");
    const data = await response.json();
    const film = data.find((f: tFilm) => f._id === id);
    if (!film) {
      return ctx.renderNotFound();
    }
    return ctx.render({ film });
  },
};

export default (props: PageProps) => {
  const { film } = props.data;
  return (
    <>
      <RFilmComplete film={film} />
    </>
  );
};
