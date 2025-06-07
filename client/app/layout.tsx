//app/layout.tsx
import 'bootstrap/dist/css/bootstrap.min.css';
import TopNavbar from '@/components/TopNavbar';
import BottomNavbar from '@/components/BoottomNavbar';

export default function RootLayout({children}: { children : React.ReactNode})
{
          return(
                    <html lang="en">
                              <body>
                                        <TopNavbar />
                                        <main style={{ paddingTop: '20px', paddingBottom: '20px' }}>
                                        {children}
                                        </main>
                                        <BottomNavbar />
                              </body>
                    </html>
          );
}