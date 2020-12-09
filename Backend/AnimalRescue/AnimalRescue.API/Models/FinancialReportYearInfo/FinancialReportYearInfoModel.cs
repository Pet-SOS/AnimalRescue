using AnimalRescue.API.Models.Configurations.Info;
using AnimalRescue.Contracts.Common.Constants;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

using common = AnimalRescue.Contracts.Common.Constants.PropertyConstants.Common;

namespace AnimalRescue.API.Models.FinancialReportYearInfo
{
    public class FinancialReportYearInfoModel : BaseAndTimeModel<Guid>
    {
        [Required]
        [JsonPropertyName(PropertyConstants.FinancialReportYearInfo.Year)]
        [JsonProperty(PropertyConstants.FinancialReportYearInfo.Year)]
        public int Year { get; set; }

        [Required]
        [JsonPropertyName(common.Paragraphs)]
        [JsonProperty(common.Paragraphs)]
        public List<ParagraphModel> Paragraphs { get; set; }
    }
}
