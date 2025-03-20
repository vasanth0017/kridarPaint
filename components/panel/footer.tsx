"use client";

export function Footer() {
  return (
    <>
      <footer className="py-12 px-4 border-t border-zinc-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-primary/80 flex items-center justify-center">
                  <span className="font-serif text-xl text-black font-bold">
                    K
                  </span>
                </div>
                <span className="font-serif font-bold text-2xl tracking-tighter text-white">
                  Kridar
                </span>
              </div>
              <p className="text-zinc-400 text-sm">
                Natural luxury paints crafted from earth minerals and plant
                extracts, enriched with the purity of cow dung.
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-4">Products</h3>
              <ul className="space-y-2 text-zinc-400">
                <li>Interior Paints</li>
                <li>Exterior Paints</li>
                <li>Specialty Finishes</li>
                <li>Color Catalog</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-4">Company</h3>
              <ul className="space-y-2 text-zinc-400">
                <li>About Us</li>
                <li>Sustainability</li>
                <li>Our Process</li>
                <li>Contact</li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-4">Connect</h3>
              <ul className="space-y-2 text-zinc-400">
                <li>Instagram</li>
                <li>Pinterest</li>
                <li>LinkedIn</li>
                <li>Email Newsletter</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-zinc-500 text-sm">
              © {new Date().getFullYear()} Kridar Paints. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="text-zinc-500 text-sm">Privacy Policy</span>
              <span className="text-zinc-500 text-sm">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
