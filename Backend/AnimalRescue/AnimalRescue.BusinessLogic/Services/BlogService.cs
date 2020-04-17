using AnimalRescue.Contracts.BusinessLogic.Interfaces;
using AnimalRescue.Contracts.BusinessLogic.Models.Blogs;
using AnimalRescue.DataAccess.Mongodb.Interfaces.Repositories;
using AnimalRescue.DataAccess.Mongodb.Models;

using AutoMapper;

using System;

namespace AnimalRescue.BusinessLogic.Services
{
	internal class BlogService : 
		BaseService<BlogDto, Article, Guid>, 
		IBlFullCrud<BlogDto, BlogDto, Guid>
	{
		public BlogService(
			IArticleRepository repository,
			IRecoverDataService recoverDataService,
			IMapper mapper)
			: base(repository, recoverDataService, mapper)
		{
		}  
	}
}
