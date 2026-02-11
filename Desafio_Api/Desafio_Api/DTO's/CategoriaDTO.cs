using Desafio_Api.Enums;
using System.ComponentModel.DataAnnotations;

namespace Desafio_Api.DTO_s
{
    // DTO utilizado para transferência de dados da Categoria entre API e cliente.
    public class CategoriaDTO
    {      
        public int CategoriaId { get; set; }

        [Required(ErrorMessage = "Campo Obrigatório")]
        [StringLength(400)]
        public string? Descricao { get; set; }
        public Finalidade Finalidade { get; set; }
    }
}
