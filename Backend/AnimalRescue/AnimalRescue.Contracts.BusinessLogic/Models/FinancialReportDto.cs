using System;

namespace AnimalRescue.Contracts.BusinessLogic.Models
{
    public class FinancialReportDto: BaseAndTimeDto
    {
        public string Title { get; set; }

        public string Body { get; set; }

        public string FileId { get; set; }

        public DateTime Date { get; set; }
    }
}
