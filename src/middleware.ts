export { default } from "next-auth/middleware"

export const config = { matcher: ["/profile/:path*"] }



// if(!session){

//     const requestedPage = req.nextUrl.pathname;
//     const url = req.nextUrl.clone();
//     url.pathname = `auth/login`;
//     url.search=`p=${requestedPage}`
    
//     return NextResponse.redirect(url)
// }