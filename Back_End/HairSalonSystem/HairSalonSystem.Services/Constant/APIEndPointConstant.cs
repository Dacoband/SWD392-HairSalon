namespace HairSalonSystem.Services.Constant
{
    public class APIEndPointConstant
    {
        static APIEndPointConstant()
        {
        }

        public const string RootEndPoint = "/api";
        public const string ApiVersion = "/v1";
        public const string ApiEndpoint = RootEndPoint + ApiVersion;
        public static class Account
        {
            public const string GetAccountById = ApiEndpoint + "/account/{id}";
            public const string AccountEndpoint = ApiEndpoint + "/account";
            public const string Register = AccountEndpoint + "/sys-admin";
        }
        public static class Authentication
        {
            public const string AuthenticationEndpoint = ApiEndpoint + "/auth";
            public const string Login = AuthenticationEndpoint + "/login";
            public const string UpdatePassword = AuthenticationEndpoint + "/changepass";
        }
        public static class Branch
        {
            public const string BranchEndpoint = ApiEndpoint + "/branch";
            public const string GetBranchById = BranchEndpoint + "/{id}";
            public const string GetAllBranches = BranchEndpoint + "/all";
            public const string AddBranch = BranchEndpoint + "/add";
            public const string UpdateBranch = BranchEndpoint + "/update/{id}";
            public const string DeleteBranch = BranchEndpoint + "/delete/{id}";
        }
        public static class Member
        {
            public const string MemberEndpoint = ApiEndpoint + "/member";
            public const string GetMemberById = MemberEndpoint + "/{id}";
            public const string GetAllMembers = MemberEndpoint + "/all";
            public const string AddMember = MemberEndpoint + "/add";
            public const string UpdateMember = MemberEndpoint + "/update/{id}";
            public const string DeleteMember = MemberEndpoint + "/delete/{id}";
        }
        public static class Notification
        {
            public const string NotificationEndpoint = ApiEndpoint + "/notification";
            public const string GetNotificationById = NotificationEndpoint + "/{id}";
            public const string GetAllNotifications = NotificationEndpoint + "/all";
            public const string AddNotification = NotificationEndpoint + "/add";
            public const string UpdateNotification = NotificationEndpoint + "/update/{id}";
            public const string DeleteNotification = NotificationEndpoint + "/delete/{id}";
        }
        public static class StaffManager
        {
            public const string StaffManagerEndpoint = ApiEndpoint + "/staff-manager";
            public const string GetStaffManagerById = StaffManagerEndpoint + "/{id}";
            public const string GetAllStaffManagers = StaffManagerEndpoint + "/all";
            public const string AddStaffManager = StaffManagerEndpoint + "/add";
            public const string UpdateStaffManager = StaffManagerEndpoint + "/update/{id}";
            public const string DeleteStaffManager = StaffManagerEndpoint + "/delete/{id}";
        }
            public static class StaffStylist
            {
                public const string StaffStylistEndpoint = ApiEndpoint + "/staff-stylist";
                public const string GetStaffStylistById = StaffStylistEndpoint + "/{id}";
                public const string GetAllStaffStylists = StaffStylistEndpoint + "/all";
                public const string AddStaffStylist = StaffStylistEndpoint + "/add";
                public const string UpdateStaffStylist = StaffStylistEndpoint + "/update/{id}";
                public const string DeleteStaffStylist = StaffStylistEndpoint + "/delete/{id}";
                public const string GetStaffStylistByBranchId = StaffStylistEndpoint + "/branch/{branchId}";
            }
            public static class Stylist
            {
                public const string StylistEndpoint = ApiEndpoint + "/stylist";
                public const string GetStylistById = StylistEndpoint + "/{id}";
                public const string GetAllStylists = StylistEndpoint + "/all";
                public const string AddStylist = StylistEndpoint + "/add";
                public const string UpdateStylist = StylistEndpoint + "/update/{id}";
                public const string DeleteStylist = StylistEndpoint + "/delete/{id}";
                public const string GetStylistByBranchId = StylistEndpoint + "/branch/{branchId}";
                public const string GetStylistByStaffStylist = StylistEndpoint + "/staff-stylist/{staffStylistId}";
            }
        }
        public static class Service
        {
            public const string ServiceEndpoint = ApiEndpoint + "/service";
            public const string GetServiceById = ServiceEndpoint + "{id}";
            public const string CreateService = ServiceEndpoint + "/create";
            public const string GetAllService = ServiceEndpoint + "/get-all";
            public const string UpdateService = ServiceEndpoint + "/update/{id}";
            public const string DeleteService = ServiceEndpoint + "/delete/{id}";

        }

        public static class Appointment
        {
            public const string AppointmentEndpoint = ApiEndpoint + "/appointment";
            public const string CreateAppointment = AppointmentEndpoint + "/create";
        }
    }

