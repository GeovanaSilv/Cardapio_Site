using Microsoft.EntityFrameworkCore;
using Cardapio_API.Models;
using System.Diagnostics.CodeAnalysis;

namespace Cardapio_API.Data
{
    public class CardapioContext : DbContext
    {
        protected readonly IConfiguration Configuration;

        public CardapioContext(IConfiguration configuration){

            Configuration = configuration;
        }
       
       protected override void OnConfiguring(DbContextOptionsBuilder options){

            options.UseSqlServer(Configuration.GetConnectionString("StringConexaoSQLServer"));
       }

        public DbSet<Cardapio> Cardapio {get; set;}
        public DbSet<User> Usuario{get; set;}
        public DbSet<Tipo> Tipo{get;set;}

       
    }
}