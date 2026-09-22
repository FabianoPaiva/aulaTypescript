// Interface para definir a estrutura do Objeto Produto
export {};
export interface Produto {
  id: number;
  nome: string;
  preco: number;
  ativo: boolean;
}

// Array de Objetos contendo o catálogo inicial
export const catalogoProdutos: Produto[] = [
  { id: 1, nome: "Notebook Gamer", preco: 4500, ativo: true },
  { id: 2, nome: "Mouse Sem Fio", preco: 150, ativo: true },
  { id: 3, nome: "Teclado Mecânico", preco: 350, ativo: false },
];

/**
 * Simula uma chamada assíncrona (como uma API ou banco de dados)
 * Retorna uma Promise que resolve após um tempo simulado (setTimeout).
 */
export function buscarProdutoPorId(id: number): Promise<Produto> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const produto = catalogoProdutos.find((p) => p.id === id);
      if (produto) {
        resolve(produto); // Sucesso: retorna o objeto encontrado
      } else {
        reject(new Error(`Produto com ID ${id} não encontrado.`)); // Erro: rejeita a promise
      }
    }, 100); // Simula 100ms de latência de rede
  });
}

/**
 * Função assíncrona utilizando async/await
 * 
 * FLUXO ASSÍNCRONO EXPLICADO:
 * 1. A função é declarada como 'async', o que significa que ela sempre retornará uma Promise implicitamente.
 * 2. Quando o interpretador chega na linha 'await buscarProdutoPorId(id)', a execução desta função específica é pausada (suspensa).
 * 3. O controle do thread principal é devolvido ao ambiente (Event Loop), permitindo que outras operações síncronas continuem rodando sem travar a aplicação.
 * 4. A Promise é enviada para processamento em segundo plano. Enquanto isso, o restante da função aguarda na fila de microtarefas (Microtask Queue).
 * 5. Assim que a Promise é resolvida (ou rejeitada) após o atraso do setTimeout, o resultado é devolvido e a execução da função é retomada exatamente na linha seguinte ao 'await'.
 * 6. O bloco try/catch captura tanto o sucesso quanto possíveis exceções de forma síncrona visualmente, mas assíncrona na prática.
 */
export async function processarConsultaProduto(id: number): Promise<string> {
  try {
    // Pausa a execução até que a Promise seja resolvida
    const produto = await buscarProdutoPorId(id);
    
    // Retorno em caso de sucesso
    return `Sucesso: Produto ${produto.nome} custa R$ ${produto.preco}`;
  } catch (error: any) {
    // Retorno em caso de rejeição (erro na Promise)
    return `Erro: ${error.message}`;
  }
}

// --- CHAMADA DE TESTE (FORA DA FUNÇÃO) ---
processarConsultaProduto(1).then((resultado) => {
  console.log(resultado);
});