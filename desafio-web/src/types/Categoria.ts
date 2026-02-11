import { FinalidadeCategoria } from "./FinalidadeCategoria";

export interface Categoria {
  categoriaId: number;
  descricao: string;
  finalidade: FinalidadeCategoria;
}
