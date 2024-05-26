// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $api_joke from "./routes/api/joke.ts";
import * as $greet_name_ from "./routes/greet/[name].tsx";
import * as $index from "./routes/index.tsx";
import * as $info_id_ from "./routes/info/[id].tsx";
import * as $proyects from "./routes/proyects.tsx";
import * as $FiltrosGuapos from "./islands/FiltrosGuapos.tsx";
import * as $RFilm from "./islands/RFilm.tsx";
import * as $RFilmComplete from "./islands/RFilmComplete.tsx";
import * as $RFilms from "./islands/RFilms.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/api/joke.ts": $api_joke,
    "./routes/greet/[name].tsx": $greet_name_,
    "./routes/index.tsx": $index,
    "./routes/info/[id].tsx": $info_id_,
    "./routes/proyects.tsx": $proyects,
  },
  islands: {
    "./islands/FiltrosGuapos.tsx": $FiltrosGuapos,
    "./islands/RFilm.tsx": $RFilm,
    "./islands/RFilmComplete.tsx": $RFilmComplete,
    "./islands/RFilms.tsx": $RFilms,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
