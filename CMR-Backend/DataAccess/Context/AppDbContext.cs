using Microsoft.EntityFrameworkCore;
using crmServer.DataAccess.Entities;
using System.Text.Json;

namespace crmServer.DataAccess.Context;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Contact> Contacts => Set<Contact>();
    public DbSet<Template> Templates => Set<Template>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Contact>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => new { e.CompanyName, e.Email }).IsUnique();
        });

        // ✅ REQUIRED: map string[] → JSON for SQL Server
        modelBuilder.Entity<Template>()
            .Property(t => t.Industries)
            .HasConversion(
                v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                v => JsonSerializer.Deserialize<string[]>(v, (JsonSerializerOptions?)null)!
            );

        modelBuilder.Entity<Template>()
            .Property(t => t.Regions)
            .HasConversion(
                v => JsonSerializer.Serialize(v, (JsonSerializerOptions?)null),
                v => JsonSerializer.Deserialize<string[]>(v, (JsonSerializerOptions?)null)!
            );
    }
}