export function WorkspaceGallery() {
  const workspaceImages = [
    {
      src: "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
      alt: "Modern office setup with dual monitors"
    },
    {
      src: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
      alt: "Minimalist home office with plants"
    },
    {
      src: "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
      alt: "Collaborative workspace with whiteboards"
    },
    {
      src: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
      alt: "Cozy coffee shop workspace"
    }
  ];

  return (
    <div className="glassmorphism rounded-2xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <i className="fas fa-images mr-2 text-primary-500"></i>
        Workspace Inspiration
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {workspaceImages.map((image, index) => (
          <div key={index} className="relative rounded-lg overflow-hidden group cursor-pointer">
            <img 
              src={image.src}
              alt={image.alt}
              className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
