﻿using HairSalonSystem.BusinessObject;
using HairSalonSystem.BusinessObject.Entities;
using HairSalonSystem.DAOs.Interface; 
using HairSalonSystem.DAOs.Implement;
using HairSalonSystem.Repositories.Interface;
using HairSalonSystem.Repositories.Implement;
using HairSalonSystem.Services.Interfaces;
using HairSalonSystem.Services.Implements; 
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using System.Text;
using Microsoft.OpenApi.Models;
using HairSalonSystem.DAOs.Interfaces;
using HairSalonSystem.DAOs.Implements;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", policy =>
    {
        policy.WithOrigins("*") 
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});


// Add services to the container.

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "HairSalon API Test", Version = "v1" });

    // Cấu hình Bearer token 
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Vui lòng nhập 'Bearer' [space] và token vào đây.",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "Bearer"

    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

// Load JWT settings

builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("Jwt"));

//Load VNPay settings
builder.Services.Configure<VNPaySettings>(builder.Configuration.GetSection("VNPay"));


// Add JWT Authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    var jwtSettings = builder.Configuration.GetSection("Jwt").Get<JwtSettings>();
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Secret)),
        ValidateIssuer = true,
        ValidIssuer = jwtSettings.Issuer,
        ValidateAudience = true,
        ValidAudience = jwtSettings.Audience
    };
});


// Register services and repositories
builder.Services.AddScoped<IAccountDAO, AccountDAO>(); 
builder.Services.AddScoped<IBranchDAO, BranchDAO>();
builder.Services.AddScoped<IMemberDAO, MemberDAO>();
builder.Services.AddScoped<INotificationDAO, NotificationDAO>();
builder.Services.AddScoped<IStaffManagerDAO, StaffManagerDAO>();
builder.Services.AddScoped<IStaffStylistDAO, StaffStylistDAO>();
builder.Services.AddScoped<IServiceDAO, ServiceDAO>();
builder.Services.AddScoped<IStylistDAO, StylistDAO>();
builder.Services.AddScoped<IAppointmentDAO, AppointmentDAO>();




// Register Repositories
builder.Services.AddScoped<IAccountRepository, AccountRepository>(); 
builder.Services.AddScoped<IBranchRespository,BranchRespository>();
builder.Services.AddScoped<IMemberRepository, MemberRepository>();
builder.Services.AddScoped<INotificationRepository, NotificationRepository>();
builder.Services.AddScoped<IStaffManagerRepository, StaffManagerRepository>();
builder.Services.AddScoped<IStaffStylistRepository, StaffStylistRepository>();
builder.Services.AddScoped<IServiceRepository,ServiceRepository>();
builder.Services.AddScoped<IStylistRepository, StylistRepository>();
builder.Services.AddScoped<IAppointmentRepository, AppointmentRepository>();




// Register Services
builder.Services.AddScoped<IVNPayService, VNPayService>();
builder.Services.AddScoped<IAccountService, AccountService>(); 
builder.Services.AddScoped<IAuthService, AuthService>(); 
builder.Services.AddScoped<IBranchService, BranchService>();
builder.Services.AddScoped<IMemberService, MemberService>();
builder.Services.AddScoped<INotificationService, NotificationService>();
builder.Services.AddScoped<IStaffManagerService, StaffManagerService>();
builder.Services.AddScoped<IStaffStylistService, StaffStylistService>();
builder.Services.AddScoped<IServiceService, ServiceService>();
builder.Services.AddScoped<IStylistService, StylistService>();
builder.Services.AddScoped<IAppointmentService, HairSalonSystem.Services.Implements.AppointmentService>();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



var connectionString = builder.Configuration.GetConnectionString("MongoDbConnection");
var databaseName = builder.Configuration["MongoDb:DatabaseName"];
builder.Services.AddSingleton(new HairSalonContext(connectionString, databaseName));
var app = builder.Build();


app.UseCors("AllowSpecificOrigin");
// Configure the HTTP request pipeline.

app.UseSwagger();
    app.UseSwaggerUI();


app.UseRouting();

app.UseHttpsRedirection();

app.UseAuthentication(); 
app.UseAuthorization();

app.MapControllers();

app.Run();
