using crmServer.DataAccess.Entities;
using crmServer.Interfaces.IManagers;
using crmServer.Interfaces.IRepositories;
//using crmServer.Models.DTOs;

namespace crmServer.Managers;

public class ContactManager : IContactManager
{
    private readonly IGenericRepository<Contact> _repository;

    public ContactManager(IGenericRepository<Contact> repository)
    {
        _repository = repository;
    }

    // ✅ Implements IContactManager.CreateAsync
    public async Task<Guid> CreateAsync(CreateContactDto dto)
    {
        var contact = new Contact
        {
            Id = Guid.NewGuid(),
            CompanyName = dto.CompanyName,
            Website = dto.Website,
            City = dto.City,
            Country = dto.Country,
            EmployeeCount = dto.EmployeeCount,
            Industry = dto.Industry,
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            Email = dto.Email,
            JobTitle = dto.JobTitle,
            Phone = dto.Phone,
            LeadSource = dto.LeadSource,
            Notes = dto.Notes,
            Status = "New",
            CreatedAt = DateTime.UtcNow
        };

        await _repository.AddAsync(contact);
        return contact.Id;
    }

    // ✅ Implements IContactManager.GetAllAsync
    public async Task<List<ContactResponseDto>> GetAllAsync()
    {
        var contacts = await _repository.GetAllAsync();

        return contacts.Select(c => new ContactResponseDto
        {
            Id = c.Id,
            CompanyName = c.CompanyName,
            Website = c.Website,
            City = c.City,
            Country = c.Country,
            EmployeeCount = c.EmployeeCount ?? 0,
            Industry = c.Industry,
            FirstName = c.FirstName,
            LastName = c.LastName,
            Email = c.Email,
            JobTitle = c.JobTitle,
            Phone = c.Phone,
            LeadSource = c.LeadSource,
            Notes = c.Notes,
            Status = c.Status,
            CreatedAt = c.CreatedAt
        }).ToList();
    }
}