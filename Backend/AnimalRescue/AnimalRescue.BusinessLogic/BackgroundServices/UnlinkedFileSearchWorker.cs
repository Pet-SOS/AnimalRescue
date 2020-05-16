using System;
using System.Threading;
using System.Threading.Tasks;
using AnimalRescue.BusinessLogic.Services;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace AnimalRescue.BusinessLogic.BackgroundServices
{
    public class UnlinkedFileSearchWorker : Microsoft.Extensions.Hosting.BackgroundService
    {
        private readonly ILogger<UnlinkedFileSearchWorker> _logger;
        private readonly IServiceScopeFactory _serviceScopeFactory;

        public UnlinkedFileSearchWorker(
            ILogger<UnlinkedFileSearchWorker> logger, 
            IServiceScopeFactory serviceScopeFactory)
        {
            _logger = logger;
            _serviceScopeFactory = serviceScopeFactory;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                using var scope = _serviceScopeFactory.CreateScope();
                var scanner = scope.ServiceProvider.GetRequiredService<UnlinkedFileSearchService>();
                _logger.LogInformation("Unlinked File Search Worker running at: {time}", DateTimeOffset.Now);
                
                await scanner.RunAsync();
                
                await Task.Delay(TimeSpan.FromDays(2), stoppingToken);
            }
        }
    }
}
