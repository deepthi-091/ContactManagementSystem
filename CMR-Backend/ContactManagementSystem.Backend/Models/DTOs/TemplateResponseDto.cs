namespace crmServer.Models.DTOs;

public class TemplateResponseDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = null!;
    public string SubjectLine { get; set; } = null!;
    public string Body { get; set; } = null!;
    public string SequencePosition { get; set; } = null!;
    public string[] Industries { get; set; } = null!;
    public string[] Regions { get; set; } = null!;
    public string Status { get; set; } = null!;
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
