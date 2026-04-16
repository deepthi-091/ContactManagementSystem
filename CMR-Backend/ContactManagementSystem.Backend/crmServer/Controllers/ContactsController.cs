using crmServer.Interfaces.IManagers;
using Microsoft.AspNetCore.Mvc;

namespace crmServer.Controllers;

[ApiController]
[Route("api/contacts")]
public class ContactsController : ControllerBase
{
    private readonly IContactManager _manager;

    public ContactsController(IContactManager manager)
    {
        _manager = manager;
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateContactDto dto)
    {
        var id = await _manager.CreateAsync(dto);
        return Ok(new { id });
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _manager.GetAllAsync());
    }
}