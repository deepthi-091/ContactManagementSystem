namespace crmServer.DataAccess.Entities;

public class Contact
{
    public Guid Id { get; set; }

    public string CompanyName { get; set; } = null!;
    public string? Website { get; set; }
    public string? City { get; set; }
    public string? Country { get; set; }

    public string? EmployeeCount { get; set; }
    public string? Industry { get; set; }

    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string Email { get; set; } = null!;
    public string? JobTitle { get; set; }
    public string? Phone { get; set; }

    public string? LeadSource { get; set; }
    public string? Notes { get; set; }

    public string Status { get; set; } = "New";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}