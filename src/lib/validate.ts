/**
 * 密码格式校验
 * 允许：英文字母、数字、常见符号
 * 禁止：汉字、emoji、其他 Unicode 字符
 */
export function validatePassword(pwd: string): { valid: boolean; error: string } {
  if (pwd.length < 6) return { valid: false, error: '密码至少需要 6 个字符' };
  if (pwd.length > 64) return { valid: false, error: '密码不能超过 64 个字符' };
  if (!/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~ ]+$/.test(pwd)) {
    return { valid: false, error: '密码只能包含英文字母、数字和符号，不能包含汉字或其他特殊字符' };
  }
  return { valid: true, error: '' };
}
