# ... dina build-steg ovan ...

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

# 🧭 Kestrel ska lyssna på Render-porten
ENV ASPNETCORE_URLS=http://0.0.0.0:10000

# 📣 Exponera rätt port (ta bort ev. EXPOSE 8080/8443)
EXPOSE 10000

ENTRYPOINT ["dotnet", "BookApi.dll"]
