export type tFilm = {
  _id: string;
  brand: string;
  name: string;
  iso: number;
  color: boolean;
  formatThirtyFive: boolean;
  formatOneTwenty: boolean;
  description: string;
  staticImageUrl: string;
};

export type Data = {
  results: tFilm[];
};

export type tProyect = {
  pname: string;
  pfilm: tFilm[];
};
