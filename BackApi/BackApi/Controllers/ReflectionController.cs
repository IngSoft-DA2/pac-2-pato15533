using Microsoft.AspNetCore.Mvc;
using System.Reflection;
using IImporter;

namespace BackApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReflectionController : ControllerBase
    {
        [HttpGet("importers")]
        public ActionResult<string[]> GetImporters()
        {
            var result = new List<string>();
            var reflectionPath = Path.Combine(Directory.GetCurrentDirectory(), "reflection");

            if (!Directory.Exists(reflectionPath))
            {
                return Ok(result.ToArray());
            }

            var dllFiles = Directory.GetFiles(reflectionPath, "*.dll");

            foreach (var dllFile in dllFiles)
            {
                try
                {
                    var assembly = Assembly.LoadFrom(dllFile);

                    var importerTypes = assembly.GetTypes()
                        .Where(type => type is { IsPublic: true, IsAbstract: false } &&
                                     typeof(ImporterInterface).IsAssignableFrom(type));

                    foreach (var importerType in importerTypes)
                    {
                        if (Activator.CreateInstance(importerType) is ImporterInterface instance)
                        {
                            result.Add(instance.GetName());
                        }
                    }
                }
                catch (Exception)
                {
                    // ignore
                }
            }

            return Ok(result.ToArray());
        }
    }
}
