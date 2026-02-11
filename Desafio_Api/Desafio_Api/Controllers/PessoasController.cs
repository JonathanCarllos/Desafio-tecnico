using Desafio_Api.DTO_s;
using Desafio_Api.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace Desafio_Api.Controllers
{
    // Controller responsável por expor os endpoints HTTP da entidade Pessoa.
    [Route("api/[controller]")]
    [ApiController]
    public class PessoasController : ControllerBase
    {
        private readonly IPessoaService _pessoasService;

        public PessoasController(IPessoaService pessoasService)
        {
            _pessoasService = pessoasService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PessoaDTO>>> Get()
        {
            var pessoas = await _pessoasService.GetPessoa();
            return Ok(pessoas);
        }

        [HttpGet("{id:int}", Name = "GetPessoa")]
        public async Task<ActionResult<PessoaDTO>> Get(int id)
        {
            var pessoa = await _pessoasService.GetPessoaById(id);

            if (pessoa == null)
                return NotFound("Pessoa não encontrada");

            return Ok(pessoa);
        }

        [HttpPost]
        public async Task<ActionResult<PessoaDTO>> Post([FromBody] PessoaDTO pessoaDTO)
        {
            var pessoaCriada = await _pessoasService.AddPessoa(pessoaDTO);

            return CreatedAtRoute(
                "GetPessoa",
                new { id = pessoaCriada.PessoaId },
                pessoaCriada
            );
        }
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Put(int id, [FromBody] PessoaDTO pessoaDTO)
        {
            pessoaDTO.PessoaId = id;

            try
            {
                await _pessoasService.Update(pessoaDTO);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }


        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _pessoasService.RemovePessoa(id);
                return NoContent();
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}
