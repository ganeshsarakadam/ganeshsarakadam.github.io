"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ResumeRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/Ganesh-Sarakadam-Resume.pdf');
  }, [router]);

  return null;
}
