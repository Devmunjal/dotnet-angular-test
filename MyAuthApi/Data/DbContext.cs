using Microsoft.EntityFrameworkCore;

public class MyContactDbContext : DbContext
{
    public MyContactDbContext(DbContextOptions<MyContactDbContext> options) : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Contact> Contacts { get; set; }
}