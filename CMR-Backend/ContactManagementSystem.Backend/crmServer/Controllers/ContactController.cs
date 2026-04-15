using Microsoft.AspNetCore.Mvc;
using crmServer.Data;
using crmServer.Models;

namespace crmServer.Controllers;

[ApiController]
[Route("api/contacts")]
public class ContactsController : ControllerBase
{
    private readonly AppDbContext _context;

    public ContactsController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public IActionResult CreateContact([FromBody] Contact contact)
    {
        // Basic validation
        if (string.IsNullOrWhiteSpace(contact.CompanyName))
            return BadRequest("Company name is required");

        if (string.IsNullOrWhiteSpace(contact.Email))
            return BadRequest("Email is required");

        // System fields
        contact.Status = "New";
        contact.CreatedAt = DateTime.Now;

        // Save to DB
        _context.Contacts.Add(contact);
        _context.SaveChanges();

        return Ok(new
        {
            success = true,
            id = contact.Id
        });
    }
}
