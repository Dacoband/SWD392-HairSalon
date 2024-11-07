using HairSalonSystem.BusinessObject;
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
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using HairSalonSystem.Services.PayLoads.Requests.Firebase;

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

// Load Firebase settings from configuration
var firebaseSettings = builder.Configuration.GetSection("Firebase").Get<FirebaseSetting>();

if (firebaseSettings == null)
{
    throw new Exception("Firebase settings not found in configuration.");
}

builder.Configuration.GetSection("Firebase").Get<FirebaseSetting>();

// Combine the base path with the relative path
var credentialPath = Path.Combine(builder.Environment.ContentRootPath, firebaseSettings.CredentialPath);

// Initialize FirebaseApp and register it as a singleton service
var firebaseApp = FirebaseApp.Create(new AppOptions
{
    Credential = GoogleCredential.FromFile(credentialPath)
});

builder.Services.AddSingleton(firebaseApp);
// Load JWT settings

builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("Jwt"));




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
builder.Services.AddScoped<IAppointmentServiceDAO, AppointmentServiceDAO>();
builder.Services.AddScoped<IAppointmentCancellationDAO, AppointmentCancellationDAO>();
builder.Services.AddScoped<IFeedbackDAO, FeedbackDAO>();


builder.Services.AddScoped<ISalaryDAO, SalaryDAO>();


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
builder.Services.AddScoped<IAppointmentServiceRepository, AppointmentServiceRepository>();
builder.Services.AddScoped<IAppointmentCancellationRepository,AppointmentCancellationRepository>();
builder.Services.AddScoped<IFeedbackRepository, FeedbackRepository>();
builder.Services.AddScoped<PaymentRepository>();
builder.Services.AddScoped<ISalaryRepository, SalaryRepository>();




// Register Services
builder.Services.AddScoped<IFirebaseService, FirebaseService>();

builder.Services.AddScoped<IAccountService, AccountService>(); 
builder.Services.AddScoped<IAuthService, AuthService>(); 
builder.Services.AddScoped<IBranchService, BranchService>();
builder.Services.AddScoped<IMemberService, MemberService>();
builder.Services.AddScoped<INotificationService, NotificationService>();
builder.Services.AddScoped<IStaffManagerService, StaffManagerService>();
builder.Services.AddScoped<IStaffStylistService, StaffStylistService>();
builder.Services.AddScoped<IServiceService, ServiceService>();
builder.Services.AddScoped<IStylistService, StylistService>();
builder.Services.AddHttpClient<PaymentController>();
builder.Services.AddScoped<IAppointmentService, HairSalonSystem.Services.Implements.AppointmentService>();
builder.Services.AddScoped<PaymentService>();
builder.Services.AddScoped<IEmailService, EmailService>();

builder.Services.AddScoped<IAppointmentCacellationService,AppointmentCancellationService>();
builder.Services.AddScoped<IFeedbackService, FeedbackService>();
builder.Services.AddHostedService<MonthlySalaryService>();

builder.Services.AddScoped<ISalaryService,SalaryService>();

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var connectionString = builder.Configuration.GetConnectionString("MongoDbConnection");
var databaseName = builder.Configuration["MongoDb:DatabaseName"];
// Add MongoDB client
builder.Services.AddSingleton<IMongoClient>(new MongoClient(connectionString));
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
