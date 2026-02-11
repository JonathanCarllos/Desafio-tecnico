using Desafio_Api.Context;
using Desafio_Api.Enums;
using Desafio_Api.Models;
using Desafio_Api.Repository.Interface;
using Desafio_Api.Services.Interface;

namespace Desafio_Api.Services
{
    // Service responsável por conter as regras de negócio relacionadas à entidade Transacao.
    public class TransacaoService : ITransacaoService
    {
        private readonly ITransacaoRepository _transacaoRepository;
        private readonly AppDbContext _context;

        public TransacaoService(
            ITransacaoRepository transacaoRepository,
            AppDbContext context)
        {
            _transacaoRepository = transacaoRepository;
            _context = context;
        }

        public async Task<IEnumerable<Transacao>> ListarAsync()
        {
            return await _transacaoRepository.ListarAsync();
        }

        public async Task<Transacao> CriarAsync(Transacao transacao)
        {
            // Pessoa
            var pessoa = await _context.Pessoas.FindAsync(transacao.PessoaId);
            if (pessoa == null)
                throw new Exception("Pessoa não encontrada.");

            // Regra: menor de idade
            if (pessoa.Idade < 18 && transacao.Tipo == Tipo.Receita)
                throw new Exception("Menores de idade só podem registrar despesas.");

            // Categoria
            var categoria = await _context.Categorias.FindAsync(transacao.CategoriaId);
            if (categoria == null)
                throw new Exception("Categoria não encontrada.");

            // Regra: finalidade da categoria
            if (categoria.Finalidade != Finalidade.Ambas &&
                (Finalidade)transacao.Tipo != categoria.Finalidade)
                throw new Exception("Categoria incompatível com o tipo da transação.");

            // Regra: valor positivo
            if (transacao.Valor <= 0)
                throw new Exception("O valor deve ser maior que zero.");

            await _transacaoRepository.AdicionarAsync(transacao);
            await _transacaoRepository.SalvarAsync();

            return transacao;
        }
    }
}