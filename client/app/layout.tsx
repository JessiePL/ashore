//app/layout.tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import BottomNavbar from '@/components/BoottomNavbar';

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