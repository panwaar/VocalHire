'use client';

export default function ResumePage() {
  return (
    <div className="w-screen h-screen">
      <object
        data="/resume.pdf"
        type="application/pdf"
        width="100%"
        height="100%"
      >
        <p>Your browser does not support PDFs. <a href="/resume.pdf">Download PDF</a>.</p>
      </object>
    </div>
  );
}
