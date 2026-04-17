using crmServer.Models.DTOs;

public interface ITemplateManager
{
    Task<Guid> CreateAsync(CreateTemplateDto dto);
    Task<List<TemplateResponseDto>> GetAllAsync();

    Task<TemplateResponseDto?> GetByIdAsync(Guid id); // ✅ REQUIRED

    Task<bool> UpdateAsync(Guid id, CreateTemplateDto dto);
    Task<bool> DeleteAsync(Guid id);
}
