using Desafio_Api.Context;
using Desafio_Api.Models;
using Desafio_Api.Repository.Interface;
using Microsoft.EntityFrameworkCore;

namespace Desafio_Api.Repository
{
    // Repository responsável por realizar operações de acesso ao banco de dados da entidade Categoria.

    public class CategoriaRepository : ICategoriaRepository
    {
        private readonly AppDbContext _context;

        public CategoriaRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Categoria> Create(Categoria categoria)
        {
           _context.Categorias.Add(categoria);
            await _context.SaveChangesAsync();
            return categoria;
        }

        public async Task<IEnumerable<Categoria>> GetAll()
        {
            return await _context.Categorias.ToListAsync();
        }
    }
}
