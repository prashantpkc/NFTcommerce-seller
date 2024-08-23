import React from 'react';

export default function Footer() {
  const handlePdfOpen = (url) => (event) => {
    event.preventDefault();
    window.open(url, "_blank");
  };

  return (
    <footer className="bg-white shadow-md">
      <div className="container py-9 flex justify-between text-sm">
        <div className="ml-28 flex space-x-6">
          <p>© Copyright <span className="font-bold">Centumworld.</span> All Rights Reserved</p>
        </div>
        <div className="mr-28 space-x-6 text-[#14279B]">
          <span>
            <a href="/pdf/terms_and_conditions.pdf" onClick={handlePdfOpen("/pdf/terms_and_conditions.pdf")}>
              Terms and Conditions
            </a>
          </span>
          <span>
            <a href="/pdf/refund_policy.pdf" onClick={handlePdfOpen("/pdf/refund_policy.pdf")}>
              Refund Policy
            </a>
          </span>
          <span>
            <a href="/pdf/privacy_policy.pdf" onClick={handlePdfOpen("/pdf/privacy_policy.pdf")}>
              Privacy Policy
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
