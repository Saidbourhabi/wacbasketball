const categories = [
  { id: 1, src: "https://res.cloudinary.com/dgzn9nczh/image/upload/v1789838860/store2_gygbod.jpg", alt: "Dry Shampoo" },
  { id: 2, src: "https://res.cloudinary.com/dgzn9nczh/image/upload/v1789856126/store4_uikzeu.jpg", alt: "Eye Primer" },
  { id: 3, src: "https://res.cloudinary.com/dgzn9nczh/image/upload/v1789838839/store_oqnrny.jpg", alt: "Face Primer" },
  { id: 3, src: "https://res.cloudinary.com/dgzn9nczh/image/upload/v1789856132/store3_dlm324.jpg", alt: "Face Primer" },
];

export default function ImageGallerySection() {

  return (
    <section aria-labelledby="gallery-heading" className="mt-6">
      <h2 id="gallery-heading" className="sr-only">Image Gallery</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {categories.map((item) => (
          <div key={item.id} className="relative border-y-2 border-white bg- overflow-hidden cursor-pointer before:absolute before:inset-0 before:bg-black before:opacity-30 before:transition-colors hover:before:bg-[#fc0000]">
            <img
              src={item.src}
              alt={item.alt}
              fetchPriority="high"
              className="h-full w-full max-w-full object-cover object-top transition-transform duration-500 hover:scale-110"
            />
          </div>
        ))}
      </div>
    </section>
  );
};
