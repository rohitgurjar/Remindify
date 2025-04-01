import React from "react";

export default async function Footer() {
  return (
    <footer id="contact" className="bg-[#e9e8e2] text-white py-8">
      <div className="container mx-auto px-6">
        <div>
          <div>
            <p className="text-lg font-semibold text-black">Remindify</p>
            <p className="text-sm text-black">
              © {new Date().getFullYear()} All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
