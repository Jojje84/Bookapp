# 1. Bygg image
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Kopiera csproj och resten av koden
COPY BookApi.csproj .
RUN dotnet restore BookApi.csproj

COPY . .
RUN dotnet publish BookApi.csproj -c Release -o /app/publish

# 2. Kör image
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS runtime
WORKDIR /app
COPY --from=build /app/publish .

# Exponera port (Render brukar använda PORT variabeln)
ENV ASPNETCORE_URLS=http://+:10000
EXPOSE 10000

ENTRYPOINT ["dotnet", "BookApi.dll"]
