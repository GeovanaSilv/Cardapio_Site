namespace Cardapio_API.Models{
    public class User{
        public int id { get; set; }
        public string username { get; set; } = string.Empty;
        public string senha { get; set; } = string.Empty;
        public string role { get; set; } = string.Empty;
    }
}