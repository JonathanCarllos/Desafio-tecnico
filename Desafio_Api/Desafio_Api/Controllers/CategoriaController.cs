
using Desafio_Api.DTO_s;
using Desafio_Api.Services.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Desafio_Api.Controllers
{
    // Controller responsável por expor os endpoints HTTP da entidade Categoria.
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriaController : ControllerBase
    {
        private readonly ICategoriaService _categoriaService;

        public CategoriaController(ICategoriaService categoriaService)
        {
            _categoriaService = categoriaService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoriaDTO>>> Get()
        {
            var categorias = await _categoriaService.GetCategoria();

            if (!categorias.Any())
                return NotFound("Categoria não encontrada");

            return Ok(categorias);
        }


        [HttpPost]
        public async Task<ActionResult<CategoriaDTO>> Post([FromBody] CategoriaDTO categoriaDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            await _categoriaService.AddCategoria(categoriaDTO);

            return CreatedAtAction(
                nameof(Get),
                new { id = categoriaDTO.CategoriaId },
                categoriaDTO
            );
        }


    }
}
