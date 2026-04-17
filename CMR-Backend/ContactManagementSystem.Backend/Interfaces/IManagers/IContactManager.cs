

using crmServer.Models.DTOs;

namespace crmServer.Interfaces.IManagers;

public interface IContactManager
{
    Task<Guid> CreateAsync(CreateContactDto dto);
    Task<List<ContactResponseDto>> GetAllAsync();
    Task<bool> DeleteAsync(Guid id);
    Task<bool> UpdateAsync(Guid id, UpdateContactDto dto);
    Task<ContactResponseDto?> GetByIdAsync(Guid id);
}