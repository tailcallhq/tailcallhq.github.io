import Link from "next/link"

export default function NotFound() {
  return (
    <div className="px-8 py-24 flex justify-center items-center">
      <div className="w-1/2">
        <h1 className="text-[3rem] font-bold">Page Not Found</h1>
        <p className="my-3">We could not find what you were looking for.</p>
        <p>
          Please contact the owner of the site that linked you to the original URL and let them know their link is
          broken.
          <Link href="/" className="text-blue-500 ml-2">Return Home</Link>
        </p>
      </div>
    </div>
  )
}
