using crmServer.Interfaces.IManagers;
using crmServer.Models.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace crmServer.Controllers;

[ApiController]
[Route("api/templates")]
public class TemplatesController : ControllerBase
{
    private readonly ITemplateManager _manager;

    public TemplatesController(ITemplateManager manager)
    {
        _manager = manager;
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateTemplateDto dto)
    {
        var id = await _manager.CreateAsync(dto);
        return Ok(new { id });
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _manager.GetAllAsync());
    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, CreateTemplateDto dto)
    {
        var updated = await _manager.UpdateAsync(id, dto);
        if (!updated) return NotFound();
        return NoContent();
    }

    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var deleted = await _manager.DeleteAsync(id);
        if (!deleted) return NotFound();
        return NoContent();
    }
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var template = await _manager.GetByIdAsync(id);

        if (template == null)
        {
            return NotFound(new { message = "Template not found" });
        }

        return Ok(template);
    }
}
