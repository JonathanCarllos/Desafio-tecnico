using Desafio_Api.Enums;
using Desafio_Api.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

// DTO utilizado para transferência de dados da Transacao entre API e cliente.
public class TransacaoDTO
{
    public int Id { get; set; }

    [Required, MaxLength(400)]
    public string Descricao { get; set; } = string.Empty;

    [Column(TypeName = "decimal(18,2)")]
    public decimal Valor { get; set; }

    public Tipo Tipo { get; set; }

    public int CategoriaId { get; set; }
    public Categoria? Categoria { get; set; }

    public int PessoaId { get; set; }
    public Pessoa? Pessoa { get; set; }
}
