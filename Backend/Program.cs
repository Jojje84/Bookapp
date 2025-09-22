using BookApi.Data;
using BookApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// DbContext
builder.Services.AddDbContext<BookContext>(options =>
    options.UseInMemoryDatabase("BooksDB"));

// 🔑 JWT setup
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

// 🌍 CORS policy
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular",
        policy => policy
            .WithOrigins("http://localhost:4200") // Angular dev server
            .AllowAnyHeader()
            .AllowAnyMethod());
});

var app = builder.Build();

// Seed data
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

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// 👇 Viktigt! Lägg in ordningen rätt
app.UseCors("AllowAngular");  // först CORS
app.UseAuthentication();      // sen auth
app.UseAuthorization();

app.MapControllers();

app.Run();
