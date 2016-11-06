using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
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

        /// <summary>
        /// Return the list of all players on the database
        /// </summary>
        /// <returns>List of players</returns>
        [HttpGet]
        public List<Player> Get()
        {
            return _repo.GetAllPlayer()
                .OrderBy(p => p.Name)
                .ThenBy(p => p.Surname)
                .ToList();
        }

        /// <summary>
        /// Return a player queried by id
        /// </summary>
        /// <param name="id">Player Id</param>
        /// <returns>Player or Not Found</returns>
        [HttpGet]
        public IHttpActionResult Get(Guid id)
        {
            var player = _repo.GetPlayerById(id);

            if (player == null)
            {
                return NotFound();
            }

            return Ok(player);
        }

        /// <summary>
        /// Create a new player
        /// </summary>
        /// <param name="player">Player to be created</param>
        /// <returns>New player created</returns>
        [HttpPost]
        public IHttpActionResult Post([FromBody]Player player)
        {
            var newPlayer = _repo.Create(player);

            return Created(new Uri($"{Request.RequestUri}/{newPlayer.PlayerId}"), newPlayer);
        }

        /// <summary>
        /// Update information about a player with a specific id
        /// </summary>
        /// <param name="id">Player Id</param>
        /// <param name="player">Player with new information</param>
        /// <returns>Player updated</returns>
        [HttpPut]
        public IHttpActionResult Put(Guid id, [FromBody]Player player)
        {
            var newPlayer = _repo.Update(id, player);

            return Created(Request.RequestUri, newPlayer);
        }

        /// <summary>
        /// Delete a player by id
        /// </summary>
        /// <param name="id">Player Id</param>
        /// <returns>No Content or Not Found</returns>
        [HttpDelete]
        public IHttpActionResult Delete(Guid id)
        {
            bool isDeleted = _repo.Delete(id);

            if (isDeleted)
            {
                return Content<Player>(HttpStatusCode.NoContent, null);
            }

            return NotFound();
        }
    }
}
