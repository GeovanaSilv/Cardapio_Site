using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Cardapio_API.Data;
using Cardapio_API.Models;

namespace Cardapio_API.Controllers{

    [Route("api/[controller]")]
    [ApiController]

    public class CardapioController: ControllerBase{

        private CardapioContext _context;
        public CardapioController(CardapioContext context){

            _context = context;
        }

       [HttpGet]
       public ActionResult<List<Cardapio>> GetAll(){
        return _context.Cardapio.ToList();
       }

        [HttpGet("{CardapioId}")]
        public ActionResult<List<Cardapio>> Get(int CardapioId){

            try{
                var resultado = _context.Cardapio.Find(CardapioId);
                if(resultado == null)
                {
                    return NotFound();
                }
                return Ok(resultado);
            }
            catch{
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha com o banco de dados");
            }
            
        }

        [HttpPost]
        public async Task<ActionResult> POST (Cardapio model){

            try{
                _context.Cardapio.Add(model);
                if(await _context.SaveChangesAsync() == 1){
                    return Created($"/api/cardapio/{model.nome}",model);
                }
            }
            catch {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha com o banco de dados");
            }
            return BadRequest();
        }

         [HttpDelete("{CardapioId}")]
        public async Task<ActionResult> DELETE (int CardapioId ){

            try{
                var comida = await _context.Cardapio.FindAsync(CardapioId);
                if(comida == null){
                    return NotFound();
                }
                _context.Remove(comida);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha com o banco de dados");
            }
            
        }

         [HttpPut("{CardapioId}")]
        public async Task<ActionResult> PUT (Cardapio dadosCardapioAlt, int CardapioId){

            try{
                 var resultado = await _context.Cardapio.FindAsync(CardapioId);
                if(CardapioId != resultado.id){

                   return  BadRequest();
                }
                resultado.nome = dadosCardapioAlt.nome;
                resultado.porcoes = dadosCardapioAlt.porcoes;
                resultado.valor = dadosCardapioAlt.valor;
               resultado.codTipo = dadosCardapioAlt.codTipo;
               resultado.nomeTipo = dadosCardapioAlt.nomeTipo;
                resultado.descricao = dadosCardapioAlt.descricao;
                await _context.SaveChangesAsync();
                return Created($"/api/cardapio/{dadosCardapioAlt.nome}", dadosCardapioAlt);
            }
            catch {
                return this.StatusCode(StatusCodes.Status500InternalServerError, "Falha com o banco de dados");
            }
            
        }
    }
}