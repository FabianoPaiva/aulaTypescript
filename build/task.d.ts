export {};
export interface Produto {
    id: number;
    nome: string;
    preco: number;
    ativo: boolean;
}
export declare const catalogoProdutos: Produto[];
export declare function buscarProdutoPorId(id: number): Promise<Produto>;
export declare function processarConsultaProduto(id: number): Promise<string>;
//# sourceMappingURL=task.d.ts.map