using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using CrudWithJQuery.Models;
using Newtonsoft.Json;

namespace CrudWithJQuery.Repositories
{
    public class PlayersRepository
    {
        private string Path;

        public PlayersRepository(string path)
        {
            Path = path;
        }

        public List<Player> GetAllPlayer()
        {
            var jsonPlayer = File.ReadAllText(Path);

            return JsonConvert.DeserializeObject<List<Player>>(jsonPlayer);
        }

        public Player GetPlayerById(Guid id)
        {
            return GetAllPlayer().SingleOrDefault(p => p.PlayerId == id);
        }

        public Player Create(Player newPlayer)
        {
            newPlayer.PlayerId = Guid.NewGuid();

            var players = GetAllPlayer();
            players.Add(newPlayer);

            File.WriteAllText(Path, JsonConvert.SerializeObject(players));

            return newPlayer;
        }

        public Player Update(Guid id, Player player)
        {
            player.PlayerId = id;

            var players = GetAllPlayer();
            var playerToRemove = players.SingleOrDefault(p => p.PlayerId == id);

            players.Remove(playerToRemove);
            players.Add(player);

            File.WriteAllText(Path, JsonConvert.SerializeObject(players));

            return player;
        }

        public bool Delete(Guid id)
        {
            var players = GetAllPlayer();

            var player = players.SingleOrDefault(p => p.PlayerId == id);
            var result = players.Remove(player);

            File.WriteAllText(Path, JsonConvert.SerializeObject(players));

            return result;
        }
    }
}