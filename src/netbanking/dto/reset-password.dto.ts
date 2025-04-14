export class ResetPasswordDto {
    accountNumber: string;
    otp: string;
    newPassword: string;
    confirmPassword: string;
}