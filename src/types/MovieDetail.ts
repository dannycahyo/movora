import type {
  BaseMovie,
  Genre,
  Collection,
  ProductionCompany,
  ProductionCountry,
  SpokenLanguage,
} from "./MovieBase";

export interface MovieDetail extends BaseMovie {
  belongs_to_collection: Collection | null;
  budget: number;
  genres: Genre[];
  homepage: string;
  imdb_id: string;
  origin_country: string[];
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
}
