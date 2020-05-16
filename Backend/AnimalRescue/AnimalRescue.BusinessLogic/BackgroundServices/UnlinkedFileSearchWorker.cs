using AnimalRescue.BusinessLogic.Configurations;
using AnimalRescue.BusinessLogic.Services;

using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;

using System;
using System.Threading;
using System.Threading.Tasks;

namespace AnimalRescue.BusinessLogic.BackgroundServices
{
    public class UnlinkedFileSearchWorker : Microsoft.Extensions.Hosting.BackgroundService
    {
        private readonly UnlinkedFileSearchSettings _options;
        private readonly ILogger<UnlinkedFileSearchWorker> _logger;
        private readonly IServiceScopeFactory _serviceScopeFactory;

        public UnlinkedFileSearchWorker(
            IOptions<UnlinkedFileSearchSettings> options,
            ILogger<UnlinkedFileSearchWorker> logger, 
            IServiceScopeFactory serviceScopeFactory)
        {
            _options = options.Value;
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
                _logger.LogInformation("Unlinked File Search Worker finishing at: {time}", DateTimeOffset.Now);
                
                await Task.Delay(TimeSpan.FromDays(_options.Day), stoppingToken);
            }
        }
    }
}
