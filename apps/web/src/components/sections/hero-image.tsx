"use client"

import Image from "next/image"

export default function HeroImage() {
  return (
    <div className="w-full max-w-[1200px] mx-auto">
      <div className="w-full bg-black rounded-[16px] overflow-hidden">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hero-image.jpg-4OjPEIvlCkexpnjakBXIhllTT5eCJT.jpeg"
          alt="YOYO AI Version Control timeline with instant code restore"
          width={1200}
          height={800}
          className="w-full h-auto rounded-[16px]"
          priority
        />
      </div>
    </div>
  )
}
