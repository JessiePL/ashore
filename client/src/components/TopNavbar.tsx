'use client';
import '@/styles/navbar.css';
export default function TopNavbar() {
  return (
    <nav className="top-navbar navbar bg-light border-bottom shadow-sm px-3 py-2">
      <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img
            src="/settings/profile.png" 
            alt="User Avatar"
            width={64}
            height={64}
            className="rounded-circle"
          />
          <div className="position-absolute top-50 start-50 translate-middle">
          <span className="ms-3 fs-4 fw-bold text-dark">Ashore</span>
          </div>
        </a>
      </div>
    </nav>
  );
}
