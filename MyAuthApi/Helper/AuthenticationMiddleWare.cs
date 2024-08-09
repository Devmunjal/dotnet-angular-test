using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using Microsoft.Extensions.Primitives;

public class AuthTokenMiddleware
{
    private readonly RequestDelegate _next;

    public AuthTokenMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var authToken = context.Request.Headers["Authorization"];
        var authTokenValue = authToken.ToString();

        if (string.IsNullOrEmpty(authTokenValue))
        {
            context.Response.StatusCode = 401; // Unauthorized
            await context.Response.WriteAsync("Authorization token is missing.");
            return;
        }

        await _next(context);
    }
}