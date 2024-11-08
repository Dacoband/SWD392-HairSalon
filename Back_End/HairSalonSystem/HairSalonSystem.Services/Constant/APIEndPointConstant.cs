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
            public const string GetStaffStylistByAccountId = StaffStylistEndpoint + "/account/{accountId}";
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
            public const string GetRandomStylistByBranchId = StylistEndpoint + "/random-branch/{branchId}";
            public const string GetStylistByStaffStylist = StylistEndpoint + "/staff-stylist/{staffStylistId}";
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
            public const string GetAppointmentById = AppointmentEndpoint + "{id}";
            public const string UpdateAppointment = AppointmentEndpoint + "/update/{id}";
            public const string GetAllAppointment = AppointmentEndpoint + "/get-all";
            public const string GetSuitableSlot = AppointmentEndpoint + "/get-slot";
            public const string GetAvailableStylist = AppointmentEndpoint + "/get-available-stylist";

        }

        public static class CancelAppointment
        {
            public const string CancelEndpoint = ApiEndpoint + "/cancel-appointment";
            public const string CreateCancel = CancelEndpoint + "/create";
            public const string GetAllCancel = CancelEndpoint + "/get-all";
            public const string GetById = CancelEndpoint + "/get-by-id/{id}";
            public const string GetByAppointment = CancelEndpoint + "/get-by-appointment/{id}";
        }
        public static class Feedback
        {
            public const string FeedbackEndpoint = ApiEndpoint + "/feedback";
            public const string GetFeedbackById = FeedbackEndpoint + "/{id}";
            public const string GetFeedbackByMemberId = FeedbackEndpoint + "/member/{memberId}";
            public const string GetFeedbackByStylistId = FeedbackEndpoint + "/stylist/{stylistId}";
            public const string GetAllFeedbacks = FeedbackEndpoint + "/all";
            public const string AddFeedback = FeedbackEndpoint + "/add";
            //public const string UpdateFeedback = FeedbackEndpoint + "/update/{id}";
            public const string DeleteFeedback = FeedbackEndpoint + "/delete/{id}";

        }

        public static class Salary
        {
            public const string SalaryEndpoint = ApiEndpoint + "/salary";
            public const string CreateSalary = SalaryEndpoint + "/create";
            public const string GetSalaryById = SalaryEndpoint + "{id}";
            public const string UpdateSalary = SalaryEndpoint + "/update/{id}";
            public const string GetAllSalary = SalaryEndpoint + "/get-all";
        }

        public static class OffSchedule
        {
            public const string OffScheduleEndpoint = ApiEndpoint + "/offschedule";
            public const string CreateOffSchedule = OffScheduleEndpoint + "/create";
            public const string GetOffScheduleById = OffScheduleEndpoint + "{id}";
            public const string DeleteOffSchedule = OffScheduleEndpoint + "/delete/{id}";
            public const string GetAllOffSchedule = OffScheduleEndpoint + "/get-all";
        }
    }
}
