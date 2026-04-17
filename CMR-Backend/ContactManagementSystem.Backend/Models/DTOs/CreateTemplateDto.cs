using System.ComponentModel.DataAnnotations;

namespace crmServer.Models.DTOs;

public class CreateTemplateDto
{
    [Required]
    public string Name { get; set; } = null!;

    [Required]
    public string SubjectLine { get; set; } = null!;

    [Required]
    public string Body { get; set; } = null!;

    [Required]
    public string SequencePosition { get; set; } = null!;

    public string[] Industries { get; set; } = null!;
    public string[] Regions { get; set; } = null!;

    public string Status { get; set; } = "draft";
}
