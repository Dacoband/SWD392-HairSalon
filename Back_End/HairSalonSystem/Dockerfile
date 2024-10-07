FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src
COPY ["HairSalonSystem.API/HairSalonSystem.API.csproj", "HairSalonSystem.API/"]
COPY ["HairSalonSystem.Services/HairSalonSystem.Services.csproj", "HairSalonSystem.Services/"]
COPY ["HairSalonSystem.Repositories/HairSalonSystem.Repositories.csproj", "HairSalonSystem.Repositories/"]
COPY ["HairSalonSystem.DAOs/HairSalonSystem.DAOs.csproj", "HairSalonSystem.DAOs/"]
COPY ["HairSalonSystem.BusinessObject/HairSalonSystem.BusinessObject.csproj", "HairSalonSystem.BusinessObject/"]
RUN dotnet restore "HairSalonSystem.API/HairSalonSystem.API.csproj"
COPY . .
WORKDIR "/src/HairSalonSystem.API"
RUN dotnet build "HairSalonSystem.API.csproj" -c $BUILD_CONFIGURATION -o /app/build

FROM build AS publish 
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "HairSalonSystem.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "HairSalonSystem.API.dll"]
