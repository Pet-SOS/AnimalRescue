# define build container
FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build-env

# copy the contents of agent working directory on host to workdir in container
ADD BackgroundServices/TelegramMessenger /src/BackgroundServices/TelegramMessenger
ADD AnimalRescue /src/AnimalRescue

WORKDIR /src/BackgroundServices/TelegramMessenger

# dotnet commands to build and publish
RUN dotnet restore --no-cache
RUN dotnet publish -c Release -o /src/out

# Second stage - Build runtime image
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
WORKDIR /app
COPY --from=build-env /src/out .
ENTRYPOINT ["dotnet", "TelegramMessenger.dll"]