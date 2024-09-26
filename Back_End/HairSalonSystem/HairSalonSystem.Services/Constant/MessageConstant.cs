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
    }
}
