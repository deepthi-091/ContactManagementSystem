public class ContactResponseDto
{
    public Guid Id { get; set; }

    public string CompanyName { get; set; }
    public string Website { get; set; }
    public string City { get; set; }
    public string Country { get; set; }

    public int EmployeeCount { get; set; }
    public string Industry { get; set; }

    public string FirstName { get; set; }
    public string LastName { get; set; }

    public string Email { get; set; }
    public string JobTitle { get; set; }
    public string Phone { get; set; }

    public string LeadSource { get; set; }
    public string Notes { get; set; }

    public string Status { get; set; }
    public DateTime CreatedAt { get; set; }
}