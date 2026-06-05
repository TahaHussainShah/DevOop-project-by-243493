FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app
COPY JobListingsAPI.sln ./
COPY src/JobListingsAPI/JobListingsAPI.csproj ./src/JobListingsAPI/
COPY tests/JobListingsAPI.Tests/JobListingsAPI.Tests.csproj ./tests/JobListingsAPI.Tests/
RUN dotnet restore
COPY . .
RUN dotnet publish src/JobListingsAPI/JobListingsAPI.csproj -c Release -o /app/publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*
COPY --from=build /app/publish .
EXPOSE 5000
ENV ASPNETCORE_URLS=http://+:5000
ENTRYPOINT ["dotnet", "JobListingsAPI.dll"]
