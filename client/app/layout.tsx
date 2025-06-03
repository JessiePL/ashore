//app/layout.tsx
import BottomNavbar from '@/components/navbar';
export default function RootLayout({children}: { children : React.ReactNode})
{
          return(
                    <html lang="en">
                              <body>
                                        {children}
                                        <BottomNavbar />
                              </body>
                    </html>
          );
}