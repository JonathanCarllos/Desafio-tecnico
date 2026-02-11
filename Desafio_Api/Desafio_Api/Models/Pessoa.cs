using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Desafio_Api.Models
{
    // responsável por representar a entidade Pessoa no banco de dados.
    public class Pessoa
    {
        [Key]
        public int PessoaId { get; set; }

        [Required(ErrorMessage = "Campo obrigatório")]
        [StringLength(200)]
        public string Nome { get; set; } = string.Empty;

        [Range(0, 130)]
        public int? Idade { get; set; }

        [JsonIgnore]
        public ICollection<Transacao> Transacoes { get; set; } = new List<Transacao>();
    }
}
