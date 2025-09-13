"use client"

import AboutHero from '@/components/About/AboutHero'
import AboutStory from '@/components/About/AboutStory'
import NewsletterSection from '@/components/common/NewsletterSection'
import React from 'react'

const page = () => {
  return (
    <div>
      <AboutHero/>
      <AboutStory/>
      <NewsletterSection/>
    </div>
  )
}

export default page