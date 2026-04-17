using crmServer.DataAccess.Entities;
using crmServer.Interfaces.IManagers;
using crmServer.Interfaces.IRepositories;
using crmServer.Models.DTOs;

namespace crmServer.Managers;

public class TemplateManager : ITemplateManager
{
    private readonly IGenericRepository<Template> _repository;

    public TemplateManager(IGenericRepository<Template> repository)
    {
        _repository = repository;
    }
    private void ValidateTemplate(CreateTemplateDto dto)
    {
        if (dto.SequencePosition != "first" && dto.SequencePosition != "second")
            throw new ArgumentException("SequencePosition must be 'first' or 'second'");

        if (dto.Status != "draft" && dto.Status != "published")
            throw new ArgumentException("Status must be 'draft' or 'published'");

        if (dto.Industries == null)
            dto.Industries = Array.Empty<string>();

        if (dto.Regions == null)
            dto.Regions = Array.Empty<string>();
    }
    public async Task<Guid> CreateAsync(CreateTemplateDto dto)
    {
        var template = new Template
        {
            Id = Guid.NewGuid(),
            Name = dto.Name,
            SubjectLine = dto.SubjectLine,
            Body = dto.Body,
            SequencePosition = dto.SequencePosition,
            Industries = dto.Industries ?? Array.Empty<string>(),
            Regions = dto.Regions ?? Array.Empty<string>(),
            Status = dto.Status,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        await _repository.AddAsync(template);
        return template.Id;
    }

    public async Task<List<TemplateResponseDto>> GetAllAsync()
    {
        var templates = await _repository.GetAllAsync();

        return templates.Select(t => new TemplateResponseDto
        {
            Id = t.Id,
            Name = t.Name,
            SubjectLine = t.SubjectLine,
            Body = t.Body,
            SequencePosition = t.SequencePosition,
            Industries = t.Industries,
            Regions = t.Regions,
            Status = t.Status,
            CreatedAt = t.CreatedAt,
            UpdatedAt = t.UpdatedAt
        }).ToList();
    }

    public async Task<TemplateResponseDto?> GetByIdAsync(Guid id)
    {
        var template = await _repository.GetByIdAsync(id);
        if (template == null) return null;

        return new TemplateResponseDto
        {
            Id = template.Id,
            Name = template.Name,
            SubjectLine = template.SubjectLine,
            Body = template.Body,
            SequencePosition = template.SequencePosition,
            Industries = template.Industries,
            Regions = template.Regions,
            Status = template.Status,
            CreatedAt = template.CreatedAt,
            UpdatedAt = template.UpdatedAt
        };
    }



    public async Task<bool> UpdateAsync(Guid id, CreateTemplateDto dto)
    {
        var template = await _repository.GetByIdAsync(id);
        if (template == null) return false;

        template.Name = dto.Name;
        template.SubjectLine = dto.SubjectLine;
        template.Body = dto.Body;
        template.SequencePosition = dto.SequencePosition;
        template.Industries = dto.Industries;
        template.Regions = dto.Regions;
        template.Status = dto.Status;
        template.UpdatedAt = DateTime.UtcNow;

        await _repository.UpdateAsync(template);
        return true;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var template = await _repository.GetByIdAsync(id);
        if (template == null) return false;

        await _repository.DeleteAsync(template);
        return true;
    }

}