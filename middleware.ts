import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["ru", "uz"],
  defaultLocale: "uz"
});

export const config = {
  matcher: [
    "/((?!api|_next|static|favicon.ico).*)"
  ]
};