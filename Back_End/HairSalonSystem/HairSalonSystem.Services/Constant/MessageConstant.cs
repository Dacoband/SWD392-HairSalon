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
    }
}