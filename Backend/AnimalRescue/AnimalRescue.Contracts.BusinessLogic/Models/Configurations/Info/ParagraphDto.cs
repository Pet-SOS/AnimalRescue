﻿using AnimalRescue.Contracts.BusinessLogic.Models.Tag;
using System.Collections.Generic;

namespace AnimalRescue.Contracts.BusinessLogic.Models.Configurations.Info
{
    public class ParagraphDto
    {
        public string Name { get; set; }
        public List<LanguageValueDto> Values { get; set; }
    }
}
