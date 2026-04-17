using crmServer.Interfaces.IManagers;
using crmServer.Managers;
using crmServer.Models.DTOs;
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

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var deleted = await _manager.DeleteAsync(id);

        if (!deleted)
        {
            return NotFound(new { message = "Contact not found" });
        }

        return Ok(new { message = "Contact deleted successfully" });
    }
    // PUT /api/contacts/{id}
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, [FromBody] UpdateContactDto dto)
    {
        var updated = await _manager.UpdateAsync(id, dto);

        if (!updated)
        {
            return NotFound(new { message = "Contact not found" });
        }

        return Ok(new { message = "Contact updated successfully" });
    }
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var contact = await _manager.GetByIdAsync(id);

        if (contact == null)
        {
            return NotFound();
        }

        return Ok(contact);
    }
}