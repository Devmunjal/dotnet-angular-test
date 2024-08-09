using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using MyAuthApi.Models;
using System.Linq;

[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly MyContactDbContext _context;

    public ContactController(MyContactDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetContacts()
    {
        return Ok(_context.Contacts.ToList());
    }

    [HttpPost]
    public IActionResult AddContact(ContactModel model)
    {
        var contact = new Contact { name = model.Name, phoneNumber = model.PhoneNumber };
        var maxId = _context.Contacts.Any() ? _context.Contacts.Max(c => c.id) : 0;
        contact.id = maxId + 1;
        _context.Contacts.Add(contact);
        _context.SaveChanges();
        return CreatedAtAction(nameof(GetContact), new { id = contact.id }, contact);
    }

    [HttpGet("{id}")]
    public IActionResult GetContact(int id)
    {
        var contact = _context.Contacts.Find(id);
        if (contact != null)
        {
            return Ok(contact);
        }
        return NotFound();
    }

    [HttpPut("{id}")]
    public IActionResult EditContact(int id, ContactModel model)
    {
        var contact = _context.Contacts.Find(id);
        if (contact != null)
        {
            contact.name = model.Name;
            contact.phoneNumber = model.PhoneNumber;
            _context.SaveChanges();
            return Ok(contact);
        }
        return NotFound();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteContact(int id)
    {
        var contact = _context.Contacts.Find(id);
        if (contact != null)
        {
            _context.Contacts.Remove(contact);
            _context.SaveChanges();
            return NoContent();
        }
        return NotFound();
    }
}