using crmServer.DataAccess.Entities;
using crmServer.Interfaces.IManagers;
using crmServer.Interfaces.IRepositories;
using crmServer.Models.DTOs;

namespace crmServer.Managers
{
    public class ContactManager : IContactManager
    {
        private readonly IGenericRepository<Contact> _repository;

        public ContactManager(IGenericRepository<Contact> repository)
        {
            _repository = repository;
        }

        // CREATE
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

        // GET ALL
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
                EmployeeCount = c.EmployeeCount,
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

        // UPDATE
        public async Task<bool> UpdateAsync(Guid id, UpdateContactDto dto)
        {
            var contact = await _repository.GetByIdAsync(id);
            if (contact == null)
                return false;

            contact.CompanyName = dto.CompanyName ?? contact.CompanyName;
            contact.Website = dto.Website ?? contact.Website;
            contact.City = dto.City ?? contact.City;
            contact.Country = dto.Country ?? contact.Country;
            contact.EmployeeCount = dto.EmployeeCount ?? contact.EmployeeCount;
            contact.Industry = dto.Industry ?? contact.Industry;
            contact.FirstName = dto.FirstName ?? contact.FirstName;
            contact.LastName = dto.LastName ?? contact.LastName;
            contact.Email = dto.Email ?? contact.Email;
            contact.JobTitle = dto.JobTitle ?? contact.JobTitle;
            contact.Phone = dto.Phone ?? contact.Phone;
            contact.LeadSource = dto.LeadSource ?? contact.LeadSource;
            contact.Notes = dto.Notes ?? contact.Notes;

            await _repository.UpdateAsync(contact);
            return true;
        }

        // DELETE
        public async Task<bool> DeleteAsync(Guid id)
        {
            var contact = await _repository.GetByIdAsync(id);
            if (contact == null)
                return false;

            await _repository.DeleteAsync(contact);
            return true;
        }
        public async Task<ContactResponseDto?> GetByIdAsync(Guid id)
        {
            var contact = await _repository.GetByIdAsync(id);
            if (contact == null) return null;

            return new ContactResponseDto
            {
                Id = contact.Id,
                CompanyName = contact.CompanyName,
                Website = contact.Website,
                City = contact.City,
                Country = contact.Country,
                EmployeeCount = contact.EmployeeCount,
                Industry = contact.Industry,
                FirstName = contact.FirstName,
                LastName = contact.LastName,
                Email = contact.Email,
                JobTitle = contact.JobTitle,
                Phone = contact.Phone,
                LeadSource = contact.LeadSource,
                Notes = contact.Notes,
                Status = contact.Status,
                CreatedAt = contact.CreatedAt
            };
        }
    }
}
