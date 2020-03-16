using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;

namespace AnimalRescue.API.Core.Middlewares
{
    public static class SwaggerExtension
    {
        public static void AddConfigureSwagger(this IServiceCollection services, string xmlPath)
        {
            // Register the Swagger generator, defining 1 or more Swagger documents  
            services.AddSwaggerGen(c =>
            {

                //var provider = services.BuildServiceProvider().GetRequiredService<IApiVersionDescriptionProvider>();

                // Add a swagger document for each discovered API version
                //foreach (var description in provider.ApiVersionDescriptions)
                //{
                    c.SwaggerDoc("v1"/*description.GroupName*/, new OpenApiInfo()
                    {

                        Title = "Animal Rescue API",
                        Version = "v1",//$"v{description.ApiVersion.ToString()}",
                        Description = "API Documentation - Animal Rescue",
                        Contact = new OpenApiContact() { Name = "Global Logic", Url = new Uri("https://globallogic.com") }
                    });
                //}

                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer"
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement()
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            },
                            Scheme = "oauth2",
                            Name = "Bearer",
                            In = ParameterLocation.Header,
                        },
                        new List<string>()
                    }
                });

               // c.IncludeXmlComments(xmlPath);
            });
        }

        public static void UseConfigureSwagger(this IApplicationBuilder app/*, IApiVersionDescriptionProvider provider*/)
        {
            app.UseSwagger();

            app.UseSwaggerUI(
                options =>
                {
                    options.RoutePrefix = String.Empty;
                    //Build a swagger endpoint for each discovered API version  
                    //foreach (var description in provider.ApiVersionDescriptions)
                    //{
                    //    options.SwaggerEndpoint($"/swagger/{description.GroupName}/swagger.json", $"Animal Rescue API {description.GroupName.ToLowerInvariant()}");
                    //}
                    options.SwaggerEndpoint($"/swagger/v1/swagger.json", $"Animal Rescue API v1");
                });
        }
    }
}
