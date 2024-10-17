namespace HairSalonSystem.Services.Constant
{
    public class MessageConstant
    {
        public static class LoginMessage
        {
            public const string InvalidUsernameOrPassword = "Tê" +
                "" +
                "n đăng nhập hoặc mật khẩu không chính xác";
            public const string DeactivatedAccount = "Tài khoản đang bị vô hiệu hoá";
            public const string NotFoundAccount = "Không tìm thấy account";

        }
        public static class BranchMessage
        {
            public const string BranchCreated = "Chi nhánh đã được tạo thành công";
            public const string BranchUpdated = "Cập nhật chi nhánh thành công";
            public const string BranchDeleted = "Chi nhánh đã được xoá";
            public const string BranchNotFound = "Không tìm thấy chi nhánh";
            public const string NotRights = "Bạn không có quyền tạo branch";
            public const string BranchNotExist = "Branch không tồn tại";


        }
        public static class MemberMessage
        {
            public const string MemberCreated = "Thành viên đã được tạo thành công";
            public const string MemberUpdated = "Cập nhật thành viên thành công";
            public const string MemberDeleted = "Thành viên đã được xoá";
            public const string MemberNotFound = "Không tìm thấy thành viên";
            public const string NotRights = "Bạn không có quyền tạo thành viên";
            public const string MemberNotRightsDelete = "Bạn không có quyền xóa thành viên";
            public const string EmailExist = "Email đã tồn tại trong hệ thống";
            public const string MemberNotRightsUpdate = "Bạn không có quyền cập nhật thành viên";

        }
        public static class Message
        {
            public const string Success = "Bạn đã tạo thông báo thành công";
            public const string NotFound = "Không tìm thấy thông báo";
            public const string Update = "Cập nhật thông báo thành công";
            public const string Delete = "Xoá thông báo thành công";
            public const string NotRights = "Bạn không có quyền tạo thông báo";
            public const string NotRightsUpdate = "Bạn không có quyền cập nhật thông báo";
            public const string NotRightsDelete = "Bạn không có quyền xóa thông báo";
        }
        public static class StaffManagerMessage
        {
            public const string StaffManagerNotFound = "Không tìm thấy nhân viên quản lý.";
            public const string StaffManagerNotRightsUpdate = "Bạn không có quyền cập nhật thông tin nhân viên quản lý.";
            public const string StaffManagerAlreadyExists = "Nhân viên quản lý đã tồn tại.";
            public const string StaffManagerAddedSuccessfully = "Thêm nhân viên quản lý thành công.";
            public const string StaffManagerUpdatedSuccessfully = "Cập nhật thông tin nhân viên quản lý thành công.";
            public const string StaffManagerRemovedSuccessfully = "Xóa nhân viên quản lý thành công.";
            public const string StaffManagerInvalidData = "Dữ liệu nhân viên quản lý không hợp lệ.";
        }
        public static class StaffStylistMessage
        {
            public const string StaffStylistCreated = "Quản lí stylist đã được tạo thành công";
            public const string StaffStylistUpdated = "Cập nhật quản lí stylist thành công";
            public const string StaffStylistDeleted = "Quản lí stylist đã được xoá";
            public const string StaffStylistNotFound = "Không tìm thấy quản lí stylist";
            public const string NotRights = "Bạn không có quyền tạo quản lí stylist";
            public const string StaffStylistNotRightsDelete = "Bạn không có quyền xóa quản lí stylist";
            public const string StaffStylistNotRightsUpdate = "Bạn không có quyền cập nhật quản lí stylist";
        }
        public static class StylistMessage
        {
            public const string StylistCreated = "Stylist đã được tạo thành công";
            public const string StylistUpdated = "Cập nhật stylist thành công";
            public const string StylistDeleted = "Stylist đã được xoá";
            public const string StylistNotFound = "Không tìm thấy stylist";
            public const string NotRights = "Bạn không có quyền tạo stylist";
            public const string StylistNotRightsDelete = "Bạn không có quyền xóa stylist";
            public const string StylistNotRightsUpdate = "Bạn không có quyền cập nhật stylist";
        }


        public static class ServiceMessage
        {
            public const string NotFound = "Dịch vụ không tồn tại";
            public const string CreateRight = "Bạn không có quyền tạo mới dịch vụ";
            public const string DeleteRight = "Bạn không có quyền xóa dịch vụ";
            public const string UpdateRight = "Bạn không có quyền cập nhận dịch vụ";
            public const string CreateSuccess = "Tạo mới dịch vụ thành công";
            public const string DeleteSuccess = "Xóa dịch vụ thành công";
            public const string UpdateSuccess = "Cập nhật dịch vụ thành công";
        }

        public static class AppointmentMessage
        {
            public const string CreateRight = "Vui lòng đăng nhập để tạo lịch hẹn";
            public const string NotAvailable = "Stylist không có lịch trống";
            public const string CreateSuccess = "Tạo lịch hẹn thành công";
            public const string Exception = "Lỗi trong lúc tạo lịch hẹn";
            public const string NotRight = "Vui lòng đăng nhập để xem lịch hẹn";
            public const string NotFound = "Không tìm thấy lịch hẹn";
            public const string UpdateRight = "Bạn không có quyền thay đổi lịch hẹn";
            public const string InvalidStatus = "Trạng thái lịch hẹn không hợp lệ";
            public const string UpdateSuccess = "Cập nhật trạng thái lịch hẹn thành công";
            public const string NotOpen = "Bạn chỉ có thể đặt lịch trong khoảng 8:00 - 20:00";

            // 1: created -> 2: cancel by cus -> 3: cancel by salon -> 4 : completed 

        }

        public static class CancelAppointmentMessage
        {
            public const string CreateRight = "Bạn không có quyền hủy cuộc hẹn này";
            public const string NotFound = "Không tìm thấy lịch sử hủy hẹn";
            public const string Exception = "Lỗi trong lúc hủy cuộc hẹn";
            public const string CreateSuccess = "Hủy lịch hẹn thành công";

        }
    }
}
