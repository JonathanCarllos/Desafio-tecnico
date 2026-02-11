using Desafio_Api.Models;
using System.ComponentModel.DataAnnotations;

namespace Desafio_Api.DTO_s
{
    // DTO utilizado para transferência de dados da Pessoa entre API e cliente.
    public class PessoaDTO
    {
        public int PessoaId { get; set; }

        [Required(ErrorMessage = "Campo obrigatório")]
        [StringLength(200)]
        public string Nome { get; set; } = string.Empty;

        public int? Idade { get; set; }

        public ICollection<TransacaoDTO>? Transacoes { get; set; }
    }
}
