using Desafio_Api.Context;
using Desafio_Api.Models;
using Desafio_Api.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace Desafio_Api.Repository
{
    // Repository responsável por realizar operações de acesso ao banco de dados da entidade Pessoa.

    public class PessoaRepository : IPessoaRepository
    {
        private readonly AppDbContext _context;

        public PessoaRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Pessoa> Create(Pessoa pessoa)
        {
            _context.Pessoas.Add(pessoa);
            await _context.SaveChangesAsync();
            return pessoa;
        }

        public async Task<Pessoa?> Delete(int id)
        {
            var pessoa = await GetById(id);
            if (pessoa == null)
                return null;

            _context.Pessoas.Remove(pessoa);
            await _context.SaveChangesAsync();
            return pessoa;
        }

        public async Task<IEnumerable<Pessoa>> GetAll()
        {
            return await _context.Pessoas
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<Pessoa?> GetById(int id)
        {
            return await _context.Pessoas
                .Include(p => p.Transacoes)
                .FirstOrDefaultAsync(p => p.PessoaId == id);
        }

        public async Task<Pessoa> Update(Pessoa pessoa)
        {
            _context.Pessoas.Update(pessoa);
            await _context.SaveChangesAsync();
            return pessoa;
        }

    }
}
