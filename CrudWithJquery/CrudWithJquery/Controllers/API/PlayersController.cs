using System.Collections.Generic;
using System.Web;
using System.Web.Http;
using CrudWithJQuery.Models;
using CrudWithJQuery.Repositories;

namespace CrudWithJQuery.Controllers.API
{
    public class PlayersController : ApiController
    {
        private PlayersRepository _repo;

        public PlayersController()
        {
            _repo = new PlayersRepository(HttpContext.Current.Server.MapPath("~/App_Data/players.json"));
        }

        [HttpGet]
        public List<Player> Get()
        {
            return _repo.GetAllPlayer();
        }
    }
}
