using Desafio_Api.Models;
using Desafio_Api.Services.Interface;
using Microsoft.AspNetCore.Mvc;

namespace Desafio.Api.Controllers
{
    // Controller responsável por expor os endpoints HTTP da entidade Transacao.
    [ApiController]
    [Route("api/transacoes")]
    public class TransacoesController : ControllerBase
    {
        private readonly ITransacaoService _service;

        public TransacoesController(ITransacaoService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Listar()
        {
            var transacoes = await _service.ListarAsync();
            return Ok(transacoes);
        }

        [HttpPost]
        public async Task<IActionResult> Criar(Transacao transacao)
        {
            try
            {
                var result = await _service.CriarAsync(transacao);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
