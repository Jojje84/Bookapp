using BookApi.Data;
using BookApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// 🔌 Bind till Render-porten tidigt
var port = Environment.GetEnvironmentVariable("PORT") ?? "5000";
builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

// Add services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<BookContext>(options =>
    options.UseInMemoryDatabase("BooksDB"));

// JWT
var key = Encoding.UTF8.GetBytes("SuperSecretKey12345_SuperSecretKey12345");
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key)
        };
    });

// CORS (tillfälligt öppet när du testar)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        p => p.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
});

var app = builder.Build();

// seed
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<BookContext>();
    if (!context.Books.Any())
    {
        context.Books.AddRange(
            new Book { Title = "Clean Code", Author = "Robert C. Martin", PublishedDate = DateTime.Parse("2008-08-01") },
            new Book { Title = "The Pragmatic Programmer", Author = "Andrew Hunt", PublishedDate = DateTime.Parse("1999-10-30") }
        );
        context.SaveChanges();
    }
}

// Swagger även i prod (praktiskt på Render)
app.UseSwagger();
app.UseSwaggerUI();

// ❗️Ingen HTTPS-redirect i prod (Render sköter TLS)
if (app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// ✅ Health-check endpoint
app.MapGet("/", () => "✅ Backend is running on Render!");

// 📝 Logga ut porten
Console.WriteLine($"🚀 Application is starting on http://0.0.0.0:{port}");

app.Run();
