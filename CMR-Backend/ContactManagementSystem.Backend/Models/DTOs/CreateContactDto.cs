using System.ComponentModel.DataAnnotations;

public class CreateContactDto
{
    // Company
    [Required]
    public string? CompanyName { get; set; }
    public string? Website { get; set; }
    public string? City { get; set; }
    public string? Country { get; set; }

    public string? EmployeeCount { get; set; }
    public string? Industry { get; set; }

    // Contact
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    [Required]
    public string? Email { get; set; }
    public string? JobTitle { get; set; }
    public string? Phone { get; set; }

    public string? LeadSource { get; set; }
    public string? Notes { get; set; }
}
