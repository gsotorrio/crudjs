using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
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
    }
}