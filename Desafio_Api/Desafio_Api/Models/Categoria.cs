using Desafio_Api.Enums;
using System.ComponentModel.DataAnnotations;

namespace Desafio_Api.Models
{
    // responsável por representar a entidade Categoria no banco de dados.
    public class Categoria
    {
        [Key]
        public int CategoriaId { get; set; }

        [Required(ErrorMessage = "Campo Obrigatório")]
        [StringLength(400)]
        public string? Descricao { get; set; }
        
        public Finalidade  Finalidade { get; set; }
    }
}
