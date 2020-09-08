using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Net.Http.Headers;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using System.IO;

namespace WeatherForecast.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class MetaWeatherForecastController : ControllerBase
    {
        [HttpGet]
        public IEnumerable<Consolidated_Weather> Get()
        {
            string url = "https://www.metaweather.com/api/location/44544/"; //belfast

            using (var httpClient = new HttpClient())
            {
                httpClient.DefaultRequestHeaders.Accept.Clear();

                httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

                var jsonStream = httpClient.GetStreamAsync(new Uri(url)).Result;

                var serializer = new JsonSerializer();
                MetaWeatherForecast jsonResponse;

                using (var sr = new StreamReader(jsonStream))
                using (var jsonTextReader = new JsonTextReader(sr))
                {
                    jsonResponse = serializer.Deserialize<MetaWeatherForecast>(jsonTextReader);
                }

                return jsonResponse.consolidated_weather; 
            }

        }
    }
}
