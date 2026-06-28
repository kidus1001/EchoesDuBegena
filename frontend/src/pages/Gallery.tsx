// src/pages/Gallery.tsx
import { useState, useEffect } from 'react';

// Import your images - 1.jpg to 31.jpg
import img1 from '/assets/gallery/1.jpg';
import img2 from '/assets/gallery/2.jpg';
import img3 from '/assets/gallery/3.jpg';
import img4 from '/assets/gallery/4.jpg';
import img5 from '/assets/gallery/5.jpg';
import img6 from '/assets/gallery/6.jpg';
import img7 from '/assets/gallery/7.jpg';
import img8 from '/assets/gallery/8.jpg';
import img9 from '/assets/gallery/9.jpg';
import img10 from '/assets/gallery/10.jpg';
import img11 from '/assets/gallery/11.jpg';
import img12 from '/assets/gallery/12.jpg';
import img13 from '/assets/gallery/13.jpg';
import img14 from '/assets/gallery/14.jpg';
import img15 from '/assets/gallery/15.jpg';
import img16 from '/assets/gallery/16.jpg';
import img17 from '/assets/gallery/17.jpg';
import img19 from '/assets/gallery/19.jpg';
import img20 from '/assets/gallery/20.jpg';
import img21 from '/assets/gallery/21.jpg';
import img22 from '/assets/gallery/22.jpg';
import img23 from '/assets/gallery/23.jpg';
import img24 from '/assets/gallery/24.jpg';
import img25 from '/assets/gallery/25.jpg';
import img26 from '/assets/gallery/26.jpg';
import img27 from '/assets/gallery/27.jpg';
import img28 from '/assets/gallery/28.jpg';
import img30 from '/assets/gallery/30.jpg';
import img31 from '/assets/gallery/31.jpg';
import img32 from '/assets/BegenaPersonImages/AbaWorkneh.jpg';
import img33 from '/assets/BegenaPersonImages/AlekaTessema.jpg';
import img34 from '/assets/BegenaPersonImages/AlemuAga.jpeg';
import img35 from '/assets/BegenaPersonImages/Demissie2.jpg';
import img36 from '/assets/BegenaPersonImages/Demissie1.png';
import img37 from '/assets/BegenaPersonImages/Zerfu.png';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  naturalWidth?: number;
  naturalHeight?: number;
  aspectRatio?: number;
  spanType?: 'small' | 'wide' | 'tall' | 'large';
}

const Gallery: React.FC = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [cols, setCols] = useState(4);

  // Get image dimensions
  const getImageDimensions = (src: string): Promise<{ width: number; height: number }> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.naturalWidth, height: img.naturalHeight });
      };
      img.onerror = () => {
        resolve({ width: 800, height: 600 });
      };
      img.src = src;
    });
  };

  // Load images with their dimensions
  useEffect(() => {
    const imageFiles = [
      img1, img2, img3, img4, img5, img6, img7, img8, img9, img10,
      img11, img12, img13, img14, img15, img16, img17, img19, img20,
      img21, img22, img23, img24, img25, img26, img27, img28, img30,
      img31, img32, img33, img34, img35, img36, img37
    ];

    const loadImages = async () => {
      const loaded = await Promise.all(
        imageFiles.map(async (src, index) => {
          const dimensions = await getImageDimensions(src);
          const aspectRatio = dimensions.width / dimensions.height;
          
          let spanType: 'small' | 'wide' | 'tall' | 'large' = 'small';
          
          if (aspectRatio > 1.5) {
            spanType = 'wide';
          } else if (aspectRatio < 0.67) {
            spanType = 'tall';
          } else if (aspectRatio >= 0.9 && aspectRatio <= 1.1) {
            spanType = 'large';
          } else {
            spanType = 'small';
          }

          return {
            id: `img-${index + 1}`,
            src,
            alt: `Photo ${index + 1}`,
            naturalWidth: dimensions.width,
            naturalHeight: dimensions.height,
            aspectRatio,
            spanType,
          };
        })
      );

      const shuffled = loaded.sort(() => Math.random() - 0.5);
      setImages(shuffled);
    };

    loadImages();
  }, []);

  // Responsive columns
  useEffect(() => {
    const updateCols = () => {
      const width = window.innerWidth;
      if (width < 640) setCols(2);
      else if (width < 1024) setCols(3);
      else setCols(4);
    };
    
    updateCols();
    window.addEventListener('resize', updateCols);
    return () => window.removeEventListener('resize', updateCols);
  }, []);

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  // Distribute images into a filled grid
  const renderMosaic = () => {
    const grid: (GalleryImage | null)[][] = [];
    let row = 0;
    let col = 0;
    let index = 0;

    while (index < images.length) {
      if (!grid[row]) grid[row] = Array(cols).fill(null);
      
      const image = images[index];
      let width = 1;
      let height = 1;
      
      // Only use larger sizes on desktop (4 cols) and tablet (3 cols)
      if (cols >= 3) {
        if (image.spanType === 'large' && 
            col + 1 < cols && 
            index + 1 < images.length &&
            grid[row][col + 1] === null) {
          width = 2;
          height = 2;
        }
        else if (image.spanType === 'wide' && 
                 col + 1 < cols && 
                 grid[row][col + 1] === null) {
          width = 2;
          height = 1;
        }
        else if (image.spanType === 'tall' && 
                 row + 1 < 100 && 
                 grid[row + 1] && grid[row + 1][col] === null) {
          width = 1;
          height = 2;
        }
      }

      // Check if image fits
      let fits = true;
      for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
          if (!grid[row + r]) grid[row + r] = Array(cols).fill(null);
          if (col + c >= cols || grid[row + r][col + c] !== null) {
            fits = false;
            break;
          }
        }
        if (!fits) break;
      }

      if (fits && index < images.length) {
        for (let r = 0; r < height; r++) {
          for (let c = 0; c < width; c++) {
            if (!grid[row + r]) grid[row + r] = Array(cols).fill(null);
            grid[row + r][col + c] = image;
          }
        }
        index++;
        col += width;
        if (col >= cols) {
          col = 0;
          row++;
        }
      } else {
        // Try placing as 1x1
        if (width > 1 || height > 1) {
          width = 1;
          height = 1;
          let fitsSmall = true;
          if (col >= cols || grid[row][col] !== null) {
            fitsSmall = false;
          }
          
          if (fitsSmall) {
            grid[row][col] = image;
            index++;
            col++;
            if (col >= cols) {
              col = 0;
              row++;
            }
          } else {
            col++;
            if (col >= cols) {
              col = 0;
              row++;
            }
          }
        } else {
          col++;
          if (col >= cols) {
            col = 0;
            row++;
          }
        }
      }
    }

    // Fill gaps
    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < cols; c++) {
        if (grid[r][c] === null && index < images.length) {
          grid[r][c] = images[index];
          index++;
        }
      }
    }

    return grid;
  };

  if (images.length === 0) {
    return (
      <main className="min-h-screen bg-[#F5F0E8] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-[#8B7355] border-t-transparent"></div>
          <p className="mt-4 text-[#4A3728]">Loading images...</p>
        </div>
      </main>
    );
  }

  const grid = renderMosaic();

  return (
    <main className="min-h-screen bg-archive-paper p-4 sm:p-6">
      <div className="max-w-7xl mx-auto mb-8 text-center">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-archive-dark mb-3">
            Gallery
        </h1>
        <div className="w-20 h-0.5 bg-archive-gold mx-auto mb-8"></div>
        {/* Filled Mosaic Grid */}
        <div className="grid gap-2 sm:gap-3" style={{ 
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
        }}>
          {grid.map((row, rowIndex) => 
            row.map((image, colIndex) => {
              if (!image) return null;
              
              let colSpan = 1;
              let rowSpan = 1;
              
              // Check if this image spans multiple cells
              if (colIndex + 1 < cols && grid[rowIndex][colIndex + 1]?.id === image.id) {
                colSpan = 2;
              }
              if (rowIndex + 1 < grid.length && grid[rowIndex + 1][colIndex]?.id === image.id) {
                rowSpan = 2;
              }
              
              // Skip if this is not the top-left cell of a multi-cell image
              if (colIndex > 0 && grid[rowIndex][colIndex - 1]?.id === image.id) return null;
              if (rowIndex > 0 && grid[rowIndex - 1][colIndex]?.id === image.id) return null;
              if (colIndex > 0 && rowIndex > 0 && grid[rowIndex - 1][colIndex - 1]?.id === image.id) return null;

              // Determine min height based on span type
              let minHeight = '200px';
              if (image.spanType === 'tall') {
                minHeight = '400px';
              } else if (image.spanType === 'large') {
                minHeight = '350px';
              } else if (image.spanType === 'wide') {
                minHeight = '200px';
              }

              return (
                <div
                  key={image.id}
                  style={{
                    gridColumn: `span ${colSpan}`,
                    gridRow: `span ${rowSpan}`,
                    minHeight: minHeight,
                    height: '100%',
                  }}
                  className="rounded-lg sm:rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] cursor-pointer bg-[#E8DCC8] group"
                  onClick={() => {
                    setSelectedImage(image);
                    document.body.style.overflow = 'hidden';
                  }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-all duration-500 grayscale group-hover:grayscale-0"
                    loading="lazy"
                  />
                </div>
              );
            })
          )}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-2 sm:p-4"
            onClick={closeLightbox}
          >
            <div className="relative max-w-5xl max-h-[90vh] w-full">
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="w-full h-full max-h-[80vh] object-contain rounded-lg"
              />
              
              <button
                onClick={closeLightbox}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white/70 hover:text-white bg-black/50 hover:bg-black/70 rounded-full p-2 sm:p-3 transition-colors"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = images.findIndex(img => img.id === selectedImage.id);
                  const prevIndex = (currentIndex - 1 + images.length) % images.length;
                  setSelectedImage(images[prevIndex]);
                }}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-black/50 hover:bg-black/70 rounded-full p-3 sm:p-4 transition-colors"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const currentIndex = images.findIndex(img => img.id === selectedImage.id);
                  const nextIndex = (currentIndex + 1) % images.length;
                  setSelectedImage(images[nextIndex]);
                }}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-black/50 hover:bg-black/70 rounded-full p-3 sm:p-4 transition-colors"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-xs sm:text-sm bg-black/50 px-3 py-1 rounded-full">
                {images.findIndex(img => img.id === selectedImage.id) + 1} / {images.length}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Gallery;