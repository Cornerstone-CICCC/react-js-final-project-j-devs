'use client'
import Link from 'next/link'
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa'
import { MdClose } from 'react-icons/md'

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="px-8 py-12 grid md:grid-cols-3 gap-10 justify-items-center text-center">
        <div className="max-w-xs">
          <h3 className="text-2xl font-bold mb-4">
            <Link href="/" className="hover:underline">YVR District</Link>
          </h3>
          <p className="text-gray-400">
            Discover the latest urban fashion trends at YVR District. Style, comfort, and confidence all in one place.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Categories</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/products?filter=men" className="text-gray-400 hover:text-white transition">Men</Link>
            </li>
            <li>
              <Link href="/products?filter=women" className="text-gray-400 hover:text-white transition">Women</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Company</h4>
          <ul className="space-y-2">
            <li>
              <Link href="#aboutPage" className="text-gray-400 hover:text-white transition">About Us</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 px-8 py-6 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400 gap-4">
        <p>© {new Date().getFullYear()} YVR District – All Rights Reserved</p>

        <div className="flex items-center gap-6">
          {[FaFacebookF, FaInstagram, FaYoutube, MdClose].map((Icon, i) => (
            <Icon
              key={i}
              size={18}
              className="text-gray-400 hover:text-white hover:scale-110 transition-transform duration-200 cursor-pointer"
            />
          ))}
        </div>

        <div className="flex gap-6">
          <p>Call Us: +1 604 123 4567</p>
          <p>CAD $ | English</p>
        </div>
      </div>
    </footer>
  )
}
