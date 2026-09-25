import { describe, it, expect } from 'vitest';
import { catalogoProdutos, buscarProdutoPorId, processarConsultaProduto } from './task.js';
describe('Testes do Módulo de Produtos e Assincronicidade', () => {
    // Teste de Arrays e Objetos
    it('deve validar a estrutura e o conteúdo do array de produtos', () => {
        expect(catalogoProdutos).toHaveLength(3);
        expect(catalogoProdutos[0]).toEqual({
            id: 1,
            nome: 'Notebook Gamer',
            preco: 4500,
            ativo: true,
        });
    });
    // Teste de Promise resolvida com sucesso
    it('deve retornar o produto correto ao buscar por um ID existente', async () => {
        const produto = await buscarProdutoPorId(2);
        expect(produto).toMatchObject({
            id: 2,
            nome: 'Mouse Sem Fio',
        });
    });
    // Teste de Promise rejeitada (Erro)
    it('deve rejeitar a promessa se o produto não for encontrado', async () => {
        await expect(buscarProdutoPorId(99)).rejects.toThrow('Produto com ID 99 não encontrado.');
    });
    // Teste da função async/await (Cenário de Sucesso)
    it('deve processar a consulta do produto com sucesso usando async/await', async () => {
        const resultado = await processarConsultaProduto(1);
        expect(resultado).toBe('Sucesso: Produto Notebook Gamer custa R$ 4500');
    });
    // Teste da função async/await (Cenário de Erro tratado)
    it('deve capturar o erro e retornar a mensagem formatada no async/await', async () => {
        const resultado = await processarConsultaProduto(999);
        expect(resultado).toBe('Erro: Produto com ID 999 não encontrado.');
    });
});
//# sourceMappingURL=task.spec.js.map