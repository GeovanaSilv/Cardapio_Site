namespace Cardapio_API.Models{

    public class Cardapio{
        public int id {get; set;}
        public string? nome {get; set;}
        public int porcoes {get; set;}
        public string? valor {get; set;}
         public string? nomeTipo {get; set;}
            public int codTipo {get; set;}
        public string? descricao {get; set;}
    }
}