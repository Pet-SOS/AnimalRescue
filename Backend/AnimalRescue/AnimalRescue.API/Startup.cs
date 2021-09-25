using AnimalRescue.API.Core.Configuration;
using AnimalRescue.API.Core.Middlewares;
using AnimalRescue.BusinessLogic;
using AnimalRescue.Infrastructure.Configuration;
using AnimalRescue.Infrastructure.Configurations;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IO;
using System.Reflection;
using System.Text;

namespace AnimalRescue.API
{
    public class Startup
    {
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            var appSettings = Configuration.GetSection("AppSettings");
            var smtpOptions = Configuration.GetSection("Smtp");
            services.Configure<AppSettings>(appSettings);
            services.Configure<SmtpOptions>(smtpOptions);


            RuntimeConfiguration runtimeConfiguration = Configuration.GetTypedSection<RuntimeConfiguration>("Runtime");
            services.AddSingleton<IRuntimeConfiguration>(p => runtimeConfiguration);

            services.AddCors(config =>
            {
                config.AddPolicy("policy",
                builder => builder
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials()
                .SetIsOriginAllowed((host) => true /*hostSettings.GetSection("AllowedHosts").GetChildren().Any(x => x.Value == host)*/)
                );
            });

            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                ValidateLifetime = true,
                ValidIssuer = appSettings["JwtIssuer"],
                ValidAudience = appSettings["JwtAudience"],
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(appSettings["JwtKey"])),
                ClockSkew = TimeSpan.Zero // remove delay of token when expire
            };

            services.AddSingleton(tokenValidationParameters);

            services.AddAuthentication(options =>
            {
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(cfg =>
                {
                    cfg.RequireHttpsMetadata = false;
                    cfg.SaveToken = true;
                    cfg.TokenValidationParameters = tokenValidationParameters;
                });

            services.AddAuthorization(auth =>
            {
                auth.AddPolicy("Bearer", new AuthorizationPolicyBuilder()
                    .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
                    .RequireAuthenticatedUser().Build());
            });

            services.AddMvc(options =>
            {
                options.Filters.Add(typeof(Core.Filters.ModelStateValidationFilter));
            }).SetCompatibilityVersion(CompatibilityVersion.Version_3_0);

            services.Configure<FormOptions>(options =>
            {
                options.ValueLengthLimit = int.MaxValue;
                options.MultipartBodyLengthLimit = long.MaxValue;
                options.MultipartHeadersLengthLimit = int.MaxValue;
            });

            //services.AddVersionedApiExplorer(options =>
            //{
            //    //The format of the version added to the route URL  
            //    options.GroupNameFormat = "'v'VVV";
            //    //Tells swagger to replace the version in the controller route  
            //    options.SubstituteApiVersionInUrl = true;
            //});

            //services.AddApiVersioning(options =>
            //{
            //    options.ReportApiVersions = true;
            //    options.ApiVersionReader = new HeaderApiVersionReader("api-version");
            //    options.DefaultApiVersion = new ApiVersion(1, 0);
            //});

            services.AddControllers();

            var xmlPath = Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), $"{this.GetType().Assembly.GetName().Name}.xml");

            services.AddConfigureSwagger(xmlPath);

            services.AddConfigureBusinessLogic(Configuration, out var profiles);

            services.AddConfigureAutoMapper(profiles);

            services.AddTransient<UnhandledExceptionMiddleware>();

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddHttpClient();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IServiceProvider serviceProvider/*, IApiVersionDescriptionProvider provider*/)
        {
            if (Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development")
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            //app.UseApiVersioning();
            app.UseCors("policy");

            app.UseMiddleware<UnhandledExceptionMiddleware>();
            app.UseCors(builder =>
                builder.AllowAnyOrigin()
                       .AllowAnyHeader()
                       .AllowAnyMethod()
            );

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            BusinessLogicConfigureExtension.EnsureUpdate(serviceProvider, Configuration);

            app.UseConfigureSwagger(/*provider*/);

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
