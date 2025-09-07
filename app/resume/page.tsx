"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ResumeRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/aayushmishra_resume.pdf');
  }, [router]);

  return null;
}
