/*
 * Bookapp - Book Management System Backend
 * Copyright (c) 2025 Jorge Avila
 * Author: Jorge Avila (jorgeavilas@icloud.com)
 * Repository: https://github.com/Jojje84/Bookapp
 * License: MIT License - see LICENSE file for details
 * 
 * This file contains the main application startup and configuration.
 * Original work by Jorge Avila - please maintain attribution.
 */

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

// CORS (tillfälligt öppet)
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
            new Book { Title = "The Pragmatic Programmer", Author = "Andrew Hunt", PublishedDate = DateTime.Parse("1999-10-30") },
            new Book { Title = "Design Patterns", Author = "Erich Gamma", PublishedDate = DateTime.Parse("1994-10-21") },
            new Book { Title = "Refactoring", Author = "Martin Fowler", PublishedDate = DateTime.Parse("1999-07-08") },
            new Book { Title = "Domain-Driven Design", Author = "Eric Evans", PublishedDate = DateTime.Parse("2003-08-30") }
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
