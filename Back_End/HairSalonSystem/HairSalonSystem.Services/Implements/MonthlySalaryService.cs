using HairSalonSystem.Services.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HairSalonSystem.Services.Implements
{
    public class MonthlySalaryService : BackgroundService
    {
        private readonly IServiceProvider _serviceProvider;
        public MonthlySalaryService(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                var today = DateTime.Today;
                if (today.Day == 1) // Check if today is the 1st of the month
                {
                    using (var scope = _serviceProvider.CreateScope())
                    {
                        var salaryService = scope.ServiceProvider.GetRequiredService<ISalaryService>();
                        await salaryService.CreateSalary();
                    }
                    // Wait until the next day to avoid duplicate entries within the same month
                    await Task.Delay(TimeSpan.FromDays(1), stoppingToken);
                }
                else
                {
                    // Check again tomorrow
                    await Task.Delay(TimeSpan.FromHours(24), stoppingToken);
                }
            }
        }
    }
    }

