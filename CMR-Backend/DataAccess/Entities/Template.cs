using System.ComponentModel.DataAnnotations;

namespace crmServer.DataAccess.Entities;

public class Template
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    public string Name { get; set; } = null!;

    [Required]
    public string SubjectLine { get; set; } = null!;

    [Required]
    public string Body { get; set; } = null!;

    [Required]
    public string SequencePosition { get; set; } = null!; // first | second

    [Required]
    public string[] Industries { get; set; } = null!; // JSON or comma-separated

    [Required]
    public string[] Regions { get; set; } = null!;

    [Required]
    public string Status { get; set; } = "draft"; // draft | published

    public Guid CreatedBy { get; set; }

    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}