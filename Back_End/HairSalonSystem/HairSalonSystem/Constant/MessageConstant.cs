namespace HairSalonSystem.API.Constant
{
    public class MessageConstant
    {
        public static class LoginMessage
        {
            public const string InvalidUsernameOrPassword = "Tên đăng nhập hoặc mật khẩu không chính xác";
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

        }
    }
}
