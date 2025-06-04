'use client';
export default function TopNavbar() {
  return (
    <nav className="navbar bg-light border-bottom shadow-sm px-3 py-2">
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img
            src="/settings/profile.png" 
            alt="User Avatar"
            width={64}
            height={64}
            className="rounded-circle"
          />
        </a>
      </div>
    </nav>
  );
}
