using System.Collections.Generic;

namespace AnimalRescue.Contracts.BusinessLogic.Models
{
    public class FinancialReportByYearDto
    {
        public int Date { get; set; }

        public List<FinancialReportDto> Reports { get; set; } 
    }
}
