export default createMiddleware({
  locales: ["ru", "uz"],
  defaultLocale: "ru"
});

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"]
};